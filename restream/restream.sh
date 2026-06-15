#!/usr/bin/env bash
# Pull ONE goattv channel (the single allowed connection) and re-serve it as HLS
# to unlimited viewers, transcoded to 720p H.264 so it stays light enough for
# mobile (4G) viewers far from the Brazil origin AND plays everywhere (no HEVC).
#
#  - video → H.264 720p ~2.2 Mbps (libx264 ultrafast: lowest CPU for the 1-vCPU
#    box). If it still saturates the CPU / stutters, drop scale to 480p
#    (scale=-2:480) or move to a bigger ARM A1 free instance.
#  - audio → AAC (goattv MP3 is sometimes corrupt).
#
# Channel is read from the site every loop:
#   GET https://sportalive.live/api/relay-channel  ->  {"channel":299,...}
# so the admin can switch from the panel; the VM follows within ~15s. Output
# always goes to bein-max-1.m3u8 so the site URL never changes across a switch.
#
# goattv max_connections=1 → only ONE channel can be pulled at a time.
set -u

USR="6MQDXbURQj"
PSW="VVdSS4UxyV"
NAME="${2:-bein-max-1}"        # output file name (matches the site stream URL)
DEFAULT_CH="${1:-299}"         # fallback if the API is unreachable
HLS_DIR="/var/www/hls"
UA="VLC/3.0.21 LibVLC/3.0.21"
API="https://sportalive.live/api/relay-channel"
SCALE="-2:720"                 # change to -2:480 if the CPU can't keep up

mkdir -p "$HLS_DIR"

# One curl per poll: returns "<slug>\t<channel>\t<source>" parsed from the API.
# `source`, when non-empty, is a full external HLS/TS URL the box pulls directly
# (e.g. ARD); otherwise we build the goattv URL from the channel number.
get_sel() {
  local j
  j=$(curl -fsS --max-time 8 "$API" 2>/dev/null) || { echo "$DEFAULT_CH	$DEFAULT_CH	"; return; }
  local slug ch src
  slug=$(echo "$j" | grep -o '"slug"[: ]*"[^"]*"' | head -n1 | sed 's/.*"slug"[: ]*"\([^"]*\)".*/\1/')
  ch=$(echo "$j"   | grep -o '"channel"[: ]*[0-9]\+' | grep -o '[0-9]\+' | head -n1)
  src=$(echo "$j"  | grep -o '"source"[: ]*"[^"]*"' | head -n1 | sed 's/.*"source"[: ]*"\([^"]*\)".*/\1/')
  [ -n "$ch" ] || ch="$DEFAULT_CH"
  [ -n "$slug" ] || slug="$ch"
  echo "${slug}	${ch}	${src}"
}

while true; do
  IFS=$'\t' read -r SEL CH SRC <<< "$(get_sel)"
  if [ -n "$SRC" ]; then INPUT="$SRC"; else INPUT="http://goattv.store:80/${USR}/${PSW}/${CH}.ts"; fi
  echo "[restream] start sel=$SEL src=$INPUT ($NAME) 720p $(date)"
  ffmpeg -hide_banner -loglevel warning \
    -user_agent "$UA" \
    -reconnect 1 -reconnect_streamed 1 -reconnect_delay_max 5 \
    -i "$INPUT" \
    -c:v libx264 -preset ultrafast -vf "scale=${SCALE}" \
    -b:v 2200k -maxrate 2600k -bufsize 5200k \
    -g 75 -keyint_min 75 -sc_threshold 0 -pix_fmt yuv420p \
    -c:a aac -ar 48000 -ac 2 -b:a 128k \
    -f hls \
    -hls_time 3 \
    -hls_list_size 20 \
    -hls_flags delete_segments+omit_endlist+independent_segments \
    -hls_segment_filename "${HLS_DIR}/${NAME}_%03d.ts" \
    "${HLS_DIR}/${NAME}.m3u8" &
  FFPID=$!

  # While ffmpeg runs, poll for an admin channel switch (compare by slug).
  while kill -0 "$FFPID" 2>/dev/null; do
    sleep 15
    IFS=$'\t' read -r NEW _ _ <<< "$(get_sel)"
    if [ "$NEW" != "$SEL" ]; then
      echo "[restream] channel change $SEL -> $NEW, restarting ffmpeg"
      kill "$FFPID" 2>/dev/null
      break
    fi
  done
  wait "$FFPID" 2>/dev/null
  echo "[restream] ffmpeg stopped, restarting in 2s..."
  sleep 2
done
