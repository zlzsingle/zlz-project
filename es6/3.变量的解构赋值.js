/*
 1.数组的解构赋值
 2.对象的解构赋值
 3.字符串的解构赋值
 4.数值和布尔值的解构赋值
 5.函数参数的解构赋值
 6.圆括号的问题
 7.用途
 */

//1.数组的解构赋值
let a = 1;
let b = 2;
let c = 3;

let [a, b, c] = [1, 2, 3];

let [[a], b, c] = [{"q": "1"}, {"w": "2"}, {"e": "3"}];

//let [ , , third] = ["foo", "bar", "baz"];
//third // "baz"

// let [x, , y] = [1, 2, 3];
// x // 1
// y // 3

// let [head, ...tail] = [1, 2, 3, 4];
// head // 1
// tail // [2, 3, 4]

//本质上，这种写法属于"匹配模式"只要等号两边的模式相同，左边的变量就会赋予对应的值
//解构模式 ： 完全解构模式，不完全解构模式,

// 1.数组解构
// 1.a 完全解构模式
let [a, b, c, d] = [1, 2, 3, 4];

// 1.b 不完全解构模式
let [a, b, c] = [1, 2, 3, 4];
let [a, b, c] = [1, 2];

//1.c 嵌入式解构模式
let [x, y] = [9, 8];
let [[a, b], [c, d, ...e], [g, f]] = [[1, 2], [3, 4, 5, 6, 7], []];
// console.error(a, b, c, d, e, f);//1 2 3 4 [ 5, 6, 7 ] undefined

//1.d 解构不成功的情况，两边解构不一致
let [foo] = 1; //报错，不成功
let [foo] = false;//报错，不成功
let [foo] = NaN;//报错，不成功
let [foo] = undefined;//报错，不成功
let [foo] = null;//报错，不成功
let [foo] = {};//报错，不成功

//1.e Set数组赋值
let [x, y, z] = new Set([1, 2, 3]);

//1.f 数据结构具有Iterator 接口，都可以采用数组形式解构赋值。
let [a, b, c] = (function () {
    return [Math.ceil(Math.random() * 10), Math.ceil(Math.random() * 10), Math.ceil(Math.random() * 10)]
})();

//1.g 解构默认值!注意，ES6 内部使用严格相等运算符（===），判断一个位置是否有值。所以，如果一个数组成员不严格等于undefined，默认值是不会生效的。
let [a = false, b, c = 19] = [, 2, null]; // a = false, b = 2 ,c = null
let [a = false, b, c = 19] = [, 2, undefined]; // a = false, b = 2 ,c = 19

function f() {
    console.log('aaa');
}

//1.h 函数f不会执行,因为x能取到值
let [x = f()] = [1];


//2.对象的解构,对象的解构和数组的解构不同之处在于。数组是按照元素顺序来解构的。而对象解构属性名必须相同
let {a, b} = {a: "1", b: "2"};

var {foo: baz} = {foo: 'aaa', bar: 'bbb'};
baz // "aaa"

let obj = {first: 'hello', last: 'world'};
let {first: f, last: l} = obj;
f // 'hello'
l // 'world'

// 2.a 对象实际的解构模式
let {f: f, g: g} = {f: "1", g: "2"};
console.error(f, g);

//对象解构内部机制是，先找到相同属性，再给对应变量复制。真正被赋值的是后者而不是前者
let {a, b, c} = {a: "1", b: "2"};
console.error(a, b, c); // a=1 ,b=2 ,c=undefined

//2.b 对象错误解构写法
//2.b.1 解构过程中所有的变量都会重新声明，所以报错了。不过因为var命令允许重新声明，所以这个错误只在let，const命令会出现。
let foo;
let {foo} = {foo: "1"};// SyntaxError: Duplicate declaration "foo"

let baz;
let {baz} = {baz: "1"};// SyntaxError: Duplicate declaration "baz"


//没有第二个let，所以赋值成功。以下代码中，let下面的一行圆括号是必须的，因为解析器会起首的大括号。理解成一个代码块。而不是赋值语句
let foo;
({foo} = {foo: 1}); // 成功

let baz;
({bar: baz} = {bar: 1}); // 成功


//2.c 对象嵌入式解构

let a = {
    p: [
        "1",
        {
            b: "test"
        }
    ]
};
let {p: [q, {b}]} = a;

console.error(q, b);// q=1,b=test;

//2.d 嵌入式解构
let obj = {};
let arr = [];
({p: obj.zlz, g: arr[0]} = {p: "123", g: true});
console.error(obj.zlz, arr[0]); // 123,true

//2.e 对象解构指定默认值
function aa() {
    return "1";
}

let {x: y = aa()} = {};
console.error(y)

// 2.f 如果x属性等于null，就不严格相等于undefined，导致默认值不会生效
var {x = 3} = {x: undefined};
x // 3

var {x = 3} = {x: null};
x // null

//2.g 对象解构的用法
let {log, sin, cos} = Math;

//3. 字符串的解构
const [a, b, c, d] = "1234";
let {length} = "zxcv"; //4
let {length: len} = "zxcv"; //4

let let = 1;
console.error(let);

//4.数值布尔值的解构赋值
// 解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。
let {toString: s} = 123;
// s === Number.property.toString;

let {toString: s} = false;
// s === Boolean.property.toString;

let {prop: x} = undefined; // TypeErr

let {prop: x} = null;// TypeErr

// 5.函数参数的解构赋值
function add([x, y]) {
    return x + y;
}

//上面代码中，函数add的参数表面上是一个数组，但在传入参数的那一刻，数组参数就被解构成变量x和y。对于函数内部的代码来说，它们能感受到的参数就是x和y。
add(1, 2); // 3

[[1, 2], [3, 4]].map(([x, y]) => {
    console.error(x + y);
});

function move({x = 0, y = 0} = {}) {
    return [x, y];
}

move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, 0]
move({}); // [0, 0]
move(); // [0, 0]

//优先级 ： move({x: 3, y: 8}),  {}, {x = 0, y = 0};
[1, undefined, 3].map((x = 'yes') => x);

//6.圆括号问题
//以下三种解构赋值不得使用圆括号
//(1)变量声明语句中，不能带有括号
// let [(a)] = [1]; // 异常
// let {x : (c)} = {};
// let ({x : (c)}) = {};
// let {(x : c)} = {};
// let {(x ):ｃ} = {};
//
// let {o :({p:p})} = {o : {p :2}};

//(2)函数参数中，模式不能带有圆括号
// function f([(z)]) { return z; }

//(3)赋值语句中，不能将整个模式，或嵌套模式中的一层，放在圆括号之中
({p: a}) = {p: 42};
([a]) = [5];

[({p: a}), {x: c}] = [{}, {}];

//可以使用圆括号的情况
[(b)] = [3]; // 正确
({p: (d)} = {}); // 正确
[(parseInt.prop)] = [3]; // 正确

//7.用途
//(1)交换变量的值
let x = 1;
let y = 2;
[x, y] = [y, x];

//(2)从函数返回多个值
function example() {
    return [1, 2, 3]
}

let [a, b, c] = example();

function example() {
    return {
        a: 1,
        b: 2,
        c: 3
    }
}

let {a, b, c} = example();

//(3)参数的定义
//参数是一组有次序的值
function f([x, y, z]) {

}

f([1, 2, 3]);

function f({a, b, c}) {

}

f({a: 1, b: 2, c: 3});

// （4）提取JSON数据
let jsonData = {
    id: 42,
    status: "OK",
    data: [867, 5309]
};

let {id, status, data: number} = jsonData;

console.log(id, status, number);

//（5）函数参数的默认值
jQuery.ajax = function (url, {
    async = true,
    beforeSend = function () {
    },
    cache = true,
    complete = function () {
    },
    crossDomain = false,
    global = true,
    // ... more config
}) {
    // ... do stuff
};

//(6)map的遍历
var map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for (let [key, value] of map) {
    console.log(key + " is " + value);
}

// 获取键名
for (let [key] of map) {
    // ...
}

// 获取键值
for (let [, value] of map) {
    // ...
}