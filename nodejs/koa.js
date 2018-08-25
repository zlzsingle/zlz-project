const Koa = require("koa");
const Routers = require("koa-router");

const app = new Koa();
const router = new Routers({prefix: "/api"});

router.get('/student', async ctx => {
    ctx.body = ctx.originalUrl;
    ctx.status = 200;
});

app.use(router.routes());
app.listen(process.env.PORT || 3000);
