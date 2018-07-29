// http://es6.ruanyifeng.com/#docs/generator
/*
    1.Generator函数是异步函数编程解决方案。语法行为与传统函数完全不同
    2.Generator函数是一个普通函数,但是有两个特征
        1)function关键字与函数名之间有一个*
        2)函数体内部使用yield表达式,定义不同的内部状态
            function* f(){
                yield "a";
                yield "b";
                return "c";
            }

            let hw = f();

            hw.next(); //{done : false, value : "a"};
            hw.next(); //{done : false, value : "b"};
            hw.next(); //{done : true, value : "c"};
            hw.next(); //{done : true, value : undefined};

            for(let item of f()){
                console.error(item); // a b
            }

        3)调用Generator不是执行函数,而不是返回函数的运行结构。而是指向一个内部状态的指针对象

        4)ES6中没有规定function关键字与函数之间的星号,写在那个位置。导致下面的写法都能通过
            function* f (){}
            function * f (){}
            function *f (){}
            function*f(){}

    3.yield表达式:Generator函数返回的遍历器对象。只有调用next方法才会遍历下一个内部状态。yield是暂停的标志
        1)遇到yield表达式,就暂停执行后面的操作.并将紧跟在yield后面的那个表达式值,作为返回的value属性值
        2)下一次调用next方法时,再继续往下执行,直到遇到下一个yield表达式
        3)如果没有遇到下一个yield表达式,就一直往下执行。直到return语句为止。并将return语句后面的表达式的值，作为返回的对象的value属性值。
        4)如果该函数没有return语句，则返回的对象的value属性值为undefined。

        注:另外需要注意，yield表达式只能用在 Generator 函数里面，用在其他地方都会报错

    4.yield和return的区别
        1)相似之处：都能返回紧跟在后面的那个表达式值
        2)不同之处：yield有暂停功能,下一次再该位置继续向后执行,而return不具备记忆功能,因为只能执行一个return。但是可以执行多个yield

    5.yield的使用注意点
        1)只能在Generator里
            (function (){
              yield 1; //SyntaxError: Unexpected number
            })();

        2)yield表达式如果用在另外一个表达式之中,必须放在圆括号里
            function* demo(){
                console.log('Hello' + yield); // SyntaxError
                console.log('Hello' + yield 123); // SyntaxError

                console.log('Hello' + (yield)); // OK
                console.log('Hello' + (yield 123)); // OK
            }

        3)yield表达式用作函数参数或放在赋值表达式的右边，可以不加括号。
            function* demo() {
              foo(yield 'a', yield 'b'); // OK
              let input = yield; // OK
            }

    6.与iterator接口的关系
        1)由于Generator函数就是遍历器生成函数,因此可以把Generator赋值给[Symbol.iterator]
            let obj = {};

            obj[Symbol.iterator] = function* () {
                yield "a";
                yield "b";
                yield "c";
            };

            for(let item of obj){
                console.error(item);
            }

        2)next方法的参数
            function* f() {
              for(var i = 0; true; i++) {
                var reset = yield i;
                if(reset) { i = -1; }
              }
            }

            var g = f();

            g.next() // { value: 0, done: false }
            g.next() // { value: 1, done: false }
            g.next(true) // { value: 0, done: false }

        3)next参数的使用
            function* f(){
                let a = 1;
                let b = yield a+1;
                let c = yield b+1;
            }

            let a = f();
            a.next().value;//2
            a.next().value;//NaN

            let b = f();
            b.next().value; //2
            b.next(2).value; //3

    7.for...of循环
        function* foo() {
          yield 1;
          yield 2;
          yield 3;
          yield 4;
          yield 5;
          return 6;
        }

        for (let v of foo()) {
          console.log(v);
        }
        // 1 2 3 4 5

    8.throw方法
        function* f(){
            try{
                yield;
            }catch(e){
                console.error("内部捕捉:",e);
            }
        }

        let a = f();

        try{
            a.throw("a");
            a.throw("b");
        }catch(err){
            console.error("外部捕捉:",b);
        }

    9.throw之后会自动执行一次next
        var gen = function* gen(){
            try {
                yield console.log('a');
            } catch (e) {
                // ...
            }
            yield console.log('b');
            yield console.log('c');
        }

        var g = gen();
        g.next() // a
        g.throw() // b  todo throw 之後自動執行了一次next,才會輸出b
        g.next() // c

    10.generator抛出异常之后,内部没有捕捉。generator将结束
        function* g() {
            yield 1;
            console.error("throw exception");
            throw new Error("throw exception");
            yield 2;
            yield 3;
        }

        function log(gn) {
            console.error("start");
            try {
                console.error("1.next :", gn.next());
            } catch (e) {
                console.error("1 :", e);
            }

            try {
                console.error("2.next :", gn.next());
            } catch (e) {
                console.error("2 :", e);
            }

            try {
                console.error("3.next :", gn.next());
            } catch (e) {
                console.error("3 :", e);
            }

            console.error("end");
        }

        log(g());

    11.return方法
        1)总结遍历
            function* gen() {
              yield 1;
              yield 2;
              yield 3;
            }

            var g = gen();

            g.next()        // { value: 1, done: false }
            g.return('foo') // { value: "foo", done: true }
            g.next()        // { value: undefined, done: true }

        2)return方法不传参数,这返回的value为undefined
            function* gen() {
              yield 1;
              yield 2;
              yield 3;
            }

            var g = gen();

            g.next();        // { value: 1, done: false }
            g.return();      // { value: undefined, done: true }

        3)如果generator有try...finally代码块。那么return方法会推迟到finally代码执行之后再执行
            function* numbers() {
                yield 1;
                try {
                    yield 2;
                    yield 3;
                } finally {
                    yield 4;
                    yield 5;
                }
                yield 6;
            }

            var g = numbers();
            console.error(g.next()); // { value: 1, done: false }
            console.error(g.next()); // { value: 2, done: false }
            console.error(g.return(7)); // { value: 4, done: false }
            console.error(g.next()); // { value: 5, done: false }
            console.error(g.next()); // { value: 7, done: true }
            console.error(g.next()); // { value: undefined, done: true }

    12.next()、throw()、return()的共同点
        1)都是让generator恢复执行
        2)next()是将一个yield替换成一个值
            const g = function* (x, y) {
              let result = yield x + y;
              return result;
            };

            const gen = g(1, 2);
            gen.next(); // Object {value: 3, done: false}

            gen.next(1); // Object {value: 1, done: true}
            // 相当于将 let result = yield x + y
            // 替换成 let result = 1;

        3)throw()是将yield表达式替换成一个throw语句
            gen.throw(new Error('出错了')); // Uncaught Error: 出错了
            // 相当于将 let result = yield x + y
            // 替换成 let result = throw(new Error('出错了'));

        4)return()是将yield表达式替换成一个return语句。
            gen.return(2); // Object {value: 2, done: true}
            // 相当于将 let result = yield x + y
            // 替换成 let result = return 2;

    13.yield*
        1)在一个Generator中调用另一个Generator函数,默认情况下是没有效果的
            function* a(){
                yield "a";
                yield "a1";
            }

            function* b(){
                yield "b";
                yield "b1";
                a();
            }

            for(let item of b()){
                console.error(item); // b b1
            }

        2)这时候就要用到yield*
            a、遍历iterator对象

        3)作为对象属性的Generator函数
            let obj = {
                * myGeneratorMethod(){

                }
            }

            let obj = {
                myGeneratorMethod : function* (){

                }
            }

    14.Generator函数的this
        1)Generator函数也有prototype
            function* f(){}

            f.prototype.hello = function(){
                return "hello";
            }

            let obj = f();

            obj instanceof f; //true
            obj.hello(); //hello

            function* g() {
              this.a = 11;
            }

            let obj = g();
            obj.next();
            obj.a // undefined

        2)Generator不能和new命令一起使用
            function* F() {
              yield this.x = 2;
              yield this.y = 3;
            }

            new F()
            // TypeError: F is not a constructor
*/