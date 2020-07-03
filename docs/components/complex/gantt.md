# 甘特图

甘特图：通过条状图来显示项目，进度，和其他时间相关的系统进展的内在关系随着时间进展的情况，又称横道图、条状图，主要用于项目管理及进度计划管理。

## 基础甘特图

::: demo 基础用法
```html
<template>
  <div class="red-center-text">
      <p>{{ message }}</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      message: 'Hello Vue'
    }
  }
}
</script>
<style>
.red-center-text { 
  color: #ff7875;
  text-align: center;
}
</style>
```
:::

## TODO

 [x] yearAndMonth、monthAndDay、yearAndWeek时间跨度配置
 [x] 前置任务
 [x] 树表联动
 [x] 自定义右键菜单
 [ ] 任务连接线
 [ ] 所有列可配置
 [ ] 表格区和图形区分离
 [ ] 单个任务支持分段显示
 [ ] 图形区canvas重构
