## AddressPicker 全国城市级联弹窗
AddressPicker 支持组件调用

### 使用指南

#### step1 引入组件
```js
import AddressPicker from '@/components/addressPicker'
```
#### step2 注册组件
```js
components:{
    AddressPicker
}
```
#### step3 使用组件
```html
<address-picker 
:isShowPicker="" 
@oncancel="" 
@onchanged="">
</address-picker>
```

### attributes

通过组件调用 `AddressPicker` 时，支持传入以下参数：

| 参数名 | 说明 | 类型 | 默认值 |
|------|------|------|------|
| isShowPicker | 是否展示弹窗 | `Boolean` | `false` |

### event

通过组件调用 `AddressPicker` 时，支持以下事件：

| 方法名 | 参数 | 返回值 | 介绍 |
|------|------|------|------|
| onchanged | - | `Function` | - |
| oncancel | - | `Function` | - |
