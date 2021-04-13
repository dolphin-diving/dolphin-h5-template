## Dialog 模态框
Dialog 组件支持函数调用

### 使用指南

#### step1 在main.js引入
```js
import Dialog from '@/components/dialog';
```

#### step2 全局注入Dialog组件
```js
Vue.use(Dialog);
```

#### step3 在vue文件中调用

用于提示一些消息，只包含一个确认按钮

```js
this.$dialog.showDialogBox({
  title: '标题',
  message: '弹窗内容',
  isShowCancelBtn: false
}).then(() => {
  // on confirm
});
```

用于确认消息，包含取消和确认按钮

```js
this.$dialog.showDialogBox({
  title: '标题',
  message: '弹窗内容'
}).then(() => {
  // on confirm
}).catch(() => {
  // on cancel
});
```

### function

| 方法名 | 参数 | 返回值 | 介绍 |
|------|------|------|------|
| showDialogBox | `options` | `Promise` | 展示弹窗 |
| cancel | - | `null` | 隐藏弹窗 |

### options

通过函数调用 `showDialogBox` 时，支持传入以下选项：

| 参数名 | 说明 | 类型 | 默认值 |
|------|------|------|------|
| title | 标题 | `String` | 提示 |
| message | 内容 | `String` | - |
| messageAlign | 内容对齐方式，可选值为`left` `right` `center` | `String` | center |
| className | 自定义类名 | `String` | - |
| isShowTitle | 是否展示标题 | `Boolean` | true |
| isShowCancelBtn | 是否展示取消按钮 | `Boolean` | true |
| confirmText | 确认按钮的文案 | `String` | 确定 |
| cancelText | 取消按钮的文案 | `String` | 取消 |
| overlay | 是否展示蒙层 | `Boolean` | true |
| closeOnClickOverlay | 点击蒙层时是否关闭弹窗 | `Boolean` | false |

### event

通过组件调用 `Dialog` 时，支持以下事件：

| 事件 | 说明 | 回调参数 |
|------|------|------|
| confirm | 点击确认按钮时触发 | - |
| cancel | 点击取消按钮时触发 | - |
