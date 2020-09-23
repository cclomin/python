# web前端-曹超工作交接文档

## 小游戏落地页

> git地址：http://git.zhts.cc/wxgame/tg.xiaogame.7477.com.git

1. 根目录下的落地页文件为 `tg.11558game.com` 域名下的落地页
2. `/cq/` 此目录下的落地页文件为 `xyx-tg.chuanqu.com` 域名下的落地页
3. `/xs/` 此目录下的落地页文件为 `xyx-tg.xiaoshouhudong.com` 域名下的落地页

`tg.11558game.com` 的落地页已经很久没做过新的（貌似今年没做过了）

`/cq/` `/xs/` 目录下都有一个 `common` 文件夹，里面放的是落地页用到的公共文件

小游戏落地页可以搞一个现在新版落地页同样的系统，不过小游戏的落地页不多，有时候几个月才有一个落地页的需求

小游戏落地页与之前手游落地页的配置一样

落地页文件通过 FTP 上传（找星哥要 FTP 帐号）

## H5游戏

- ### m.7477.com

> git地址：http://git.zhts.cc/7477game_auto/m.7477.com.git

**此项目下前端修改的主要是 `SDK` 中的内容（即游戏界面相关的）** 

**项目的本地环境配置请寻求后端同事的帮助** 

1. #### 添加、修改现金任务（弹窗）：

   此类需求已开发后台相关功能，后期由运营人员在后天自行配置即可（暂未完成，完成时间预计下周）；

   若遇到比较奇葩的需求则需要前端在进行代码修改

   尽量在 `www/misc/h5/sdk_update/game/GameHelper.js` 此文件中修改

   此需求有另一个说明文档

2. #### 修改游戏标题名（页面 `title` ）：

   ![img](https://s1.ax1x.com/2020/09/18/wh0Zb8.png)

   此需求要改的地方有两个

   - 一个是在 `www/misc/h5/sdk_update/js/third_channel.js` 

     文件中有一个 `setTitle` 方法，具体可看代码或注释

   - 还需要修改 `www/Tpl/H5/pc_index.html` 大概在 533 行代码处，根据参数判断来修改页面 `title` 的值

3. #### 隐藏某个游戏/某个渠道下的登录方式（一个或多个）

   ![img](https://s1.ax1x.com/2020/09/18/wh01vq.png)

   此需求修改 `www/misc/h5/sdk_update/js/third_channel.js` 

   文件中有 `hideLoginType` `hideLoginTypeAppid` 两个方法，一个是根据渠道参数隐藏、一个是根据APPID隐藏

   

**官网用的是vue2.0（vue-cli 2.x）版本开发的，详细在下方 `h5.7477.com` 说明** 

- ### h5.7477.com

> git地址：http://git.zhts.cc/7477game_auto/h5.7477.com.git

此项目是与 `m.7477.com` 运行在同一个域名下的

`\application\index\view\wallet` 目录中是H5游戏钱包页面的前端html文件

`\public\assets` 目录中是H5游戏钱包页面的资源文件

`\puclic\static` 目录中文 `vue` 项目打包后的官网资源文件

- ### H5官网

> git地址：https://gitee.com/dfmily27/h5_site.git

现一般不对官网做修改（较长时间未提过修改官网的需求）

此项目原本是由另一个同事（已离职）主导开发，我协助，其离职后，项目后续有过一些修改，由我完成

未采用组件式开发，几乎一个页面一个 `.vue` 文件，代码最多的一个 `.vue` 文件 1000 多行

```bash
┌─assets									开发时的资源文件
│	└─js/getUserInfo.js						 获取用户信息，退出登录，PC版与iframe通信在这个文件中
│─common									定义了几个 less 变量，没咋用上
│─components
│	└─article								资讯页
│	└─index									首页
│	└─person								个人中心页
│	└─public								一些公共组件（登录，底部导航等等...）
│	└─welfare								福利页
│─router
│─vuex
│─App.vue
└─main.js
```

项目代码比较烂，所以我在重构此项目（未完成）

重构采用的是 `uni-app` 开发，git地址：[https://gitee.com/dfmily27/shopMall.git](https://gitee.com/dfmily27/shopMall.git) 

## 智优落地页

> git地址：https://gitee.com/dfmily27/zhiyou_ldy.git

git仓库文件较大（很多图片）

落地页比较简单，仅做展示，不涉及统计、下载等功能。

git仓库中文件夹以对应域名方式命名，具体落地页以类型前缀命名

```bash
bj 前缀			页面中价格需要点击修改的
cm 前缀			页面中有单选框的
dz 前缀			扒其他公司的页面并且页面中有地址选择的
gp 前缀			股票投资类的
gzh 前缀			公众号类的（需要复制公众号）
ig 前缀			纯图片类
tj 前缀			简单的表单（仅姓名电话号）
xs 前缀			小说类
xz 前缀			下载APP（或跳转苹果商店）
```

代码通过 FTP 上传（找星哥要 FTP 帐号）

## 其他项目

1. 客服、手游、页游等其他项目此前已陆续交由友达负责完成相关工作。

## PS

文档可能会有一些较早、较长时间未做修改的项目遗漏































