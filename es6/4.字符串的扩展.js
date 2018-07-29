//http://es6.ruanyifeng.com/#docs/string
//1. Unicode 的标识符
// Javascript 允许采用"\uxxxx"形式标识一个字符，其中xxxx表示 字符的Unicode 码点
"\uD842\uDFB7";
'\z' === 'z';  // true
'\172' === 'z'; // true
'\x7A' === 'z'; // true
'\u007A' === 'z'; // true
'\u{7A}' === 'z'; // true

//2.codePointAt()
var s = "𠮷";

s.length // 2
s.charAt(0) // ''
s.charAt(1) // ''
s.charCodeAt(0) // 55362
s.charCodeAt(1) // 57271

// 3.String.fromCharCode(0xffff); //￿

// 4.字符串的遍历器接口
//ES6为字符串添加了遍历器接口（详见《Iterator》一章），使得字符串可以被for...of循环遍历
for (let a of "abc") {
    // a
    // b
    // c
}

//传统的for无法识别0xFFFF的码点
var text = String.fromCodePoint(0x20BB7);
for (let i = 0; i < text.length; i++) {
    console.log(text[i]);
}
// �
// �

// 增强版for可以坐到
for (let i of text) {
    console.error(i); // 𠮷
}

//5. at()
//ES5对字符串对象提供charAt方法，返回字符串给定位置的字符。该方法不能识别码点大于0xFFFF的字符。
'abc'.charAt(0) // "a"
'𠮷'.charAt(0) // "\uD842"

'abc'.at(0) // "a"
'𠮷'.at(0) // "𠮷"

//6.normalize()
'\u01D1'==='\u004F\u030C' //false

'\u01D1'.length // 1
'\u004F\u030C'.length // 2

'\u01D1'.normalize() === '\u004F\u030C'.normalize()

'\u004F\u030C'.normalize('NFC').length // 1
'\u004F\u030C'.normalize('NFD').length // 2


//7.includes(),startsWith(), endsWith();
// includes()：返回布尔值，表示是否找到了参数字符串。
// startsWith()：返回布尔值，表示参数字符串是否在源字符串的头部。
// endsWith()：返回布尔值，表示参数字符串是否在源字符串的尾部。

let name = "my name is zhuangLunZhi";
name.includes("name"); // true

name.startsWith("my"); // true
name.startsWith("my1"); // false

name.endsWith("zhuangLunZhi"); // true
name.endsWith("zhuangLunZhi1"); // false

name.includes("my", 3);// false 第二个参数
name.startsWith("my", 1); // false
name.startsWith("name", 3); // true

name.endsWith("zhuangLunZhi", 1); // false
name.startsWith("zhuangLunZh", 1); // true

//8.repeat(); 方法返回一个新字符串，表示将原字符串重复n次
console.error("x2".repeat(2));//  x2x2
console.error('na'.repeat(0));// ""

//如果repeat的参数是负数或者Infinity

console.error('na'.repeat(Infinity))
// RangeError
console.error('na'.repeat(-1))
// RangeError

//如果参数是0到-1之间的小数，则等同于0，这是因为会先进行取整运算。0到-1之间的小数，取整以后等于-0，repeat视同为0。
'na'.repeat(-0.9) // ""
'na'.repeat(NaN) // ""

//如果repeat的参数是字符串，则会先转换成数字。
'na'.repeat('na') // ""
'na'.repeat('3') // "nanana"


//9.padStart(), padEnd();
console.error("x".padStart(5,"0"));// 字符串不够5为就在前面补0
console.error("x".padEnd(5,"0"));// 字符串不够5为就在后面补0

'x'.padStart(4) // '   x'
'x'.padEnd(4) // 'x   '

'1'.padStart(10, '0') // "0000000001"
'12'.padStart(10, '0') // "0000000012"
'123456'.padStart(10, '0') // "0000123456"

//10.模版字符串,多行字符串``
$("#id").append(`
<h1>
    你好，我是一个测试。
</h1>
<div>
    你好，我是一个div
</div>
`);

let name = "张三";
let age = 19;
`大家好，我的名字叫${name},今年${age}`;//多行字符串中嵌入变量

// ${} 大括号里面可以放入任意javascript表达式


//12.标签模版
alert`123`

//13.String.raw();

//14.模版字符串的限制
function latex(strings) {
    // ...
}

let document = latex`
\newcommand{\fun}{\textbf{Fun!}}  // 正常工作
\newcommand{\unicode}{\textbf{Unicode!}} // 报错
\newcommand{\xerxes}{\textbf{King!}} // 报错

Breve over the h goes \u{h}ere // 报错
`