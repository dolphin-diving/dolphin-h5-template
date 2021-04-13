## LaunchApp 调起/下载美居App
LaunchApp 支持组件调用

### 使用指南

#### step1 引入组件
```js
import LaunchApp from '@/components/launchApp'
```
#### step2 注册组件
```js
components:{
    LaunchApp
}
```
#### step3 使用组件（页面底部展示[打开美的美居App]按钮）
```html
<launch-app></launch-app>
```

### attributes

通过组件调用`LaunchApp`时，支持传入以下参数

| 参数名 | 说明 | 类型 | 默认值 |
|------|------|------|------|
| pgfromParam | 下载引导页面的url参数 | `String` | - |
| targetUrl | 需跳转至美居内指定页面的url | `String` | - |
| iosDownload | ios打不开美居时，跳转页面的url。等于0跳转Apple Store；等于1跳转美居下载页 | `String` | - |
| androidDownload | android打不开美居时，跳转页面的url。等于0跳转应用市场；等于1下载安装包 | `String` | - |
