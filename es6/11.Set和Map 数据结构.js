// http://es6.ruanyifeng.com/#docs/set-map
// 1. Set 没有重复的成员
// 向Set加入值的时候，不会发生类型转换
const s = new Set();

[2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));

for (let i of s) {
    console.log(i);
}
// 2 3 5 4

// 例一
const set = new Set([1, 2, 3, 4, 4]);
[...set];
// [1, 2, 3, 4]

// 例二
const items = new Set([1, 2, 3, 4, 5, 5, 5, 5]);
items.size // 5

// 例三
function divs() {
    return [...document.querySelectorAll('div')];
}

const set = new Set(divs());
set.size // 56

// 类似于
divs().forEach(div => set.add(div));
set.size // 56

//2.Set的属性和方法
let set = new Set();
set.add(0);
set.delete(0);
set.has(0);
set.clear();

// Array.from方法可以将 Set 结构转为数组。
const items = new Set([1, 2, 3, 4, 5]);
const array = Array.from(items);

function dedupe(array) {
    return Array.from(new Set(array));
}

dedupe([1, 1, 2, 3]); // [1, 2, 3]

// 3.Set的遍历 ,Set的遍历顺序就是插入顺序。这个特性有时非常有用，比如使用Set保存一个回调函数列表，调用时就能保证按照添加顺序调用
let set = new Set();
set.keys();
set.values();
set.entries();
set.forEach((value, key) => {
    console.error(item)
});

// 2. WeakSet 结构与Set类似，也是不重复的集合。但是，它与Set有两个区别。首先，WeakSet的成员只能是对象，而不能是其它类型
let w = new WeakSet();
function Student() {

}
let a = new Student();
w.add(a);
w.has(a);//true
w.delete(a);


// 3.Map本质上是键值对的结合(Hash结构),但是传统上只能用字符串当作建
let m = new Map();
m.set("s", "test");
m.get("s");// test

m.set("s", "test1");
m.get("s");// test1

m.has("s"); //true
m.delete("s");
m.clear();
m.size;
m.forEach(function (value, key) {

});
m.keys();
m.values();
m.entries();

//6. WeakMap与Map的区别，WeakMap只接受对象作为键名（null除外），不接受其他类型的值作为键名
