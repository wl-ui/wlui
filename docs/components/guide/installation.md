# 安装

## yarn or npm 安装

推荐使用 yarn or npm 的方式安装，它能更好地和 webpack 打包工具配合使用。

```shell
$ yarn add weilan-ui  # or npm i weilan-ui -S
```

## script 标签引入 cdn

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
    <wl-fade-in :show="visible">dasdasd
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