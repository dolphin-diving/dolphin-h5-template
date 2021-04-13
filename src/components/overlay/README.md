## Overlay 通用遮罩层
Overlay 支持组件调用

### 使用指南

#### step1 引入组件
```js
import Overlay from '@/components/overlay'
```
#### step2 注册组件
```js
components:{
    Overlay
}
```
#### step3 使用组件
```html
<Overlay></Overlay>
```

### attributes

通过组件调用 `Overlay` 时，支持传入以下参数：

| 参数名 | 说明 | 类型 | 默认值 |
|------|------|------|------|
| visible | 是否展示遮罩层 | `Boolean` | false |
| zIndex | 遮罩层的堆叠顺序 | `Number` | - |

