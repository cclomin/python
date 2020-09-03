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

   一个对象，我们也称为 `prototype` 为原型对象

2. 原型的作用是什么？

   共享方法

> 一般情况下，公共属性定义到构造函数里面，公共的方法放到原型对象上
>
> 对象身上系统会自动添加一个 `__proto__` 指向我们构造函数的原型对象































































