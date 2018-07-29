// http://es6.ruanyifeng.com/#docs/number
//1.二进制和八进制表示法
0b111110111 === 503; // true
0o767 === 503; // true

//2.ES6 在Number对象上，新提供了Number.isFinite()和Number.isNaN()两个方法。
//Number.isFinite() 用来检查一个数值是否为有限。
Number.isFinite(15); // true
Number.isFinite(0.8); // true
Number.isFinite(NaN); // false
Number.isFinite(Infinity); // false
Number.isFinite(-Infinity); // false
Number.isFinite('foo'); // false
Number.isFinite('15'); // false
Number.isFinite(true); // false

//Number.isNaN()用来检查一个值是否为NaN。
Number.isNaN(NaN); // true
Number.isNaN(15); // false
Number.isNaN('15'); // false
Number.isNaN(true); // false
Number.isNaN(9 / NaN); // true
Number.isNaN('true' / 0);// true
Number.isNaN('true' / 'true');// true
//Number.isFinite()对于非数值一律返回false, Number.isNaN()只有对于NaN才返回true，非NaN一律返回false。

//Number.parseInt() ;
Number.parseInt("1"); //1
Number.parseInt("1.2"); //1
Number.parseInt("1.9"); //11
Number.parseInt("1.9aaa"); //1
Number.parseInt("a1"); //NaN

//Number.parseFloat();
Number.parseFloat("1"); //1
Number.parseFloat("1.2"); //1.2
Number.parseFloat("1.23#"); //1.23
Number.parseFloat("1.23aaaa"); //1.23
Number.parseFloat("a1.234"); //NaN

//Number.isInteger(); 判断一个变量是否为整数
Number.isInteger(1);//true
Number.isInteger(1.0);//true
Number.isInteger(1.1);//false
Number.isInteger("1"); // false
Number.isInteger(true); // false

Number.prototype.toFixed.call(44, 4);//

//安全整数和Number.isSafeInteger()
Math.pow(2, 53);   // 9007199254740992
9007199254740992;  // 9007199254740992
9007199254740993;  // 9007199254740992
Math.pow(2, 53) === Math.pow(2, 53) + 1;

Number.MAX_SAFE_INTEGER === Math.pow(2, 53) - 1;// true

Number.MAX_SAFE_INTEGER === 9007199254740991;// true

Number.MIN_SAFE_INTEGER === -Number.MAX_SAFE_INTEGER;// true

Number.MIN_SAFE_INTEGER === -9007199254740991;// true

//3.Math对象的扩展
//Math.trunc(); 方法用于去除一个数的小数部分，返回整数部分。
Math.trunc(4.1); // 4
Math.trunc(4.9); // 4
Math.trunc(-4.1); // -4
Math.trunc(-4.9);// -4
Math.trunc(-0.1234);// -0

Math.trunc(NaN);      // NaN
Math.trunc('foo');    // NaN
Math.trunc();         // NaN

//Math.sign(); 方法用来判断一个数到底是正数、负数、还是零。对于非数值，会先将其转换为数值
// 参数为正数，返回+1；
// 参数为负数，返回-1；
// 参数为0，返回0；
// 参数为-0，返回-0;
// 其他值，返回NaN。
Math.sign(10);// 1
Math.sign(-10);// -1
Math.sign(0);// 0
Math.sign(-0);// -0
Math.sign("123");// NaN

//Math.cbrt();方法用于计算一个数的立方根
Math.cbrt(-1); // -1
Math.cbrt(0);  // 0
Math.cbrt(1);  // 1
Math.cbrt(2); // 1.2599210498948734
Math.cbrt('8');// 2
Math.cbrt('hello');// NaN

//Math.clz32() JavaScript的整数使用32位二进制形式表示，Math.clz32方法返回一个数的32位无符号整数形式有多少个前导0。
Math.clz32(0);// 32
Math.clz32(1);// 31
Math.clz32(1000); // 22
Math.clz32(0b01000000000000000000000000000000); // 1
Math.clz32(0b00100000000000000000000000000000); // 2

//Math.imul()方法返回两个数以32位带符号整数形式相乘的结果，返回的也是一个32位的带符号整数。
Math.imul(2, 4);  // 8
Math.imul(-1, 8);  // -8
Math.imul(-2, -2);// 4

//Math.fround方法返回一个数的单精度浮点数形式。
Math.fround(0);    // 0
Math.fround(1);     // 1
Math.fround(1.337);// 1.3370000123977661
Math.fround(1.5);  // 1.5
Math.fround(NaN);  // NaN

//Math.hypot方法返回所有参数的平方和的平方根。
Math.hypot(3, 4);        // 5
Math.hypot(3, 4, 5);     // 7.0710678118654755
Math.hypot();            // 0
Math.hypot(NaN);         // NaN
Math.hypot(3, 4, 'foo'); // NaN
Math.hypot(3, 4, '5');   // 7.0710678118654755
Math.hypot(-3);          // 3

Math.sinh(x);//返回x的双曲正弦（hyperbolic sine）
Math.cosh(x);//返回x的双曲余弦（hyperbolic cosine）
Math.tanh(x);// 返回x的双曲正切（hyperbolic tangent）
Math.asinh(x);// 返回x的反双曲正弦（inverse hyperbolic sine）
Math.acosh(x);//返回x的反双曲余弦（inverse hyperbolic cosine）
Math.atanh(x);// 返回x的反双曲正切（inverse hyperbolic tangent）

//Math.signbit() 判断一个数是正数还是负数
Math.signbit(2) //false
Math.signbit(-2) //true
Math.signbit(0) //false
Math.signbit(-0) //true

//4. 指数运算符
2 ** 5; // 2的5次方
let a = 1.5;
a **= 2;
// 等同于 a = a * a;

let b = 4;
b **= 3;
// 等同于 b = b * b * b;