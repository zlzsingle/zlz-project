// http://es6.ruanyifeng.com/#docs/regex
// 1. RegExp构造函数, 在ES6中允许构造函数第二个参数
// i 大小写不敏感匹配
var regexp = new RegExp("xyz", "i");

// g 全局匹配
var regexp = new RegExp("xyz", "g");

// m 多行匹配
var regexp = new RegExp("xyz", "m");

// 2.flags
var regexp = new RegExp("test", "g");
regexp.flags; // g

//3.字符串正则表达式方法
var str = "";
str.match(regexp); // 检查是否有匹配的文本

str.replace(regexp, ""); //将字符串匹配的文本替换成指定的文本

str.search(regexp);//返回文本匹配的第一个索引

str.split(regexp);//简称到匹配的字符就分割成数组

//4.ES6 对正则表达式添加了u修饰符，含义为“Unicode模式”，用来正确处理大于\uFFFF的 Unicode 字符。也就是说，会正确处理四个字节的 UTF-16 编码
/^\uD83D/u.test('\uD83D\uDC2A'); // false
/^\uD83D/.test('\uD83D\uDC2A'); // true

//4.1 点字符。 点（.）字符在正则表达式中，含义是除了换行符以外的任意单个字符。对于码点大于0xFFFF的 Unicode 字符，点字符不能识别，必须加上u修饰符
var s = '𠮷';
/^.$/.test(s); // false
/^.$/u.test(s); // true

//4.2 Unicode 字符表示法。ES6 新增了使用大括号表示 Unicode 字符，这种表示法在正则表达式中必须加上u修饰符，才能识别当中的大括号，否则会被解读为量词。
/\u{61}/.test('a'); // false
/\u{61}/u.test('a'); // true
/\u{20BB7}/u.test('𠮷'); // true

//4.3 量词 使用u修饰符后，所有量词都会正确识别码点大于0xFFFF的 Unicode 字符。
/a{2}/.test('aa'); // true
/a{2}/u.test('aa'); // true
/𠮷{2}/.test('𠮷𠮷');// false
/𠮷{2}/u.test('𠮷𠮷'); // true

//4.4 预定义模式, u修饰符也影响到预定义模式，能否正确识别码点大于0xFFFF的 Unicode 字符
//\S是预定义模式，匹配所有不是空格的字符。只有加了u修饰符，它才能正确匹配码点大于0xFFFF的 Unicode 字符。
/^\S$/.test('𠮷'); // false
/^\S$/u.test('𠮷');// true

//4.5 i 修饰符,Unicode 字符的编码不同，但是字型很相近，比如，\u004B与\u212A都是大写的K。
/[a-z]/i.test('\u212A'); // false
/[a-z]/iu.test('\u212A');// true

//5 Y 修饰符
var s = 'aaa_aa_a';
var r1 = /a+/g;
var r2 = /a+/y;

r1.exec(s);// ["aaa"]
r2.exec(s); // ["aaa"]

r1.exec(s);// ["aa"]
r2.exec(s);// null

//5.1 lastIndex

const REGEX = /a/g;

// 指定从2号位置（y）开始匹配
REGEX.lastIndex = 2;

// 匹配成功
const match = REGEX.exec('xaya');

// 在3号位置匹配成功
match.index; // 3

// 下一次匹配从4号位开始
REGEX.lastIndex; // 4

// 4号位开始匹配失败
REGEX.exec('xaxa'); // null

//6. sticky属性，与ｙ修饰符相匹配，表示是否设置了ｙ修饰符
var r = /hello\d/y;
r.sticky; // true

//7. flags属性
// ES5 的 source 属性
// 返回正则表达式的正文
/abc/ig.source;
// "abc"

// ES6 的 flags 属性
// 返回正则表达式的修饰符
/abc/ig.flags;
// 'gi'

//8. s修饰符
/foo.bar/.test('foo\nbar'); // false
/foo[^]bar/.test('foo\nbar'); //true
/foo.bar/s.test('foo\nbar'); // true

// 8.1 dotAll属性
const re = /foo.bar/s;
// 另一种写法
// const re = new RegExp('foo.bar', 's');

re.test('foo\nbar'); // true
re.dotAll; // true
re.flags;// 's'

