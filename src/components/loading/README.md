## Loading 加载动画
Loading 组件支持函数调用

### 使用指南

#### step1 在main.js引入
```js
import Loading from '@/components/loading';
```

#### step2 全局注入Loading组件
```js
Vue.use(Loading);
```

#### step3 在vue文件中调用
显示loading动画   
展示“加载中...”

```js
this.$loading.show();
```

展示“验证中”,且页面背景为半透明蒙层

```js
this.$loading.show("验证中",true);
```

关闭loading动画

```js
this.$loading.hide();
```

### function

| 方法名 | 参数 | 返回值 | 介绍 |
|------|------|------|------|
| show | `String` | - | 展示等待动画 |
| hide | - | - | 关闭等待动画 |

### Options

通过函数调用 `show` 时，支持传入以下选项：

| 参数名 | 说明 | 类型 | 默认值 |
|------|------|------|------|
| message | 内容 | `String` | 加载中... |
| showLayer | 显示蒙层 | `Boolean` | false |
