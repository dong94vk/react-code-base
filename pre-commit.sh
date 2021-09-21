#!/bin/sh

branch="$(git rev-parse --abbrev-ref HEAD)"

if [ $branch == "master" ]; then
  printf "\x1b[31mError: You can't commit directly to '$branch' branch\033[0m"
  exit 1
fi
