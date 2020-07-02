# wlui

<p align="center">
  <img src="http://wlbase.oss-cn-beijing.aliyuncs.com/wlui-logo.jpg" width="160">
</p>

<p align="center">
  <b>精美易用的前端复杂组件及市场上未出现的需求组件收录</b>
</p>

## [文档地址](http://docs.wlui.com.cn/)

## 引入WeilanUi

你可以引入整个 weilan-ui，也可以根据需要仅引入部分组件。

### 全部引入

在main.js写入一下内容:

```js

import Vue from 'vue';
import WeilanUi from 'weilan-ui';
import 'weilan-ui/weilan-ui.css';
import App from './App.vue';

Vue.use(WeilanUi);

new Vue({
  el: '#app',
  render: h => h(App)
});

```

### 按需引入

如果你只希望引入部分组件，比如 Gantt 和 Explorer，那么可以在 main.js 中写入以下内容：

```js
import Vue from 'vue';
import App from './App.vue';
import { WlGantt, WlExplorer } from 'weilan-ui';
import 'weilan-ui/weilan-ui.css';

Vue.use(WlGantt)
Vue.use(WlExplorer)

new Vue({
  el: '#app',
  render: h => h(App)
});
```

## cdn script标签引入

通过script标签方式使用weilan-ui需要同时引入element-ui

```html
<!-- 引入样式 -->
<link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
<link rel="stylesheet" href="https://unpkg.com/weilan-ui/weilan-ui.css">
<!-- 引入组件库 -->
<script src="https://unpkg.com/element-ui/lib/index.js"></script>
<script src="https://unpkg.com/weilan-ui/weilan-ui.umd.min.js"></script>
```

完整示例如下：
```html
<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <!-- import CSS -->
  <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
  <link rel="stylesheet" href="https://unpkg.com/weilan-ui/weilan-ui.css">
</head>

<body>
  <div id="app">
    <wl-add @click="visible = true"></wl-add>
    <wl-fade-in :show="visible">
      我出现啦
      <template #footer>
        <wl-add @click="visible = false">取 消</wl-add>
        <wl-add @click="visible = false">确 定</wl-add>
      </template>
    </wl-fade-in>
  </div>
</body>
<!-- import Vue before Element -->
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<!-- import JavaScript -->
<script src="https://unpkg.com/element-ui/lib/index.js"></script>
<script src="https://unpkg.com/weilan-ui/weilan-ui.umd.min.js"></script>
<script>
  new Vue({
    el: '#app',
    data: function () {
      return { visible: false }
    }
  })
</script>

</html>
```

## Donation
如果你有心，可以请作者喝杯咖啡
<p>
  <img width="200" src="http://wlbase.oss-cn-beijing.aliyuncs.com/apply.jpg">
  <img width="200" src="http://wlbase.oss-cn-beijing.aliyuncs.com/wx.jpg">
</p>

## 社区

| Issue | QQ群 |
|---|---|
| [wlui/issues](https://github.com/wl-ui/wlui/issues) | <img src="http://wlbase.oss-cn-beijing.aliyuncs.com/qq.jpg" width="200" /> |
