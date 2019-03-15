#!/usr/bin/env bash

splitArray(){
    echo 'param1='${1}
    echo 'param2='${2}
    str=${1}
    spChat=${2}
    if [ -z $spChat ]
    then
        spChat=','
    fi
    OLD_IFS=${IFS}
    IFS=${spChat}
    arr=(${str})
    IFS=${OLD_IFS}
    echo "arr[0]=${arr[0]}"
    echo "arr[1]=${arr[1]}"
    echo "arr[2]=${arr[2]}"
}

splitArray "1 2 3" " "

result=${?}
