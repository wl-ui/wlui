## WlFormDesigner 表单设计器

可视化配置表单并生成 Json数据 和 Vue Template 结构，可以轻松配合市面上主流ui库使用；
配合`WlFormParser`表单解释器效果更佳。

## demo

> 表单设计器
![表单设计器](http://wlui.oss-cn-beijing.aliyuncs.com/demo-xuanchuan/wl-form-designer-electron.png)
> 表单解释器
![表单解释器](http://wlui.oss-cn-beijing.aliyuncs.com/demo-xuanchuan/wl-form-parser.png)

## 示例
``` js

<template>
  <div>
    <wl-form-designer class="wl-form-designer">
      <span slot="title-left">请假</span>
    </wl-form-designer>
  </div>
</template>

<script>
import { FormDesigner } from "weilan-ui";
import "weilan-ui.css"

export default {
  name: "PageForm",
  components: { FormDesigner },
  data() {
    return {};
  },
};
</script>

```

### 方法

> getFormJson() 返回json数据
> setFormJson(data:Array) 此方法将json覆盖时机完全自由的交给用户调度，例如需要编辑回显json数据时

### 事件

> preview 预览事件
> publish 发布事件