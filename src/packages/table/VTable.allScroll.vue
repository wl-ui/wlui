<template>
  <div class="wl-vtable" @scroll="scrollEvent">
    <el-table ref="wl-table" class="wl-table" :data="visualTable" :height="tableHeight">
      <el-table-column
        v-for="item of columns"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { throttle } from "wl-core";

export default {
  name: "WlVtable",
  props: {
    columns: Array, // 表头
    data: {
      type: Array,
      default: () => [],
    }, // 表格数据
    itemSize: {
      type: Number,
      default: 48,
    }, // 每一行高度
    throttleTime: {
      type: Number,
      default: 60,
    }, // 防抖秒数
  },
  data() {
    return {
      start: 0, // 开始索引
      end: null, // 结束索引
      screenHeight: 0, // 可视区高度
      offset: 0, // 偏移量
      tableBodyDom: null, // 表格body
      index: 0,
    };
  },
  computed: {
    // 列表总高度
    tableHeight() {
      return this.data.length * this.itemSize;
    },
    // 可视项数量
    visualItemNumber() {
      return Math.ceil(this.screenHeight / this.itemSize);
    },
    // 可视项
    visualTable() {
      return this.data.slice(this.start, Math.min(this.end, this.data.length));
    },
    // 偏移量
    getTransform() {
      return `translate3d(0,${this.offset}px,0)`;
    },
  },
  mounted() {
    this.screenHeight = this.$el.clientHeight;
    this.start = 0;
    this.end = this.start + this.visualItemNumber;
    this.tableBodyDom = this.$refs["wl-table"].$el.getElementsByClassName(
      "el-table__body"
    )[0];
  },
  methods: {
    scrollEvent: throttle(function (e) {
      let scrollTop = e.target.scrollTop;
      //此时的开始索引
      this.start = Math.floor(scrollTop / this.itemSize);
      //此时的结束索引
      this.end = this.start + this.visualItemNumber;
      //此时的偏移量
      this.offset = scrollTop - (scrollTop % this.itemSize);
      // 偏移dom
      this.tableBodyDom.style.transform = this.getTransform;
    }, 60),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.wl-vtable {
  height: 100%;
  overflow: auto;
}
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  background-color: #f3f3f3;
}

::-webkit-scrollbar-thumb {
  background-image: linear-gradient(to right, #f5542b80, #f5101080, #e9394280);
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
}
</style>
