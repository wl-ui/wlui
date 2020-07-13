<template>
  <div class="api-wrap">
    <h3 class="api-wrap-title">{{selfColumns.title}}</h3>
    <el-table :data="data" style="width: 100%">
      <el-table-column label="序号" align="center" type="index" width="50"></el-table-column>
      <el-table-column
        v-for="item of selfColumns.columns"
        :prop="item.prop"
        :key="item.prop"
        :label="item.label"
        :width="item.width"
        :min-width="item.minWidth"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "CommonApi",
  props: {
    type: {
      type: String,
      default: "attr" // attr, events, slot
    }, // api类型
    title: String, // 标题
    columns: Array, // 表头
    data: {
      type: Array,
      default: function() {
        return [];
      }
    } // 表格数据
  },
  computed: {
    selfColumns() {
      let columns_ = [];
      let title_ = "";
      switch (this.type) {
        case "attr":
          title_ = "属性";
          columns_ = [
            { label: "参数", prop: "name" },
            { label: "说明", prop: "des", minWidth: 150 },
            { label: "类型", prop: "type", width: 80 },
            { label: "可选值", prop: "optionValues", width: 100 },
            { label: "默认值", prop: "defaultValue", width: 100 }
          ];
          break;
        case "events":
          title_ = "事件";
          columns_ = [
            { label: "事件名", prop: "name" },
            { label: "说明", prop: "des", minWidth: 100 },
            { label: "参数", prop: "params", minWidth: 100 }
          ];
          break;
        case "slot":
          title_ = "Slot";
          columns_ = [
            { label: "name", prop: "name" },
            { label: "说明", prop: "des" }
          ];
          break;
      }
      return {
        title: this.title || title_,
        columns: this.columns || columns_
      };
    }
  }
};
</script>

<style lang="scss">
.api-wrap {
  + .api-wrap {
    margin: 40px 0;
  }
  &:first-child {
    margin-top: 80px;
  }
  &:last-child {
    margin-bottom: 80px;
  }

  .api-wrap-title {
    margin-top: 35px;
    line-height: 40px;
  }
}

th,
td {
  border: none;
}
</style>
