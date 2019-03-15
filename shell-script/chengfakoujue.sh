#!/usr/bin/env bash
# 乘法口诀表
i=1
count=9

while (( ${i} <= ${count}))
do
    j=1
    while(( ${j} <= ${i} ))
    do
        val=`expr ${i} \* ${j}`
        echo -e ${i}*${j}=${val}'\t\c'
        let j=j+1
    done
    echo -e '\n'
    let i=i+1
done
