# 快速上手

## 引入wlui

你可以引入整个 wlui，也可以根据需要仅引入部分组件。

### 全部引入

在main.js写入一下内容:

```js

import Vue from 'vue';
import WeilanUi from 'weilan-ui';
import 'weilan-ui/lib/weilan-ui.css';
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
import 'weilan-ui/lib/weilan-ui.css';

Vue.use(WlGantt)
Vue.use(WlExplorer)

new Vue({
  el: '#app',
  render: h => h(App)
});
```