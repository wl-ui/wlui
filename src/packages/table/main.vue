<template>
  <div class="wl-table">
    <el-table
      v-if="screenHeight"
      class="wl-table-main"
      ref="wl-table"
      :fit="fit"
      :lazy="lazy"
      :load="load"
      :stripe="stripe"
      :row-key="rowKey"
      :data="visualTable"
      :sum-text="sumText"
      :row-style="rowStyle"
      :height="screenHeight"
      :tree-props="treeProps"
      :cell-style="cellStyle"
      :span-method="spanMethod"
      :show-summary="showSummary"
      :row-class-name="rowClassName"
      :summary-method="summaryMethod"
      :cell-class-name="cellClassName"
      :default-expand-all="defaultExpandAll"
      :header-row-class-name="headerRowClassName"
      :highlight-current-row="highlightCurrentRow"
      @selection-change="selectionChange"
      @row-dblclick="handleRowDblClick"
      @row-click="handleRowClick"
      @select="select"
    >
      <el-table-column
        v-for="item of columns"
        :key="item.prop"
        :prop="item.prop"
        :width="item.width"
        :label="item.label"
        :filters="item.filters"
        :sortable="item.sortable"
        :resizable="item.resizable"
        :class-name="item.className"
        :selectable="item.selectable"
        :sort-method="item.sortMethod"
        :render-header="item.renderHeader"
        :filtered-value="item.filteredValue"
        :filter-multiple="item.filterMultiple"
        :reserve-selection="item.reserveSelection"
        :show-overflow-tooltip="item.showOverflowTooltip"
        :filter-placement="item.filterPlacement"
        :label-class-name="item.labelClassName"
        :filter-method="item.filterMethod"
        :header-align="item.headerAlign"
        :sort-orders="item.sortOrders"
        :column-key="item.columnKey"
        :formatter="item.formatter"
        :min-width="item.minWidth"
        :sort-by="item.sortBy"
        :align="item.align"
        :fixed="item.fixed"
        :type="item.type"
      >
        <template slot-scope="scope">
          <template v-if="!item.slot">
            {{item.formatter
            ? item.formatter(scope.row, scope.column, scope.row[item.prop],scope.$index)
            : scope.row[item.prop]}}
          </template>
          <template v-else>
            <slot :name="item.prop" :row="scope.row" :index="scope.$index"></slot>
          </template>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { throttle } from "wl-core";

export default {
  name: "WlTable",
  props: {
    columns: Array, // 表头 --------------------------------vtable属性开始-----------------------------
    data: {
      type: Array,
      default: () => {
        return [];
      },
    }, // 表格数据
    itemSize: {
      type: Number,
      default: 48,
    }, // 每一行高度
    throttleTime: {
      type: Number,
      default: 60,
    }, // 节流毫秒数
    bufferScale: {
      type: Number,
      default: 0.5,
    }, // 缓冲区比例
    vTable: {
      type: Boolean,
      default: true,
    }, // 是否开启虚拟列表 -----------------------------------vtable属性结束----------------------------
    defaultExpandAll: {
      //是否展开
      type: Boolean,
      default: function () {
        return false;
      },
    }, // 是否展开全部 --------------------------------------el-table属性开始 --------------------------
    rowClassName: Function, // 行的 className 的回调方法
    cellClassName: Function, // 单元格的 className 的回调方法
    headerRowClassName: String, // 表头行class
    highlightCurrentRow: {
      type: Boolean,
      default: true,
    }, // 当前行是否高亮
    quickCheck: {
      type: Boolean,
      default: false,
    }, // 多选时，是否可以点击行快速选中复选框
    rowKey: {
      type: String,
      default: "id",
    }, // 行数据的 Key，用来优化 Table 的渲染
    showSummary: {
      type: Boolean,
      default: false,
    }, // 是否在表尾显示合计行
    sumText: {
      type: String,
      default: "合计",
    }, // 合计行第一列的文本
    summaryMethod: Function, // 自定义的合计计算方法
    spanMethod: Function, // 自定义的合计计算方法
    rowClick: Function, // 行单击事件
    rowdblClick: Function, // 行双击事件
    lazy: {
      type: Boolean,
      default: false,
    }, // 是否懒加载子节点数据
    load: Function, // 加载子节点数据的函数，lazy 为 true 时生效
    selectable: Function, // 自定义的某行是否可以勾选
    rowStyle: Function, // 自定义行样式
    cellStyle: Function, // 自定义单元格样式
    treeProps: Object, // 数表配置项
    defaultChecked: [Array, Object], // 多选时默认选中行
    fit: {
      type: Boolean,
      default: true,
    }, // 列的宽度是否自撑开
    stripe: {
      type: Boolean,
      default: false,
    }, // 是否为斑马纹
  },
  data() {
    return {
      start: 0, // 开始索引
      end: null, // 结束索引
      screenHeight: 0, // 可视区高度
      tableScreenHeight: 0, // 表格可视区高度
      offset: 0, // 偏移量
      tableBodyDom: null, // 表格body
      selectionList: [], // 选中行数据
    };
  },
  computed: {
    // 总数据长度
    tableAllLength() {
      return this.data.length;
    },
    // 列表总高度
    tableHeight() {
      return this.tableAllLength * this.itemSize;
    },
    // 可视项数量
    visualItemNumber() {
      return Math.ceil(this.tableScreenHeight / this.itemSize);
    },
    // 可视区上方缓冲数量
    aboveItemNumber() {
      return Math.min(this.start, this.bufferScale * this.visualItemNumber);
    },
    // 可视区下放缓冲数量
    belowItemNumber() {
      return Math.min(
        this.tableAllLength - this.end,
        this.bufferScale * this.visualItemNumber
      );
    },
    // 可视项
    visualTable() {
      let start = this.start - this.aboveItemNumber;
      let end = this.end + this.belowItemNumber;
      return this.data.slice(start, end);
    },
  },
  mounted() {
    if (!this.vTable) return;
    // 获取插件dom高度
    this.screenHeight = this.$el.clientHeight;
    // 设置虚拟列表起点索引
    this.start = 0;
    this.$nextTick(() => {
      // 获取表头高度
      const tableHader = this.$refs["wl-table"].$el.getElementsByClassName(
        "el-table__header-wrapper"
      )[0];
      const tableHaderHeight = tableHader.clientHeight;
      // 获取 tableBody 被分配的高度
      this.tableScreenHeight = this.screenHeight - tableHaderHeight;
      // 设置虚拟列表终点索引
      this.end = this.start + this.visualItemNumber;
      // 获取滚动区dom
      this.tableBodyDom = this.$refs["wl-table"].$el.getElementsByClassName(
        "el-table__body"
      )[0];
      // 设定滚动区padding撑起虚拟列表高
      this.tableBodyDom.style.paddingTop = 0;
      this.tableBodyDom.style.paddingBottom =
        this.tableHeight - this.visualItemNumber * this.itemSize + "px";
      // 注册滚动监听
      this.debounceFn = throttle((e) => {
        this.scrollEvent(e);
      }, this.throttleTime);
      this.$refs["wl-table"].bodyWrapper.addEventListener(
        "scroll",
        this.debounceFn
      );
    });
  },
  destroyed() {
    // 销毁滚动监听
    this.$refs["wl-table"].bodyWrapper.removeEventListener(
      "scroll",
      this.debounceFn,
      true
    );
  },
  methods: {
    // vtable滚动监听函数
    scrollEvent(e) {
      let scrollTop = e.target.scrollTop;
      //此时的开始索引
      this.start = Math.floor(scrollTop / this.itemSize);
      //此时的结束索引
      this.end = this.start + this.visualItemNumber;
      if (this.end >= this.tableAllLength) {
        this.tableBodyDom.style.paddingTop = scrollTop + "px";
        this.tableBodyDom.style.paddingBottom = "0";
        return;
      }
      this.tableBodyDom.style.paddingTop = scrollTop + "px";
      this.tableBodyDom.style.paddingBottom =
        this.tableHeight -
        this.visualItemNumber * this.itemSize -
        scrollTop +
        "px";
    },
    //单元格单击事件
    cellClick(row, column, cell, event) {
      if (column.type != "index" && column.type != "selection") {
        this.$emit("cellClick", row, column, cell, event);
      }
    },
    //当用户手动勾选数据行的 Checkbox 时触发的事件， 注意会多输出一个字段表示是选中还是取消选中
    select(selection, row) {
      let _is_add = selection.some((i) => i[this.rowKey] === row[this.rowKey]);
      this.selectionList = selection;
      this.$emit("select", selection, row, _is_add);
    },
    //当选择项发生变化时会触发该事件
    selectionChange(selections) {
      this.selectionList = selections;
      this.$emit("selection-change", selections);
    },
    // 行点击事件
    handleRowClick(row) {
      this.$emit("row-click", row);
      this.rowClick && this.rowClick();
    },
    // 行双击击事件
    handleRowDblClick(row) {
      this.$emit("row-click", row);
      this.rowdblClick && this.rowdblClick();
    },
    //用于多选表格，清空用户的选择 -------------------------------------el-table方法--------------------
    clearSelection() {
      this.$refs["wl-table"].clearSelection();
    },
    // 设置单行选中方法
    setCurrentRow(row) {
      this.$refs["wl-table"].setCurrentRow(row);
    },
    // 设置单行选中方法
    toggleRowSelection(row, selected) {
      this.$refs["wl-table"].toggleRowSelection(row, selected);
    },
    // 设置数表的行展开状态
    toggleRowExpansion(row, expanded = true) {
      this.$refs["wl-table"].toggleRowExpansion(row, expanded);
    },
    /**
     * 手动调用树表懒加载
     * row 要展开的行信息
     */
    loadTree(row) {
      this.$refs["wl-table"].store.loadOrToggle(row);
    },
    /**
     * 更新树表懒加载后的子节点
     * 要更新的节点id
     * 要添加的节点data
     */
    loadTreeAdd(id, data) {
      let _children =
        this.$refs["wl-table"].store.states.lazyTreeNodeMap[id] || [];
      _children.unshift(data);
      this.$set(
        this.$refs["wl-table"].store.states.lazyTreeNodeMap,
        id,
        _children
      );
    },
    /**
     * 更新树表懒加载后的子节点
     * 要更新的节点id
     * 要删掉的字节的rowKey
     */
    loadTreeRemove(id, key) {
      let _children = this.$refs["wl-table"].store.states.lazyTreeNodeMap[id];
      let _new_children = _children.filter((i) => i[this.rowKey] != key);
      this.$set(
        this.$refs["wl-table"].store.states.lazyTreeNodeMap,
        id,
        _new_children
      );
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.wl-table {
  height: 100%;
  > .wl-table-main {
    height: 100%;
  }
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background-color: #f3f3f3;
  }

  ::-webkit-scrollbar-thumb {
    background-image: linear-gradient(
      to right,
      #f5542b80,
      #f5101080,
      #e9394280
    );
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
  }
}
</style>
