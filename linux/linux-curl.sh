#!/usr/bin/env bash

curl 'http://127.0.0.1:7301/caih/download' \
  -X POST \
  -H 'Content-Type: Application/json' \
  --data-binary '{"letter_code":"KJPZ20191205002"}' \
  --compressed


curl 'http://127.0.0.1:7301/caih/getletterinfo' \
  -X POST \
  -H 'Content-Type: Application/json' \
  --data-binary '{"letter_code":"KJPZ20191205002"}' \
  --compressed

