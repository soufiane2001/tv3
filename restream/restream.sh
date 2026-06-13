#!/usr/bin/env bash
# Pull ONE goattv channel (the single allowed connection) and re-serve it as HLS
# to unlimited viewers. ffmpeg just remuxes (-c copy) → almost no CPU, keeps FHD.
# Auto-restarts if goattv drops the connection.
#
# goattv max_connections=1 → this box can pull only ONE channel at a time.
# Set CHANNEL to the live match channel (beIN MAX 2 = 301 by default).
set -u

USER="6MQDXbURQj"
PASS="VVdSS4UxyV"
CHANNEL="${1:-301}"          # 301=beIN MAX2, 299=MAX1, 323=M6, 262=Global
NAME="${2:-bein-max-2}"      # output file name (matches site slug)
HLS_DIR="/var/www/hls"
UA="VLC/3.0.21 LibVLC/3.0.21"

mkdir -p "$HLS_DIR"

while true; do
  echo "[restream] starting ffmpeg for channel $CHANNEL ($NAME) $(date)"
  ffmpeg -hide_banner -loglevel warning \
    -user_agent "$UA" \
    -reconnect 1 -reconnect_streamed 1 -reconnect_delay_max 5 \
    -i "http://goattv.store:80/${USER}/${PASS}/${CHANNEL}.ts" \
    -c copy \
    -f hls \
    -hls_time 6 \
    -hls_list_size 6 \
    -hls_flags delete_segments+omit_endlist+independent_segments \
    -hls_segment_filename "${HLS_DIR}/${NAME}_%03d.ts" \
    "${HLS_DIR}/${NAME}.m3u8"
  echo "[restream] ffmpeg exited ($?), restarting in 3s..."
  sleep 3
done
