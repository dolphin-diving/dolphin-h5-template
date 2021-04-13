## Poster 海报弹窗
Poster 组件支持函数调用

### 使用指南

#### step1 在main.js引入
```js
import Poster from '@/components/poster';
```

#### step2 全局注入Poster组件
```js
Vue.use(Poster);
```

#### step3 在vue文件中调用

打开海报弹窗

```js
this.$poster.showPosterBox({
    inviteUrl:`${location.origin}${location.pathname}`
})
```

### function

| 方法名 | 参数 | 返回值 | 介绍 |
|------|------|------|------|
| showPosterBox | `options` | `Promise` | 展示海报弹窗 |
| cancel | - | `null` | 隐藏弹窗 |

### options

通过函数调用 `showPosterBox` 时，支持传入以下选项：

| 参数名 | 说明 | 类型 | 必选 | 默认值 |
|------|------|------|------|------|
| inviteUrl | 生成二维码的超链接 | `String` | 是 | - |
| appVersion | 美居当前版本号 | `String` | 否 | `0` |
