#!/usr/bin/env bash

current_path=$(pwd)

dirs=$(ls)

for dir in ${dirs[@]};do

  repo_dir="${current_path}/${dir}"

  if [ -d ${repo_dir}];then

    cd "${repo_dir}"

    if [ -d ".git" ];then
      git pull origin $(git symbolic-ref --short -q HEAD)
    fi

  else

    echo "${repo_dir}目录不存在"

  fi

done
