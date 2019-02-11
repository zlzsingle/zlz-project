// http://es6.ruanyifeng.com/#docs/promise
// 1.Promise对象是异步编程的一种解决方案，所有Promise对象就是一个容器，里面保存着某个未来才会结束的事件。
/*
    a、对象的状态不受外界影响，Promise对象代表一个异步操作。有三种状态，Pending(进行中),Resolved(已完成)，Rejected(已失败)
       只有异步操的结果，可以决定当前是哪一种状态。
    b、一旦状态改变就无法再变，状态的改变只有两种情况。从pending变成resolved，pending变成rejected
    c、缺点：无法取消Promise，一旦新建它就会立即执行，无法中途取消
*/

/*
    1.Promise对象是做什么用的?
        答：异步编程的解决方案。

    2.使用Promise有什么好处?
        答：避免了传统式开发的层层回调。提供了丰富的api。

    3.Promise有什么缺点?
        答：无法取消,一旦建立了就会立即执行。无法中途取消,其次如果不设置回调函数。内部抛出的error将无法捕捉。

    4.使用Promise对象实现一个异步的流程控制?

*/

/*
    1.Promise是一个异步编程的解决方案。
    2.Promise有三种状态,pending(进行中),resolve(成功),reject(失败);
    3.缺点:一旦新建就会立即执行,而且无法中途取消。如果不设置回调函数,无法捕抓Error。
    4.基本用法
        let promise = new Promise(function(resolve,reject){
            if(Date.now() % 2 === 0){
                resolve(1);
            } else {
                reject(0);
            }
        });
        promise.then(result => {
            console.info(result);
        }).catch(err => {
            console.error("err:",err);
        });

        a、新建后就会立即执行
        b、then指定回调函数,将在当前脚本所有同步任务执行完成之后才会执行。

    5.代码例子,将一个Promise对象当做参数返回
        let p1 = new Promise(function(resolve,reject){
            setTimeout(function(){
                console.info("p1 reject");
                reject(1);
            },5000)
        });
        let p2 = new Promise(function(resolve,reject){
            setTimeout(function(){
                resolve(p1);
            },3000);
        });
        p2.then(function(result){
            console.error("result : ",result);
        }).catch(function(err){
            console.error("err:"+err);
        });
        //p1 reject
        //err:1

    6.Promise.prototype.then(),then方法支持两个参数。第一个参数对应resolve状态的回调函数。第二个参数对应reject状态的回调函数(第二个参数可选)。
        //then的基本使用
        let p = new Promise(function(resolve,reject){
            resolve();
        });

        p.then(()=>{
            return 2;
        }).then((result)=>{
            console.error("result : ",result);
        });

        //在then中返回一个Promise对象
        let p1 = new Promise(function (resolve, reject) {
            console.error("p1");
            setTimeout(function () {
                resolve("p1");
            }, 2000);
        });

        let p2 = new Promise(function (resolve, reject) {
            setTimeout(function () {
                console.error("p2");
                reject("p2");
            }, 5000);
        });

        p1.then((result) => {
            console.error("p1 then : ", result);
            return p2;
        }).then((result) => {
            console.error("p2 then : ", result);
        }).catch((err) => {
            console.error("err :", err);
        });

    7.Promise.prototype.catch(),捕抓异常
        getJSON('/post/1.json').then(function(post) {
          return getJSON(post.commentURL);
        }).then(function(comments) {
          // some code
        }).catch(function(error) {
          // 处理前面三个Promise产生的错误
        });

    8.Promise.prototype.finally(),ES2018引入的标准

    9.Promise.all();用于将多个Promise实例包装成一个新的Promise实例。
        const p = Promise.all([p1,p2,p3]);
        //p的状态由于p1、p2、p3决定两种情况
        //1)p1、p2、p3分别是resolve,那么p的状态就是resolve
        //2)p1、p2、p3只要有一个是reject,那么p的状态就是reject;

        let p1 = new Promise((resolve)=>resolve("p1"));
        let p2 = new Promise((resolve)=>resolve("p2"));

        Promise.all([p1,p2]).then(([p1,p2])=>{
            console.error(p1,p2);
        }).catch((err)=>{
            console.error(err);
        });

    10.Promise.rece();
        const p = Promise.race([p1, p2, p3]);
        //p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给p的回调函数

    11.Promise.resolve();将一个对象转成Promise对象。
        Promise.resolve的参数分成四种情况
            1)参数是Promise对象
                let p1 = new Promise(()=>{
                });
                Promise.resolve(p1);
                //不做任何修改,原封不动返回

            2)参数是obj
                let obj = {
                    then : (resolve,reject)=>{
                        resolve(41);
                    }
                };
                let p1 = Promise.resolve(obj);
                p1.then((rs)=>{
                    console.error("rs :"+rs); //41
                });

            3)参数是值类型
                let p1 = Promise.resolve("hello");
                p1.then((s)=>{
                    console.error(s); //hello
                });

            4)不带任何参数
                const p = Promise.resolve();
                p.then(function () {

                });

    12.Promise.reject();
        //返回一个行的Promise对象。状态是rejected
        let p1 = Promise.reject("error");
        p1.then(null,function(err){
            console.error("err : "+err);
        });
*/
