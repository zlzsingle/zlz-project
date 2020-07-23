#!/usr/bin/env bash

current_path=$(pwd)

dirs=$(ls)

for dir in ${dirs[@]};do

  cd "${current_path}/${dir}"

  if [ -d ".git" ];then
    git pull origin $(git symbolic-ref --short -q HEAD)
  fi

done
