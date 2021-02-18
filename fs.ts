// const compose = require('koa-compose');
import compose from 'koa-compose'

const composes = [];

function use(fun) {
  composes.push(fun);
}

use(async (ctx, next) => {
  console.log('第一个中间件');
  await next();
  console.log('1->END');
});

use(async (ctx, next) => {
  console.log('第二个中间件');
  await next();
  console.log('2->END');
});

use(async (ctx, next) => {
  console.log('第三个中间件');
  await next();
  console.log('3->END');
});

const exec = compose(composes);



async function fx(ctx, next) {
    await exec(ctx, next)
}

(async () => {
    const ctx = {};
    await fx(ctx, async() =>{
        console.log("fx()")
    })
    // await exec(ctx, async () => {
    //   console.log('END');
    // });
  })();

const { verifyRequest } = require('@shopify/koa-shopify-auth');
console.log(verifyRequest)
console.log(exec)

function add(x,y) {
    return x + y
}

function ff() {
    return add
}

// ff()(1,2)

let a = {}