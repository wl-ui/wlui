# 树形下拉框

提供了树形数据支持和默认选中功能

## 基础用法

::: demo
```html
<template>
    <wl-select-tree
      v-model="value"
      node-key="id"
      size="small"
      width="240"
      collapse-tags
      filterable
      :data="treeData"
      @change="hindleChanged"
    ></wl-select-tree>
</template>

<script>
export default {
  data(){
    return {
      value: ["1"],
      treeData: [
        {
          id: "0",
          name: "所有和你走过的风光",
          children: [
            {
              id: 1,
              name: "海边",
              children: [
                {
                  id: 5,
                  name: "蓬莱"
                },
                {
                  id: 6,
                  name: "威海"
                }
              ]
            },
            {
              id: 2,
              name: "森林",
              children: []
            },
            {
              id: 3,
              name: "草原"
            },
            {
              id: 4,
              name: "古城"
            }
          ]
        }
      ],
      props: {
        label: "name",
        value: "id"
      }, // 配置
    }
  },
  methods: {
    hindleChanged(val) {
      console.log(val, this.selected);
    }
  }
}
</script>
```
:::