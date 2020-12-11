# wlui

<p align="center">
  <img src="http://wlbase.oss-cn-beijing.aliyuncs.com/wlui-logo.jpg" width="160">
</p>

<p align="center">
  <b>精美易用的前端复杂组件及市场上未出现的需求组件收录</b>
</p>

## [文档地址](http://docs.wlui.com.cn/)

## Install
```shell
npm install weilan-ui -S  

# or

yarn add weilan-ui
```

## Quick Start

> 全部引入
``` js
import Vue from 'vue'
import WeilanUi from 'weilan-ui'
import 'weilan-ui/lib/weilan-ui.css';

Vue.use(WeilanUi)
```

> 按需引入
```js
import {
  Gantt, // 甘特图
  Explorer, // 文件管理器
  BimViewer, // bim三维模型预览
  TransferTree, // 树形穿梭框
  FormDesigner, // 表单设计器
  FormParser, // 表单解释器
  Container, 
  ContextMenu, 
  FadeIn, 
  Scroll, 
  Address, 
  Add, 
  Input, 
  Select, 
  SelectTree, // 树形下拉框
  Tree, 
  Table, 
  TableDynamic, 
} from 'weilan-ui'
import 'weilan-ui/lib/weilan-ui.css';

Vue.use(Gantt)
Vue.use(Explorer)
...
```

## Donation
如果你有心，可以请作者喝杯咖啡
<p>
  <img width="200" src="http://wlbase.oss-cn-beijing.aliyuncs.com/apply.jpg">
  <img width="200" src="http://wlbase.oss-cn-beijing.aliyuncs.com/wx.jpg">
</p>

## 社区

| Issue                                               | QQ群                                                                       |
|-----------------------------------------------------|----------------------------------------------------------------------------|
| [wlui/issues](https://github.com/wl-ui/wlui/issues) | <img src="http://wlbase.oss-cn-beijing.aliyuncs.com/qq.jpg" width="200" /> |
