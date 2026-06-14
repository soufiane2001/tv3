#!/usr/bin/env bash
# Pull ONE goattv channel (the single allowed connection) and re-serve it as HLS
# to unlimited viewers. ffmpeg just remuxes (-c:v copy) → almost no CPU, keeps
# FHD; audio is re-encoded to AAC (goattv MP3 is sometimes corrupt).
#
# The channel is NOT hard-coded: it is read from the site every loop
#   GET https://sportalive.live/api/relay-channel  ->  {"channel":299,...}
# so the admin can switch beIN MAX 1 (299) <-> MAX 2 (301) from the panel. A
# watcher polls every 15s and restarts ffmpeg when the choice changes. Output
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

mkdir -p "$HLS_DIR"

# Fetch the desired channel number from the site (fall back to DEFAULT_CH).
get_ch() {
  local c
  c=$(curl -fsS --max-time 8 "$API" 2>/dev/null | grep -o '"channel"[: ]*[0-9]\+' | grep -o '[0-9]\+' | head -n1)
  if [ -n "$c" ]; then echo "$c"; else echo "$DEFAULT_CH"; fi
}

while true; do
  CH=$(get_ch)
  echo "[restream] start ch=$CH ($NAME) $(date)"
  ffmpeg -hide_banner -loglevel warning \
    -user_agent "$UA" \
    -reconnect 1 -reconnect_streamed 1 -reconnect_delay_max 5 \
    -i "http://goattv.store:80/${USR}/${PSW}/${CH}.ts" \
    -c:v copy \
    -c:a aac -ar 48000 -ac 2 -b:a 128k \
    -f hls \
    -hls_time 3 \
    -hls_list_size 20 \
    -hls_flags delete_segments+omit_endlist+independent_segments \
    -hls_segment_filename "${HLS_DIR}/${NAME}_%03d.ts" \
    "${HLS_DIR}/${NAME}.m3u8" &
  FFPID=$!

  # While ffmpeg runs, poll for an admin channel switch.
  while kill -0 "$FFPID" 2>/dev/null; do
    sleep 15
    NEW=$(get_ch)
    if [ "$NEW" != "$CH" ]; then
      echo "[restream] channel change $CH -> $NEW, restarting ffmpeg"
      kill "$FFPID" 2>/dev/null
      break
    fi
  done
  wait "$FFPID" 2>/dev/null
  echo "[restream] ffmpeg stopped, restarting in 2s..."
  sleep 2
done
