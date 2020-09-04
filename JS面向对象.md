# JS面向对象

## 构造函数和原型

构造函数创建对象

```javascript
function Star(uname, age) {
    this.uname = uname;
    this.age = age;
    this.sing = function(){
        console.log('我会唱歌');
    }
}
var ldh = new Star('刘德华', 30);
console.log(ldh);
ldh.sing();
```

> `new`  在执行时会做四件事情

1. 在内存中创建一个新的空对象
2. 让 `this` 指向这个新的对象
3. 执行构造函数里面的代码，给这个新对象添加属性和方法
4. 返回这个新对象（构造函数中不用 `return` ）

### 实例成员

实例成员就是构造函数内部通过 `this` 添加的成员，如以上代码中的 `uname` `age` `sing` 

实例成员只能通过实例化对象访问

```javascript
console.log(ldh.uname);		// 刘德华
ldh.sing();					// 我会唱歌
console.log(Star.uname);	// undefined
```

### 静态成员

静态成员就是在构造函数本身添加的成员，如下:

```javascript
Star.sex = '男'
```

静态成员只能通过构造函数访问

```javascript
console.log(Star.sex)	// 男
console.log(ldh.sex)	// undefined
```

**构造函数很好用，但是存在浪费内存的问题** 

## 构造函数原型prototype

构造函数通过原型分配的函数是所有对象共享的

每一个构造函数都有一个 `prototype` 属性，指向另一个对象

这个 `prototype` 就是一个对象，这个对象的所有属性和方法，都会被构造函数所拥有

作用：我们可以把那些不变的方法，直接定义在prototype对象上，这样所有对象的实例就可以共享这个方法

```javascript
function Star(uname, age) {
    this.uname = uname;
    this.age = age;
    /* this.sing = function(){
        console.log('我会唱歌');
    } */
}
Star.prototype.sing = function(){
	console.log('我会唱歌')
}
var ldh = new Star('刘德华', 30);
var zxy = new Star('张学友', 40);
ldh.sing();		// 我会唱歌
zxy.sing();		// 我会唱歌
console.log(ldh.sing === zxy.sing)	// true
```

1. 原型是什么？

   一个对象，我们也称为 `prototype` 的原型对象

2. 原型的作用是什么？

   共享方法

> 一般情况下，公共属性定义到构造函数里面，公共的方法放到原型对象上
>
> 对象身上系统会自动添加一个 `__proto__` 指向我们构造函数的原型对象
>
> `__proto__` 对象原型与原型对象 `prototype` 是等价的

方法查找规则：

1. 先查找构造函数中是否有 `sing` 方法，如果有就执行次方法
2. 如果没有，因为有 `__proto__` 的存在，就会去构造函数原型对象 `prototype` 中查找 `sing` 方法

## constructor构造函数

对象原型 `__proto__` 和构造函数 `prototype` 原型对象里面都有一个属性: `constructor` ，我们称之为构造函数，因为它指向构造函数本身 

作用：用于记录该对象引用与哪个构造函数，它可以让原型对象重新指向原来的构造函数

```javascript
function Star(uname, age) {
    this.uname = uname;
    this.age = age;
    /* this.sing = function(){
        console.log('我会唱歌');
    } */
}
Star.prototype.sing = function(){
	console.log('我会唱歌')
}
var ldh = new Star('刘德华', 30);
var zxy = new Star('张学友', 40);
console.log(Star.prototype.constructor);
console.log(ldh.__proto__.constructor);
```

很多情况下，我们需要手动利用`constructor` 这个属性指回原来的构造函数

```javascript
function Star(uname, age) {
    this.uname = uname;
    this.age = age;
}
/* Star.prototype.sing = function(){
	console.log('我会唱歌')
}
Star.prototype.movie = function(){
	console.log('我会演电影')
} */
Star.prototype = {
    constructor: Star,		// 这行代码将指回原来 (Star) 的构造函数
    sing: function(){
        console.log('我会唱歌')
    },
    movie: function(){
        console.log('我会演电影')
    }
}
var ldh = new Star('刘德华', 30);
var zxy = new Star('张学友', 40);
console.log(Star.prototype.constructor);
console.log(ldh.__proto__.constructor);
```

## 原型链

1. 只要是对象就有 `__proto__` 原型，指向原型对象

2. Star原型对象里面的 `__proto__` 原型指向的是 `Object.protyotype` 
3. `Object.prototype` 原型对象里面的 `__proto__` 原型 指向为 `null` 

```javascript
function Star(uname, age) {
    this.uname = uname;
    this.age = age;
}
Star.prototype.sing = function(){
	console.log('我会唱歌')
}
var ldh = new Star('刘德华', 30);
console.log(Star.prototype);
console.log(Star.prototype.__proto__ === Object.prototype);		// true
```

## JavaScript的成员查找机制（规则）

1. 当访问一个对象的属性（包括方法）时，首先查找这个对象自身有没有该属性
2. 如果没有就查找它的原型（也就是 `__proto__` 指向的 `prototype` 原型对象）
3. 如果还没找到就查找原型对象的原型（`Object`  的原型对象）
4. 依次类推一直找到 `Object` 为止（ `null` ）

```javascript
function Star(uname, age) {
    this.uname = uname;
    this.age = age;
}
Star.prototype.sing = function(){
	console.log('我会唱歌')
}
var ldh = new Star('刘德华', 30);
Object.prototype.sex = '1';			// Object的原型
// Star.prototype.sex = '男';		// 原型
// ldh.sex = '男';					// 对象自身
/* 对象属性查找有一个就近原则 */
console.log(ldh.sex);
```

## 原型对象this指向

```javascript
function Star(uname, age) {
    this.uname = uname;
    this.age = age;
}
var that;
Star.prototype.sing = function(){
	console.log('我会唱歌')
    that = this;
}
var ldh = new Star('刘德华', 30);
// 1. 在构造函数中，里面的 this指向的是对象实例 ldh
ldh.sing();
console.log(that === ldh); // true
// 2. 原型对象函数里面的 this 指向的是实例对象 ldh
```



































































