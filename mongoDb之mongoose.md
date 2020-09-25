# mongoDB之mongoose

## 连接

```javascript
// 引入 mongoose 模块
const mongoose = require('mongoose')
// 连接数据库
mongoose.connect('mongodb://localhost/playground', {
    userNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('数据库连接成功')
}).catch(err => {
    console.log(err, '数据库连接失败')
});
```

```javascript
// 创建集合规则
const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    password: String,
    hobbies: [String]
});
```

```javascript
// 使用规则创建集合
const User = mongoose.model('User', userSchema);
```

## 增

```javascript
// 1. 插入、新增数据
const user = new User({
    name: '周瑜',
    age: 36,
    email: 'zhouyu@qq.com',
    password: '123456',
    hobbies: ['大乔', '打曹孟德']
});
user.save();
```

```javascript
// 2. 插入、新增数据
User.create({
    name: '康熙',
    age: 62,
    email: 'kangxi@qq.com',
    password: '123321',
    hobbies: ['微服私访']
}).then(res => {
    console.log(res)
}).catch(err => {
    console.log(err)
})
```

## 查

```javascript
// 查询集合中的所有数据
User.find().then(res => {
    console.log(res)
})
```

```javascript
// 根据条件查询集合中的数据
User.find({
    // 多个条件以逗号隔开
    age: 39,
    // name: '刘备'
}).then(res => {
    console.log(res)
})
```

```javascript
// 查询集合中的一条文档，默认返回集合中的第一条文档
User.findOne().then(res => {
    console.log(res)
})
```

```javascript
// 根据条件查询集合中的一条文档
User.findOne({
    name: '曹孟德'
}).then(res => {
    console.log(res)
})
```

```javascript
// 条件范围内查询、下面条件标识 查找 age > 20 && age < 40 的文档
User.find({
    age: {
        $gt: 20,
        $lt: 40
    }
}).then(res => {
    console.log(res)
})
```

```javascript
// 包含查询
User.find({
    hobbies: {
        $in: ['大乔']
    }
}).then(res => {
    console.log(res)
})
```

```javascript
// 查询指定字段、以下代码表示查询 name 和 age 字段，多个字段之间空格分隔
User.find().select('name age').then(res => {
    console.log(res)
})
```

```javascript
// 查询结果不想包含某个字段，在字段名前加上 -
User.find().select('-_id').then(res => {
    console.log(res)
})
```

```javascript
// 对查询结果按某个字段排序，以下代码按照 age 字段进行排序
User.find().sort('age').then(res => {
    console.log(res)
})
// 降序排列，在条件字段前加上 - 即可
User.find().sort('-age').then(res => {
    console.log(res)
})
```

```javascript
// skip()跳过前面 n 条数据，limint()限制查询数量
User.find().skip(2).limit(3).then(res => {
    console.log(res)
})
```

## 删

```javascript
// 查找指定文档并删除，返回删除的文档
// 如果匹配了多条文档，会删除第一条文档
User.findOneAndDelete({
    _id: '5f6d5659bb401742b8c23ce7'
}).then(res => {
    console.log(res)
})
```

```javascript
/* 
	删除多条文档
	此处如果参数列表为空时，会将 User 表清空
*/
User.deleteMany({}).then(res => {
    console.log(res)
})
```

## 改

```javascript
// 更新单个, 如果匹配了多条文档，会更新第一条文档
User.updateOne({查询条件}, {更新的值}).then(res => {
    console.log(res)
})
```

```javascript
// 更新多个 // 下面代码标识，更新所有文档的 age 字段，更新值为 33
User.updataeMany({}, {age: 33}).then(res => {
    console.log(res)
})
```

## 验证规则

在新增数据时可以给字段一些条件：

```javascript
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        require: [true, '标题不能为空'],
        minlength: [5, '长度不能小于5'],
        maxlength: [20, '长度不能大于20'],
        trim: true
    },
    age: {
        type: Number,
        required: true,
        min: 18,
        max: 100
    },
    publishDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    category: {
      	type: String,
      	enum: ['html', 'css', 'javascript', 'node']
  	},
    author: {
        type: String,
        validate: {
            validator: (v) => {
            /* 
                    返回布尔值
                    true 验证成功
                    false 验证失败
                    形参 v 要验证的值
                */
                return v && v.length > 4;
            },
            //   自定义错误信息
            message: "传入的值不符合验证规则",
        }
	}
})
```

- type: 数据类型
- require: 是否可以为空
- minlength: 最小长度（字符串）
- maxlength: 最大长度（字符串）
- trim: 移除空格
- min: 最小值（数字）
- max: 最大值（数字）
- default: 默认值
- enum: 列举出当前字段可以选择值
- validate: 自定义规则，具体可看上面例子

```javascript
// 输出自定义错误信息
Post.create({
    title: "  我是标题11  ",
    age: 50,
    category: "java",
    author: "cc",
}).then((res) => {
    console.log(res);
}).catch((error) => {
    // 获取错误信息对象
    const err = error.errors;
    // 循环错误信息对象
    for (let attr in err) {
        // 将错误信息打印在控制台
        console.log(err[attr]["message"]);
    }
});

/*
`java` is not a valid enum value for path `category`.
传入的值不符合验证规则
数据库连接成功
*/
```

自定义 `enum` 的错误信息

```javascript
enum: {
    values: ["html", "css", "javascript", "node"],
    message: '分类名称要在上面数组中'
}
```

## 集合关联

- 使用id对集合进行关联
- 使用populate方法进行关联集合查询

```javascript
const mongoose = require('mongoose')
mongoose
  .connect("mongodb://localhost/text", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("链接成功");
  })
  .catch((err) => {
    console.log(err);
  });
//   用户集合规则
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})
// 文章集合规则
const postSchema = new mongoose.Schema({
    title: {
        type: String
    },
    author: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})
// 用户集合
const User = mongoose.model('User', userSchema)
// 文章集合
const Post = mongoose.model("Post", postSchema);
// 创建用户
User.create({name: 'cc'}).then(res => console.log(res))
// 创建文章
Post.create({
  title: "我是标题",
  author: "5f6dad49361ba253109b0d1a",
}).then((res) => console.log(res));
// 查询文章信息
Post.find()
  .then((res) => console.log(res));
// 查询文章信息，并且将user信息也查询出来
Post.find()
  .populate("author")
  .then((res) => console.log(res));
```













