#!/bin/bash
for term in "dance" "art" "digital+arts" "digital+media" "music" "business" "literary" "speaking" "dramatics" "lifestyle" "quiz"; do
  echo "$term: "
  curl -s "https://unsplash.com/s/photos/$term" | grep -o 'https://images.unsplash.com/photo-[a-zA-Z0-9-]*' | head -n 1
done
