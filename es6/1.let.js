//1.let只在所在作用域有效(不可以跨作用域使用)
(function () {
    if (true) {
        let a = 1;
        var b = 2;
    }
    console.error(a); //a not is undefined
    console.error(b); // b 2
})();

//2.let不能重复声明同一个变量(不存在重复声明)
(function () {
    var i = 0;
    let i = 0;
    // error Identifier 'i' has already been declared
})();

//3.用let声明的变量,必须声明后才能使用(不存在变量提升)
(function () {
    console.error(typeof i);
    let i = 1;
    console.error(i);
})();

//4.暂时性死区,只要块级作用域内存在let命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响
(function () {
    var temp = 123;
    if (true) {
        temp = "abc"; // ReferenceError
        let temp;
    }
})();

//5.块级作用域
function f1() {
    let n = 5;
    if (true) {
        let n = 10;
    }
    console.log(n); // 5
}
f1();

//6.作用域任意嵌套
{
    console.error(4);
    {
        console.error(3);
        {
            console.error(2);
            {
                console.error(1);
            }
        }
    }
}

//7.在ES5中，因为在if内声明的函数f会被提升到函数头部。在ES6中，因为块级作用域内声明的函数类似于let，对作用域之外没有影响
function f() { console.log('1'); }
(function () {
    if (false) {
        // 重复声明一次函数f
        function f() {
            console.log('2');
        }
    }
    f();
    //ES5 输出2
    //ES6 is not a function
}());