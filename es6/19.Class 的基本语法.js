// http://es6.ruanyifeng.com/#docs/class
/*
    1.简介
        function Point(x,y){
            this.x = x;
            this.y = y;
        }

        Point.prototype.toString = function(){
            return '(' + this.x + ',' +  this.y + ')';
        }

        let methodName = 'test';
        class Student {
            constructor(name) {
                this.name = name;
            }

            getName() {
                return this.name;
            }

            setName(name) {
                this.name = name;
            }

            [methodName]() {

            }
        }

        let student = new Student('zlz');

        student.getName();
        student.setName('student');
        student.getName();

        // 输出结果
        // zlz student

    2.严格模式
        类和模块的内部，默认就是严格模式，所以不需要使用use strict指定运行模式。只要你的代码写在类或模块之中，就只有严格模式可用。
        考虑到未来所有的代码，其实都是运行在模块之中，所以 ES6 实际上把整个语言升级到了严格模式。

    3.constructor方法
        constructor方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被默认添加。

        class A {
            toString() {
                console.info('A');
            }
        }

        class B {
            constructor() {
                return A;
            }

            toString() {
                console.info('B');
            }
        }

        let b = new B();

        console.info(b.toString());

    4.类的实例对象
        class Point {
          // ...
        }

        // 报错
        var point = Point(2, 3);

        // 正确
        var point = new Point(2, 3);

        //定义类
        class Point {

          constructor(x, y) {
            this.x = x;
            this.y = y;
          }

          toString() {
            return '(' + this.x + ', ' + this.y + ')';
          }

        }

        var point = new Point(2, 3);

        point.toString() // (2, 3)

        point.hasOwnProperty('x') // true
        point.hasOwnProperty('y') // true
        point.hasOwnProperty('toString') // false
        point.__proto__.hasOwnProperty('toString') // true

    5.Class表达式
        const MyClass = class Me {
          getClassName() {
            return Me.name;
          }
        };

        let person = new class {
          constructor(name) {
            this.name = name;
          }

          sayName() {
            console.log(this.name);
          }
        }('张三');

        person.sayName(); // "张三"

    6.不存在变量提升
        new Foo(); // ReferenceError
        class Foo {}

    7.私有方法和私有属性
        class Widget {

          // 公有方法
          foo (baz) {
            this._bar(baz);
          }

          // 私有方法
          _bar(baz) {
            return this.snaf = baz;
          }

          // ...
        }

        class Counter {
          #xValue = 0;

          get #x() { return #xValue; }
          set #x(value) {
            this.#xValue = value;
          }

          constructor() {
            super();
            // ...
          }
        }

    8.this的指向
        class Logger {
          printName(name = 'there') {
            this.print(`Hello ${name}`);
          }

          print(text) {
            console.log(text);
          }
        }

        const logger = new Logger();
        const { printName } = logger;
        printName();

    9.name属性
        class Point {}
        Point.name // "Point"

    10.Class的取值函数(getter)和存值函数(setter)
        class MyClass {
          constructor() {
            // ...
          }
          get prop() {
            return 'getter';
          }
          set prop(value) {
            console.log('setter: '+value);
          }
        }

        let inst = new MyClass();

        inst.prop = 123;
        // setter: 123

        inst.prop
        // 'getter'

    11.Class的Generator方法
        class Foo {
          constructor(...args) {
            this.args = args;
          }
          * [Symbol.iterator]() {
            for (let arg of this.args) {
              yield arg;
            }
          }
        }

        for (let x of new Foo('hello', 'world')) {
          console.log(x);
        }
        // hello
        // world

    12.Class的静态方法
        class Foo {
          static classMethod() {
            return 'hello';
          }
        }

        Foo.classMethod() // 'hello'

        var foo = new Foo();
        foo.classMethod()

    13.Class的静态属性和实例属性
        class Foo {
        }

        Foo.prop = 1;
        Foo.prop // 1
        // 目前，只有这种写法可行，因为 ES6 明确规定，Class 内部只有静态方法，没有静态属性。

    14.new.target属性
        new是从构造函数生成实例对象的命令。ES6 为new命令引入了一个new.target属性，该属性一般用在构造函数之中，返回new命令作用于的那个构造函数。如果构造函数不是通过new命令调用的，new.target会返回undefined，因此这个属性可以用来确定构造函数是怎么调用的
*/


