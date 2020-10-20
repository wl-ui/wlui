## WlFormParser 表单解释器

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
    <form-parser
      class="form-parser"
      ui="vant"
      :json="code"
    ></form-parser>
  </div>
</template>

<script>
import { FormParser } from "weilan-ui";
import "weilan-ui.css"

export default {
  name: "PageForm",
  components: { FormParser },
  data() {
    return {
      code:[]
    };
  },
};
</script>

```
