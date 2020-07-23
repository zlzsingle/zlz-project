#!/usr/bin/env bash

pull(){
    if [ -d "${repo_dir}/.git" ];then
      cd ${repo_dir}
      git pull origin $(git symbolic-ref --short -q HEAD)
    fi
}

main(){
  current_path=$(pwd) # 当前路径
  list=$(ls)  # list目录

  for item in ${list[@]};do

    dir="${current_path}/${item}"

    echo ${dir}

    if [ -d ${dir} ];then
      pull ${dir}
    fi

  done

}

main
