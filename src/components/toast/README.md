## Toast 弹窗
Toast 组件支持函数调用

### 使用指南

```js
import Toast from '@/components/toast';

Vue.use(Toast);
```

### 代码演示

#### 全局方法

引入 Toast 组件后，会自动在 Vue 的 prototype 上挂载 $toast 方法，在所有组件内部都可以直接调用此方法

#### 显示toast弹窗

用于展示toast弹窗，并在3000ms后关闭

```javascript
this.$toast("提示文案",3000);
```

### Options

通过函数调用 `Toast` 时，支持传入以下选项：

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|------|
| message | 提示内容 | `String` | - |
| duration | 弹窗持续显示时间 | `Numer` | 2500 |
