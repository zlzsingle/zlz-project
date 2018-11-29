#!/usr/bin/env bash

#for file in `ls /home/zlz`; do
#    echo "${file}"
#done

#name=ZS
#echo $name
#readonly name
#name=LS

#your_name="runoob"
## 使用双引号拼接
#greeting="hello, "$your_name" !"
#greeting_1="hello, ${your_name} !"
#echo $greeting
#echo $greeting_1


# 使用单引号拼接
#greeting_2='hello, '$your_name' !'
#greeting_3='hello, ${your_name} !'
#echo $greeting_2
#echo $greeting_3


#string='my name is job'
#echo `expr index "${string}" job`

#array_name=(1 2 3 4 5)
#
#length=${#array_name[@]}
#
#echo ${length}
#
#length=${#array_name[*]}
#
#echo ${length}
#
#lengthn=${#array_name[n]}
#
#echo ${length}

#echo "Shell 传递参数实例！";
#echo "执行的文件名：$0";
#echo "第一个参数为：$1";
#echo "第二个参数为：$2";
#echo "第三个参数为：$3";

# ./test.sh 1 2 3


#echo "-- \$* 演示 ---"
#for i in "$*"; do
#    echo $i
#done
#
#echo "-- \$@ 演示 ---"
#for i in "$@"; do
#    echo $i
#done


a=10
b=20

#echo `expr ${a} + ${b}`
#echo `expr ${a} - ${b}`
#echo `expr ${a} \* ${b}`
#echo `expr ${a} / ${b}`
#echo `expr ${a} % ${b}`

#if [ ${a} == ${b} ]
#then
#   echo "a 等于 b"
#fi
#if [ ${a} != ${b} ]
#then
#   echo "a 不等于 b"
#fi

#if [ ${a} -eq ${b} ]
#then
#    echo 'a 等于 b'
#fi
#
#if [ ${a} -ne ${b} ]
#then
#    echo 'a 不等于 b'
#fi
#
#if [ ${a} -gt ${b} ]
#then
#    echo 'a 大于 b'
#fi
#
#if [ ${a} -lt ${b} ]
#then
#    echo 'a 小于 b'
#fi
#
#if [ ${a} -ge ${b} ]
#then
#    echo 'a 大于等于 b'
#fi
#
#if [ ${a} -le ${b} ]
#then
#    echo 'a 小于等于 b'
#fi

#if [ ${a} != ${b} ]
#then
#    echo ' a != b'
#else
#    echo ' a == b'
#fi

#if [ ${a} == ${b} ]
#then
#    echo ' a != b '
#fi

#echo -e "OK! \c"
#echo "It is a test"

echo `date`
