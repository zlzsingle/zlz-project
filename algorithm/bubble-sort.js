/*
    冒泡排序时间复杂度o(n^2)
    思路: 将相邻的两个元素交换位置,大的(小的)往上冒;
 */

function bubbleSort(arr, sort) {
    let temp;
    let count = 0;
    let isEnd = true;
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (sort === 'desc') {
                if (arr[j] > arr[i]) {
                    temp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = temp;
                    isEnd = false;
                }
            } else {
                if (arr[i] > arr[j]) {
                    temp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = temp;
                    isEnd = false;
                }
            }
            count++;
        }
        if(isEnd){
            break;
        }
    }
    return {
        arr,
        count,
        isEnd
    };
}

const {arr, count} = bubbleSort([10, 90, 1, 20, 3, 31, 45, 321, 5, 4, 400, 500, 600, 700], 'asc')

console.log(`冒泡排序: 数组长度${arr.length}, 时间复杂度o(${arr.length * arr.length}). 执行复杂度${count}`)
