# 下拉框

下拉框只是在el-select基础上扩展`全选`属性

## 基础用法

适用多选下拉框要求全部选中时显示一个全部而不是把每条都列出来

::: demo
```html
<template>
    <!---->
    <wl-select
      v-model="value"
      :props="props"
      :data="data"
      multiple
      filterable
      collapse-tags
      default-select
    ></wl-select>
</template>

<script>
export default {
  data(){
    return {
      value: [1,2,3,4],
      data: [
        {
          id: 1,
          name: "海边"
        },
        {
          id: 2,
          name: "森林"
        },
        {
          id: 3,
          name: "草原"
        },
        {
          id: 4,
          name: "古城"
        }
      ], 
      props: {
        label: "name",
        value: "id"
      }, // 配置
    }
  }
}
</script>
```
:::

## 自动关闭选项

当点击tag标签清空已选时，可选项列表将同时关闭

::: demo
```html
<template>
    <!---->
    <wl-select
      v-model="value"
      :props="props"
      :data="data"
      multiple
      filterable
      collapse-tags
      default-select
      no-checked-close
    ></wl-select>
</template>

<script>
export default {
  data(){
    return {
      value: "",
      data: [
        {
          id: 1,
          name: "海边"
        },
        {
          id: 2,
          name: "森林"
        },
        {
          id: 3,
          name: "草原"
        },
        {
          id: 4,
          name: "古城"
        }
      ], 
      props: {
        label: "name",
        value: "id"
      }, // 配置
    }
  }
}
</script>
```
:::

<common-api type="attr" :data="[
  {name:'value/v-model', des:'绑定值', type: '[String, Array, Object]', optionValues:'-', defaultValue:'-'},
  {name:'data', des:'options 可选列表数', type: 'Array', optionValues:'-', defaultValue:'-'},
  {name:'props', des:' 配置项：显示名字的 label 字段和绑定值的 value 字段', type: 'Object', optionValues:'-', defaultValue:`{label: 'label', value: 'value'}`},
  {name:'showTotal', des:' 当可选项大于多少个时显示`全选`选', type: 'Number', optionValues:'-', defaultValue: 1},
  {name:'valueKey', des:' 当绑定值为对象时需要valueKey', type: 'String', optionValues:'-', defaultValue: '-'},
  {name:'multiple', des:' 是否多选', type: 'Boolean', optionValues:'-', defaultValue: 'false'},
  {name:'multipleLimit', des:' 可选数量，为 0 则不限制', type: 'Number', optionValues:'-', defaultValue: '0'},
  {name:'disabled', des:' 是否禁用', type: 'Boolean', optionValues:'-', defaultValue: 'false'},
  {name:'no-checked-close', des:'点击tag标签清空已选时，可选项列表将同时关闭', type: 'Boolean', optionValues:'-', defaultValue:'false'},
  {name:'-', des:'其他el-select属性', type: '-', optionValues:'-', defaultValue:'-'}
]"></common-api>

<common-api type="events" :data="[
  {name:'change', des:'数据值改变', params: '目前的选中值'}
]"></common-api> 