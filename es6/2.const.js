// 1.const 声明一个只读属性,常量的值不能改变

const PI = "3.14";

PI; //3.14

// PI = 3; //TypeError : Assignment to constant variable.

// 2.const的作用域与let命令相同：只在声明所在的块级作用域内有效。

if(true){
    const a = 1;
}
a; //Uncaught ReferenceError: MAX is not defined


//3.const声明的常量，也与let一样不可重复声明。
var message = "Hello!";
let age = 25;

// 以下两行都会报错
const message = "Goodbye!";
const age = 30;

//4.const实际上保证的，并不是值的不得改动，而是变量指向的那个内存地址不得改动。对于简单类型(数值、字符串、布尔值)值就保存在变量指向的那个内存地址，因此等同于常量。
// 当对于复合类型数据(对象、数组)变量指向的内存地址。保存的是一个指针。const只能保证这个指针是固定的，至于它指向的数据类型是不可变的，就不完全控制了
let A = {};
const B = A;

B.a = 1;
B.a = 2;
