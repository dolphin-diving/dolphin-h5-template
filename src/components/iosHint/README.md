## IosHint 美居内ios声明
IosHint 支持组件调用

### 使用指南

#### step1 引入组件
```js
import IosHint from '@/components/iosHint'
```
#### step2 注册组件
```js
components:{
    IosHint
}
```
#### step3 使用组件（页面底部展示苹果免责文案）
```html
<ios-hint></ios-hint>
```

### attributes

通过组件调用 `IosHint` 时，支持传入以下参数：

| 参数名 | 说明 | 类型 | 默认值 |
|------|------|------|------|
| className | 文案类名 | `String` | - |
| hintText | 自定义文案内容 | `String` | `*奖品与活动和设备生产商Apple Inc.公司无关*` |

