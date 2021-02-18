/*
JavaScript 对象是动态的属性“包”（指其自己的属性）。JavaScript 对象有一个指向一个原型对象的链。
当试图访问一个对象的属性时，它不仅仅在该对象上搜寻，还会搜寻该对象的原型，以及该对象的原型的原型，
依次层层向上搜索，直到找到一个名字匹配的属性或到达原型链的末尾。
*/
function f() {
    this.a = 1;
    this.b = 2;
}
f.prototype.b = 3;
f.prototype.c = 4;
var o = new f(); // {a: 1, b: 2}
console.log(o.__proto__)
console.log(o.constructor.prototype)
console.log(o.constructor == f)
console.log(f.prototype)

/* 在 JavaScript 里，任何函数都可以添加到对象上作为对象的属性。
函数的继承与其他的属性继承没有差别，包括上面的“属性遮蔽”（这种情况相当于其他语言的方法重写）。
当继承的函数被调用时，this 指向的是当前继承的对象，而不是继承的函数所在的原型对象。
*/
var o = {
    a: 2,
    m: function () {
        return this.a + 1;
    }
};

console.log(o.m()); // 3
// 当调用 o.m 时，'this' 指向了 o.

var p = Object.create(o);
// p是一个继承自 o 的对象

p.a = 4; // 创建 p 的自身属性 'a'
console.log(p.m()); // 5

function doSomething() { }
console.log(doSomething.prototype);
// 和声明函数的方式无关，
// JavaScript 中的函数永远有一个默认原型属性。
var doSomething = function () { };
doSomething.prototype.foo = "bar";
console.log(doSomething.prototype);
var doSth = new doSomething()
console.log(doSth.foo)
doSth.foo = "foo"
console.log(doSth.foo)


// 使用语法结构创建的对象
var o = {}
// 使用构造器创建的对象
var doSth = new doSomething()
// 使用 Object.create 创建的对象
var a = { a: 100 }
var b = Object.create(a); // 原型链继承
// 使用 class 关键字创建的对象 class, constructor，static，extends 和 super。

function Graph() {
    this.vertices = [];
    this.edges = [];
}

Graph.prototype = {
    addVertex: function (v) {
        this.vertices.push(v);
    }
};

var g = new Graph();
console.log(g.hasOwnProperty('vertices'));
console.log(g.hasOwnProperty('addVertex'));
console.log(Object.getOwnPropertyNames(g))
//   console.log()


// 4 个用于拓展原型链的方法
// 1. New-initialization
function foo() { }
foo.prototype = {
    foo_prop: "foo val"
};

// 2. Object.create
function foo() { }
foo.prototype = {
    foo_prop: "foo val"
};
function bar() { }
var proto = Object.create(
    foo.prototype,
    {
        bar_prop: {
            value: "bar val"
        }
    }
);
console.log(`${proto.foo_prop}, ${proto.bar_prop}`)
// Object.setPrototypeOf
function foo() { }
foo.prototype = {
    foo_prop: "foo val"
};
function bar() { }
var proto = {
    bar_prop: "bar val"
};
Object.setPrototypeOf(
    proto, foo.prototype
);
// __proto__
function foo() { }
foo.prototype = {
    foo_prop: "foo val"
};
function bar() { }
var proto = {
    bar_prop: "bar val",
    __proto__: foo.prototype
};

console.log(Math.max.call(null, 1, 2, 19, 6));
console.log(Math.max.apply(null, [1, 2, 19, 6]));
function fn10() {
    return Array.prototype.slice.call(arguments);
}
console.log(fn10(1, 2, 3, 4, 5)); // [1, 2, 3, 4, 5]


(function () {
    function ITPHelper(opts) {
        console.log(opts);
        this.redirectUrl = opts.redirectUrl;
    }

    ITPHelper.prototype.redirect = function () {
        sessionStorage.setItem('shopify.top_level_interaction', true);
        window.location.href = this.redirectUrl;
    }

    ITPHelper.prototype.setUpContent = function (onClick) {
        this.itpContent.style.display = 'block';
        this.itpAction.addEventListener('click', this.redirect.bind(this));
    }

    this.ITPHelper = ITPHelper;
})();
global.redirectUrl = "baidu.com"
console.log(redirectUrl)
console.log(new ITPHelper({ redirectUrl: 'google.com' }))
function Apple(name) {
    this.name = name
}
Apple.prototype.price = function () {
    console.log(this);
    // this.price.bind(this)
}
let apple = new Apple('111')
apple.price()
