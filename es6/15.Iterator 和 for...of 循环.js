// http://es6.ruanyifeng.com/#docs/iterator

/*
    1.iterator是做什么用的,它的出现主要为了解决什么问题?
        答:为不同的数据结构提供统一的访问机制(Array、Object、Map、Set)

    2.iterator的作用?
        a、为各种数据,提供一个统一、简便的访问接口。
        b、使数据结构成员能够按照某种次序排序。
        c、ES6创造了一种新的遍历命令for...of循环.

    3.iterator遍历的过程
        a、创建一个指针对象,指向当前数据结构的起始位置。也就是说,遍历器对象本质上。就是一个指针对象
        b、第一次调用指针对象的next方法,可以将指针指向数据结构的第一个成员
        c、第二次调用指针对象的next方法,指针就指向数据结构的第二个成员
        d、不断调用指针对象的next方法,直到它指向数据结构的结束位置

        function makeIterator(array) {
            var nextIndex = 0;
            return {
                next: function () {
                    if (nextIndex < array.length) {
                        return {
                            value: array[nextIndex++],
                            done: false
                        }
                    } else {
                        return {
                            value: undefined,
                            done: true
                        }
                    }
                }
            }
        }

        var it = makeIterator([1, 2, 3, 4]);

        console.error(it.next());
        console.error(it.next());
        console.error(it.next());
        console.error(it.next());
        console.error(it.next());
        console.error(it.next());

    4.自带iterator的对象Map、Set、Array

    5.给Obj增加iterator
        function Obj(value) {
            this.value = value;
            this.next = null;
        }

        Obj.prototype[Symbol.iterator] = function () {
            var iterator = {next: next};
            var current = this;

            function next() {
                if (current) {
                    var value;

                    value = current.value;
                    current = current.next;

                    return {
                        done: false,
                        value: value
                    }
                } else {
                    return {
                        done: true,
                        value: undefined
                    }
                }
            }

            return iterator;
        };

        var o1 = new Obj(1);
        var o2 = new Obj(2);
        var o3 = new Obj(3);

        o1.next = o2;
        o2.next = o3;

        for(let vl of o1){
            console.error(vl);
        }

    6.类似于数组的对象才能部署Symbol.iterator
        let obj = {
            0 : "a",
            1 : "b",
            2 : "c",
            length : 3,
            [Symbol.iterator] : Array.prototype[Symbol.iterator]
        }

        for(let item of obj){
            console.error(item); // a 、 b 、c
        }

    7.普通对象部署Symbol.iterator无效
        let obj = {
            a : "a",
            b : "b",
            c : "c",
            length : 3,
            [Symbol.iterator] : Array.prototype[Symbol.iterator]
        }

        for(let item of obj){
            console.error(item); //undefined,undefined,undefined
        }

    8.对象的Symbol.iterator必须指向一个遍历器函数,否则会报错
        var obj = {};

        obj[Symbol.iterator] = () => 1;

        [...obj] // TypeError: [] is not a function
        //变量obj的Symbol.iterator方法对应的不是遍历器生成函数，因此报错。

    9.使用while循环遍历
        let arr = [1,2,3,4];
        let ite = arr[Symbol.iterator]();
        let item = ite.next();
        while(item.done === false){
            console.error(item.value);
            item = ite.next();
        }

    10.调用iterator接口的场合
        1)解构赋值
            let set = new Set().add("a").add("b").add("c");
            let [a,b,c] = set;
            console.error(a,b,c);

        2)扩展运算符
            let hello = "hello";
            console.error([...hello]);

        3)yield*

        4)其他场合
*/

/*
    注意：
        1.对象Object为什么没有iterator
            答:是因为不知道先遍历那个属性,后遍历那个属性。


*/