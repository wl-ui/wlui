# 快速上手

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

> 完整的组件列表
```js
import {
  Gantt, 
  Explorer, 
  BimViewer, 
  TransferTree, 
  FormDesigner
  FormParser
  Container, 
  ContextMenu, 
  FadeIn, 
  Scroll, 
  Address, 
  Add, 
  Input, 
  Select, 
  SelectTree, 
  Tree, 
  Table, 
  TableDynamic, 
} from 'weilan-ui';
```

## 开始使用

至此，一个基于 Vue 和 WeilanUi 的开发环境已经搭建完毕，现在就可以编写代码了。各个组件的使用方法请参阅它们各自的文档。
