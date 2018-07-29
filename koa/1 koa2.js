/*
    问题：
        1.Koa是什么?
        2.为什么要使用Koa?
        3.Koa和Express的区别哪儿?
        4.Koa对比Express?
*/

// http://cnodejs.org/topic/58ac640e7872ea0864fedf90
// koa2进阶学习笔记

// https://koa.bootcss.com/
// koa官网

// http://book.apebook.org/minghe/koa-action/start/index.html
// koa实战

//简介
//安装
//    1.koa依赖node v.7.6.0或ES2015及更高版本和async方法支持。

//入门
/*
    //Hello world
    const Koa = require("koa");
    const app = new Koa();
    app.use(ctx=>{
        ctx.body = "Hello world";
    });
    app.listen(3000);
*/

//级联
/*
    const Koa = require("koa");
    const app = new Koa();

    //x-response-time
    app.use(async (ctx, next) => {
        const start = Date.now();
        await next();
        const ms = Date.now() - start;
        ctx.set("X-Response-Time", `${ms}ms`);
    });

    //logger
    app.use(async (ctx, next) => {
        const start = Date.now();
        await next();
        const ms = Date.now() - start;
        console.error(`${ctx.method} ${ctx.url} ${ms}`);
    });

    app.use(async ctx => {
        ctx.body = "Hello word";
    });

    let server = app.listen(3000, function () {
        console.error("address server : http://localhost:" + server.address().port);
    });
*/

/*
    app.listen(...);

*/