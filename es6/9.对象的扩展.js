// http://es6.ruanyifeng.com/#docs/object
//1.属性的简洁表示法
let foo = "bar";
let baz = {foo};
baz //{foo : "bar"}

function f(x, y) {
    return {x, y}
}


function f(x, y) {
    return {x: x, y: y}
}

var o = {
    method(){

    },
    f,
    e: "e"
};

var o = {
    method: function () {

    }
};

var cart = {
    _wheels: 4,

    get wheels() {
        return this._wheels;
    },

    set wheels(value) {
        if (value < this._wheels) {
            throw new Error('数值太小了！');
        }
        this._wheels = value;
    }
};

// 2.属性名表达式
let propKey = 'foo';

let obj = {
    [propKey]: true,
    ['a' + 'bc']: 123
};

// 报错
var foo = 'bar';
var bar = 'abc';
// var baz = { [foo] };

// 正确
var foo = 'bar';
var baz = { [foo]: 'abc'};

const keyA = {a: 1};
const keyB = {b: 2};

const myObject = {
    [keyA]: 'valueA',
    [keyB]: 'valueB'
};

myObject // Object {[object Object]: "valueB"}

// 3.方法的name属性
const person = {
    sayName() {
        console.log('hello!');
    },
};

person.sayName.name;   // "sayName"

//4. Object.is()ES5比较两个值是否相等，只有两个运算符
Object.is("","");

//5.Object.assign()
Object.assign({a: "a"}, {a: "a1", b:"b"});// {a : "a1",b:"b"},后面的覆盖前面的，并且返回一个新对象

//如果只有一个参数，Object.assign会直接返回该参数。
var obj = {a: 1};
Object.assign(obj) === obj // true

//如果该参数不是对象，则会先转成对象，然后返回
typeof Object.assign(2) // "object"

//由于undefined和null无法转成对象，所以如果它们作为参数，就会报错。
Object.assign(undefined); // 报错
Object.assign(null); // 报错

//注意点
//Object.assign方法实行的是浅拷贝，而不是深拷贝。也就是说，如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用。

//6.属性的可枚举性 Object.getOwnProperty(obj , "name");

//7.属性的遍历
//7.1 for...in 循环遍历对象和继承的可枚举属性
//7.2 Object.keys(obj) 返回一个数组，包括对象自身的(不含继承的)所有可枚举的属性(不包含Symbol属性)
//7.3 Object.getOwnPropertyNames(obj) 返回一个数组，包含对象自身的所有属性(包含可枚举属性)(不包含Symbol属性)
//7.4 Object.getOwnPropertySymbols(obj) 返回一个数组,包含对象自身所有的Symbol属性

//8. __proto__ 属性
Object.setPrototypeOf(a, function Student() {

});
Object.getPrototypeOf(a);

//9. Object.keys(), Object.values(), Object.entries();

//10.对象的解构赋值

//11.Object.getOwnPropertyDescriptors();返回指定对象所有自身属性（非继承属性）的描述对象

//12.Null的传导运算符
