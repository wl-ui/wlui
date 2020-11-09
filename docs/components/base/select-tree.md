# 树形下拉框

提供了树形数据支持和默认选中功能

## 基础用法

基础的树形数据选则

::: demo
```html
<template>
    <wl-select-tree
      v-model="value"
      size="small"
      width="240"
      filterable
      :data="treeData"
      @change="hindleChanged"
    ></wl-select-tree>
</template>

<script>
export default {
  data(){
    return {
      value: [{ id: 5, name: "蓬莱" }],
      treeData: [
        {
          id: 0,
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

## 基础多选

适用性较广的基础多选，用 Tag 展示已选项

::: demo
```html
<template>
    <wl-select-tree
      style="margin-right: 20px;"
      v-model="value"
      size="small"
      width="240"
      checkbox
      filterable
      :data="treeData"
      @change="hindleChanged"
    ></wl-select-tree>

    <wl-select-tree
      v-model="value"
      size="small"
      width="240"
      checkbox
      filterable
      collapseTags
      :data="treeData"
      @change="hindleChanged"
    ></wl-select-tree>
</template>

<script>
export default {
  data(){
    return {
      value: [{ id: 5, name: "蓬莱" }, { id: 4, name: "古城" }],
      treeData: [
        {
          id: 0,
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

## 触发方式

提供常用的click和hover方式，另外提供focus激活和手动激活

::: demo
```html
<template>
    <!-- 触发方式 -->
  <div style="margin-bottom: 20px">
    <el-radio-group v-model="trigger">
      <el-radio label="click">click激活</el-radio>
      <el-radio label="hover">hover激活</el-radio>
      <el-radio label="focus">focus激活</el-radio>
      <el-radio label="manual">手动激活</el-radio>
    </el-radio-group>
  </div>
  <!-- demo -->
  <wl-select-tree
    v-model="value"
    size="small"
    width="240"
    checkbox
    filterable
    :data="treeData"
    :trigger="trigger"
    @change="hindleChanged"
  ></wl-select-tree>
    
</template>

<script>
export default {
  data(){
    return {
      trigger: 'click',
      value: [{ id: 5, name: "蓬莱" }, { id: 4, name: "古城" }],
      treeData: [
        {
          id: 0,
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

<common-api type="attr" :data="[
  {name:'value/v-model', des:'绑定值', type: '[String, Number, Array, Object]', optionValues:'-', defaultValue:'-'},
  {name:'data', des:'options 可选列表数', type: 'Array', optionValues:'-', defaultValue:'-'},
  {name:'props', des:' 配置项：配置名字label字段、子集children字段、禁用disabled字段等', type: 'Object', optionValues:'-', defaultValue:`{label: 'name', children: 'children'}`},
  {name:'nodeKey', des:' 树形数据的key，必要', type: 'String', optionValues:'-', defaultValue: 'id'},
  {name:'checkbox', des:' 是否多选', type: 'Boolean', optionValues:'-', defaultValue: 'false'},
  {name:'disabled', des:' 是否禁用', type: 'Boolean', optionValues:'-', defaultValue: 'false'},
  {name:'collapseTags', des:' 是否以显示+1的方式展示已选项', type: 'Boolean', optionValues:'-', defaultValue: 'false'},
  {name:'leaf', des:' 是否只可选叶子节点', type: 'Boolean', optionValues:'-', defaultValue: 'false'},
  {name:'width', des:' 宽度，暂时可选项列表宽度靠手动定义或内部撑起', type: 'String', optionValues:'-', defaultValue: '-'},
  {name:'trigger', des:' 触发可选项显示的方式', type: 'String', optionValues:'click/focus/hover/manual', defaultValue: 'click'},
  {name:'nowrap', des:' 是否禁止换行', type: 'Boolean', optionValues:'-', defaultValue: 'false'},
  {name:'placeholder', des:' 提示语', type: 'String', optionValues:'-', defaultValue: '请选择'},
  {name:'size', des:' size', type: 'String', optionValues:'default/medium/small/mini', defaultValue: 'medium'},
  {name:'defaultExpandAll', des:' 是否展开全部可选项', type: 'Boolean', optionValues:'-', defaultValue: 'true'},
  {name:'defaultExpandedKeys', des:' 默认展开的节点的 key 的数组', type: 'Array', optionValues:'-', defaultValue: '-'},
  {name:'filterable', des:' 是否使用搜索', type: 'Boolean', optionValues:'-', defaultValue: 'false'},
  {name:'filterFnc', des:' 自定义筛选函数', type: 'Function', optionValues:'-', defaultValue: '-'},
  {name:'noCheckedClose', des:'点击tag标签清空已选时，可选项列表将同时关闭', type: 'Boolean', optionValues:'-', defaultValue:'false'},
  {name:'checkStrictly', des:'树形时，是否父子不关联', type: 'Boolean', optionValues:'-', defaultValue:'false'},
  {name:'expandOnClickNode', des:'树形时，是否点击节点能展开收缩', type: 'Boolean', optionValues:'-', defaultValue:'false'},
  {name:'-', des:'其他el-select属性', type: '-', optionValues:'-', defaultValue:'-'}
]"></common-api>

<common-api type="events" :data="[
  {name:'change', des:'数据值改变', params: '目前的选中值'}
]"></common-api>

<common-api type="events" title="方法" :data="[
  {name:'closeOptions', des:'关闭选项列表', params: '-'}
]"></common-api>