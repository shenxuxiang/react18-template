const Koa = require('koa');
const static = require('koa-static');
const path = require('path');

const app = new Koa();

app.use(static(path.resolve('dist')));

app.use(async (ctx, next) => {
  console.log(ctx.url);
  await next();
});

app.listen(8000, function() {
  console.log('server start 8000');
})
