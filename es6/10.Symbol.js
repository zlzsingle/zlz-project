// http://es6.ruanyifeng.com/#docs/symbol
// 1.Symbol是Javascript第七种数据类型，前六种有 null,undefined,Boolean,String,Number,Object
// Symbol独一无二类型,作用:保证不与其它属性冲突。如下,symbol通过Symbol函数创建。注意Symbol不能使用new命令。否则会报错。
// Symbol的值不是对象,所以不能添加属性。基本上，它就是类似于字符串的数据类型
let s = Symbol();
typeof s ; //symbol

// Symbol函数可以接受字符串作为参数。

var s1 = Symbol('foo');
var s2 = Symbol('bar');

s1 // Symbol(foo)
s2 // Symbol(bar)

s1.toString(); // "Symbol(foo)"
s2.toString(); // "Symbol(bar)"

const obj = {
    toString() {
        return 'abc';
    }
};
const sym = Symbol(obj);
sym;// Symbol(abc)


// 没有参数的情况
var s1 = Symbol();
var s2 = Symbol();

s1 === s2; // false

// 有参数的情况
var s1 = Symbol('foo');
var s2 = Symbol('foo');

s1 === s2 // false

var sym = Symbol('My symbol');

"your symbol is " + sym;
// TypeError: can't convert symbol to string
`your symbol is ${sym}`;
// TypeError: can't convert symbol to string

//Symbol("zlz") 与 Symbol.for("zlz")的区别，前者每次创建一个新的。后者始终只有一个

var a = Symbol.for("zlz");
var b = Symbol.for("zlz");
a  === b ; //true

Symbol.for("bar") === Symbol.for("bar")
// true

// Symbol.keyFor();  需要注意的是，Symbol.for为Symbol值登记的名字，是全局环境的，可以在不同的 iframe 或 service worker 中取到同一个值。
var s1 = Symbol.for("foo");
Symbol.keyFor(s1); // "foo"

var s2 = Symbol("foo");
Symbol.keyFor(s2);// undefined

// Symbol.hasInstance 构造函数
class Even {
    static [Symbol.hasInstance](obj) {
        return Number(obj) % 2 === 0;
    }
}

1 instanceof Even // false
2 instanceof Even // true
12345 instanceof Even // false

// Symbol.isConcatSpreadable 数组是否可以被展开
let arr2 = ['c', 'd'];
arr2[Symbol.isConcatSpreadable] = false;
['a', 'b'].concat(arr2, 'e') // ['a', 'b', ['c','d'], 'e']

// Symbol.species  覆盖父级的构造行数

// Symbol.match

// Symbol.replace

// Symbol.search

// Symbol.split

// Symbol.iterator

// Symbol.toPrimitive

// Symbol.toStringTag

// Symbol.unscopables