// http://es6.ruanyifeng.com/#docs/async
/*
    1.async函数对generator进行了改进
        1)内置执行器
        2)更好的语义
        3)更广的适用性
        4)返回值是Promise

    2.只要有一个await的Promise的状态编程reject,整个async function就会退出。除非有内部try..catch捕捉

    3.await只能在async函数中

*/