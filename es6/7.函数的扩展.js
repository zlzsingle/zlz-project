// http://es6.ruanyifeng.com/#docs/function
// 1.函数参数的默认值
function log(x, y = 'World') {
    console.log(x, y);
}

// 2.与解构赋值默认值结合使用
function foo({x, y = 5}) {
    console.log(x, y);
}
foo({});// undefined, 5
foo({x: 1});// 1, 5
foo({x: 1, y: 2}); // 1, 2
foo(); // TypeError: Cannot read property 'x' of undefined

function fetch(url, {body = '', method = 'GET', headers = {}}) {
    console.log(method);
}

fetch('http://example.com', {});// "GET"

fetch('http://example.com');// 报错

// 写法一
function m1({x = 0, y = 0} = {}) {
    return [x, y];
}

// 写法二
function m2({x, y} = { x: 0, y: 0 }) {
    return [x, y];
}

// 函数没有参数的情况
m1(); // [0, 0]
m2();// [0, 0]

// x和y都有值的情况
m1({x: 3, y: 8}); // [3, 8]
m2({x: 3, y: 8});// [3, 8]

// x有值，y无值的情况
m1({x: 3}); // [3, 0]
m2({x: 3}); // [3, undefined]

// x和y都无值的情况
m1({}); // [0, 0];
m2({}); // [undefined, undefined]

m1({z: 3}); // [0, 0]
m2({z: 3}); // [undefined, undefined]

//参数默认值的位置
// 例一
function f(x = 1, y) {
    return [x, y];
}

f(); // [1, undefined]
f(2); // [2, undefined])
// f(, 1) // 报错
f(undefined, 1);// [1, 1]

// 例二
function f(x, y = 5, z) {
    return [x, y, z];
}

f(); // [undefined, 5, undefined]
f(1); // [1, 5, undefined]
// f(1, ,2) // 报错
f(1, undefined, 2); // [1, 5, 2]

// 3. 函数的length属性
(function (a) {
}).length;// 1

(function (a = 5) {
}).length;// 0

(function (a, b, c = 5) {
}).length;// 2

// 4.作用域
var x = 1;
function f(x, y = x) {
    console.log(y);
}
f(2); // 2

// 5. rest参数
function add(...values) {
    let sum = 0;
    for (let a of values) {
        sum += a;
    }
    return sum;
}
add(1, 2, 3);//6

// 报错
// function f(a, ...b, c) {
//     // ...
// }

//函数的length属性，不包括 rest 参数。
(function(a) {}).length  // 1
(function(...a) {}).length  // 0
(function(a, ...b) {}).length  // 1

//name 属性
function foo() {

}
foo.name ; //foo

var foo = function () {

};

// ES5 foo.name ""
// ES6 foo.name "foo"

//箭头函数
var f = v => v;

var f = function(v) {
    return v;
};

var f = () => 5;
// 等同于
var f = function () { return 5 };

var sum = (num1, num2) => num1 + num2;
// 等同于
var sum = function(num1, num2) {
    return num1 + num2;
};

//todo
// 箭头函数有几个使用注意点。
//
// （1）函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。
//
// （2）不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。
//
// （3）不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。
//
// （4）不可以使用yield命令，因此箭头函数不能用作 Generator 函数。

//以下行数中有几个this
function foo() {
    return () => {
        return () => {
            return () => {
                console.log('id:', this.id);
            };
        };
    };
}

var f = foo.call({id: 1});

var t1 = f.call({id: 2})()(); // id: 1
var t2 = f().call({id: 3})(); // id: 1
var t3 = f()().call({id: 4}); // id: 1
// 只有一个this