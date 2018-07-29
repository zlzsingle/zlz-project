// http://es6.ruanyifeng.com/#docs/array
//1.扩展运算符
console.log(...[1, 2, 3]);

//2.Array.from()方法用于将两类对象转为真正的数组
let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};

// ES5的写法
var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']

// ES6的写法
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']

//3. Array.of() 方法用于将一组值，转换为数组
Array.of(1,2,3);//[1,2,3]

//4.数组实例的copyWithin()
Array.prototype.copyWithin(target, start = 0, end = this.length);


//5.数组实例的find方法，用于找出第一个符合条件的数组成员。它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为true的成员，然后返回该成员。如果没有符合条件的成员，则返回undefined
let arr = ["a", "b", "c"];
arr.find((value, index, arr) => {
    console.error(value);

    return true; // a
});

// 6.数组实例的findIndex返回第一个符合条件的数组成员的位置
[1, 9, 10].findIndex((value, index, arr) => {

    return true; //1
});

//7. fill 填充一个数
new Array(10).fill(7); // [7,7,7,7,7,7,7,7]

//8.entries(), keys(), values()
for (let index of ['a', 'b'].keys()) {
    console.log(index);
}
// 0
// 1

for (let elem of ['a', 'b'].values()) {
    console.log(elem);
}
// 'a'
// 'b'

for (let [index, elem] of ['a', 'b'].entries()) {
    console.log(index, elem);
}

//8.数组实例的 includes(), 方法返回一个布尔值，表示某个数组是否包含给定的值
[1, 2, 3].includes(2);     // true
[1, 2, 3].includes(4);     // false
[1, 2, NaN].includes(NaN); // true

// 9. 空位，new Array(3); 在ES5中 [,,]三个空位,在ES6[undefined,undefined,undefined]
// 0 in [undefined,undefined,undefined] true
// 0 in [,,] false