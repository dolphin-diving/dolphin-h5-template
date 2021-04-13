## Rule 活动规则弹窗
Rule 支持组件调用

### 使用指南

#### step1 引入组件
```js
import Rule from '@/components/rule'
```
#### step2 注册组件
```js
components:{
    Rule
}
```
#### step3 使用组件

页面右上角展示[活动规则]按钮

```html
<Rule ref="rule"></Rule>
```

指定页面元素rule，直接打开活动规则弹窗

```js
this.$refs.rule.showRule();
```

### function

| 方法名 | 说明 | 类型 | 默认值 |
|------|------|------|------|
| showRule | 展示活动规则弹窗 | `Function` | - |
| cancel | 关闭活动规则弹窗 | `Function` | - |
