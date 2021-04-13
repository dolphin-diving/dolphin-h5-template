# dolphin-h5-temple

## activity template (old)

## demo预览
> https://

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### px2rem
##### 直接写px，编译后会直接转化成rem
##### 在px后面添加/\*px\*/,会根据dpr的不同，生成三套代码。--- 一般字体需用这个
##### 在px后面添加/\*no\*/，不会转化px，会原样输出。 --- 一般border需用这个,可解决Android边框消失问题
##### 若在scss中添加/\*no\*/不生效的话，将单位px改为大写PX
```css
.selector {
    width: 150px;
    font-size: 28px; /*px*/
    border: 1PX solid #ddd; /*no*/
}
```

### 目录结构描述
```
├─dist -------------------------- 构建后文件的输出目录
├─public ------------------------ 静态资源目录，打包的时候会把当前目录复制到项目根目录
├─src --------------------------- 这个是我们最应该关注的目录
│ ├─assets ---------------------- 静态资源文件
│ │ ├─css ----------------------- 全局样式表
│ │ └─img ----------------------- 图片
│ ├─components ------------------ 公共组件
│ │ ├─addressPicker ------------- 全国城市级联弹窗
│ │ ├─dialog -------------------- 模态框
│ │ ├─iosHint ------------------- 美居内苹果公司免责声明
│ │ ├─launchApp ----------------- 调起/下载美居APP
│ │ ├─loading ------------------- 等待加载动画
│ │ ├─overlay ------------------- 弹窗遮罩层
│ │ ├─poster -------------------- 海报弹窗
│ │ ├─rule ---------------------- 活动规则弹窗
│ │ └─toast --------------------- 信息提示框
│ ├─http
│ │ ├─api.js -------------------- 请求接口相关方法
│ │ ├─errorMsg ------------------ 接口报错提示文案
│ │ └─request.js ---------------- 请求接口service
│ ├─utils
│ │ ├─preventReClick.js --------- 防止按钮多次点击，重复请求
│ │ ├─mjUtil.js ----------------- 美居右上角菜单公共方法
│ │ ├─wxUtil.js ----------------- 微信分享公共方法
│ │ └─util.js ------------------- 常用工具类
│ ├─views ----------------------- 业务逻辑相关代码
│ │ ├─apiDemos ------------------ 请求接口示例代码
│ │ ├─componentsDemos ----------- 调用组件示例代码(文档详见每个组件目录下的README.md)
│ │ └─Home.vue ------------------ 业务逻辑代码
│ ├─base.js --------------------- 提供公共的属性和方法
│ └─config.js ------------------- 全局配置文件
├─.env.build -------------------- 生产环境变量
├─.env.dev ---------------------- 开发环境变量
├─.gitignore -------------------- 不想提交到Git上的文件
├─.babel.congig.js -------------- babel配置文件
├─.package.json ----------------- 项目的基本、包依赖等信息
├─.postcsssrc.js ---------------- postcss配置pxtorem
└─README.md --------------------- 项目阅读指南
```
