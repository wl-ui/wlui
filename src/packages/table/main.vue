<template>
  <el-table
    id="table"
    fit
    stripe
    class="wl-table vtable"
    ref="wl-table"
    size="mini"
    :data="virtualRows"
    :height="height"
    :span-method="spanMethod"
    :sum-text="sumText"
    :show-summary="showSummary"
    :row-class-name="rowClassName"
    :summary-method="summaryMethod"
    :cell-class-name="cellClassName"
    :highlight-current-row="highlightCurrentRow"
    :header-row-class-name="selfHeaderRowClassName"
    :load="load"
    :lazy="lazy"
    :row-key="rowKey"
    :tree-props="treeProps"
    :default-expand-all="defaultExpandAll"
    @selection-change="selectionChange"
    @row-dblclick="rowdblClick"
    @row-click="handleRowClick"
    @select="select"
    @expand-change="calcBottom"
    :row-style="rowStyle"
    :cell-style="cellStyle"
  >
    <!-- 选择框CheckBox列 -->
    <el-table-column
      v-if="hasCheck"
      align="center"
      type="selection"
      width="50"
      :selectable="selectable"
    ></el-table-column>
    <!-- 序号index列 -->
    <el-table-column
      v-if="hasIndex"
      label="序号"
      align="center"
      type="index"
      width="50"
      :show-overflow-tooltip="true"
    ></el-table-column>
    <!-- 列配置 -->
    <template v-for="column in columns">
      <el-table-column
        v-if="column.slot"
        :key="column.prop"
        :type="column.type"
        :column-key="column.columnKey"
        :label="column.label"
        :prop="column.prop"
        :width="column.width"
        :min-width="column.minWidth"
        :fixed="column.fixed"
        :render-header="column.renderHeader"
        :sortable="column.sortable"
        :sort-method="column.sortMethod"
        :sort-by="column.sortBy"
        :sort-orders="column.sortOrders"
        :resizable="column.resizable"
        :formatter="column.formatter"
        :show-overflow-tooltip="column.showOverflowTooltip"
        :align="column.align"
        :header-align="column.headerAlign"
        :class-name="column.className"
        :label-class-name="column.labelClassName"
        :selectable="column.selectable"
        :reserve-selection="column.reserveSelection"
        :filters="column.filters"
        :filter-placement="column.filterPlacement"
        :filter-multiple="column.filterMultiple"
        :filter-method="column.filterMethod"
        :filtered-value="column.filteredValue"
      >
        <template slot-scope="scope">
          <slot :name="column.prop" :row="scope.row" :index="scope.$index"></slot>
        </template>
      </el-table-column>
      <el-table-column
        v-else
        :key="column.prop"
        :column-key="column.columnKey"
        :label="column.label"
        :prop="column.prop"
        :width="column.width"
        :min-width="column.minWidth"
        :fixed="column.fixed"
        :render-header="column.renderHeader"
        :sortable="column.sortable"
        :sort-method="column.sortMethod"
        :sort-by="column.sortBy"
        :sort-orders="column.sortOrders"
        :resizable="column.resizable"
        :formatter="column.formatter"
        :show-overflow-tooltip="column.showOverflowTooltip"
        :align="column.align || 'center'"
        :header-align="column.headerAlign"
        :class-name="column.className"
        :label-class-name="column.labelClassName"
        :selectable="column.selectable"
        :reserve-selection="column.reserveSelection"
        :filters="column.filters"
        :filter-placement="column.filterPlacement"
        :filter-multiple="column.filterMultiple"
        :filter-method="column.filterMethod"
        :filtered-value="column.filteredValue"
      ></el-table-column>
    </template>
  </el-table>
</template>

<script>
import { debounce, DataType } from "wl-core";

export default {
  name: "WlTable",
  props: {
    rowHeight: {
      type: Number,
      default: 65
    },
    defaultExpandAll: {
      //是否展开
      type: Boolean,
      default: function() {
        return false;
      }
    },
    //表格数据
    data: {
      type: Array,
      default: function() {
        return [];
      }
    },
    /* 表格额外的列配置数据:
        fixed | 'left','true','right' | 列是否固定,默认值:'';
        prop | 数据对象中的属性;
        label | 表头文字;
        align | 'left', 'center', 'right' | 对齐方式,默认值:'left';
        width | 列宽;
        minWidth | 列最小宽度;
        sortable | true, false | 是否排序,默认值:false;
        formatter | Function | 格式化函数;
        showOverflowTooltip | true,false | 内容溢出是,用...表示,默认值:true;
        className | 列的样式类名;
        */
    columns: {
      type: Array,
      default: function() {
        return [];
      }
    },
    //行的 className 的回调方法
    rowClassName: {
      type: Function,
      default: null
    },
    //单元格的 className 的回调方法
    cellClassName: {
      type: Function,
      default: null
    },
    // 表头行class
    headerRowClassName: String,
    //当前行是否高亮
    highlightCurrentRow: {
      type: Boolean,
      default: false
    },
    //是否显示复选框
    hasCheck: {
      type: Boolean,
      default: false
    },
    // 多选时，是否可以点击行快速选中复选框
    quickCheck: {
      type: Boolean,
      default: false
    },
    //是否显示序号
    hasIndex: {
      type: Boolean,
      default: true
    },
    // 行数据的 Key，用来优化 Table 的渲染
    rowKey: {
      type: String,
      default: "id"
    },
    //是否在表尾显示合计行
    showSummary: {
      type: Boolean,
      default: false
    },
    //合计行第一列的文本
    sumText: {
      type: String,
      default: "合计"
    },
    //自定义的合计计算方法
    summaryMethod: {
      type: Function,
      default: null
    },
    //行单击事件
    rowClick: {
      type: Function,
      default: function() {}
    },
    //行双击事件
    rowdblClick: {
      type: Function,
      default: function() {}
    },
    // 是否懒加载子节点数据
    lazy: {
      type: Boolean
    },
    // 加载子节点数据的函数，lazy 为 true 时生效
    load: {
      type: Function
    },
    //表格的高度
    height: [Number, String],
    //是否分页
    pagination: {
      type: Boolean,
      default: true
    },
    //表格数据总条数
    total: {
      type: Number,
      default: 0
    },
    //当前页数
    pageNum: {
      type: Number,
      default: 1
    },
    //每页显示几条数据
    pageSize: {
      type: Number,
      default: function() {
        return this.PAGESIZE;
      }
    },
    pageSizes: Array,
    //自定义的某行是否可以勾选
    selectable: {
      type: Function,
      default: null
    },
    rowStyle: {
      type: Function,
      default: null
    },
    cellStyle: {
      type: Function,
      default: null
    },
    spanMethod: {
      type: Function,
      default: null
    },
    treeProps: {
      type: Object,
      default: function() {
        return {};
      }
    },
    // 多选时默认选中行
    defaultChecked: [Array, Object]
  },
  data() {
    return {
      positionType: true,
      startIndex: 0,
      viewRows: [],
      virtualRows: [],
      scrollTop: 0,
      currentExpend: ["1"],
      temppath: null,
      realPath: null,
      selectionList: [] // 多选选中数据
    };
  },
  computed: {
    selfHeaderRowClassName() {
      return `ft-thead ${this.headerRowClassName || ""}`;
    }
  },
  watch: {
    data(val) {
      this.setIndex(val);
    },
    scrollTop(top) {
      this.calcList(top);
    }
  },
  created() {
    this.setDefaultCheck(this.defaultChecked);
  },
  mounted() {
    this.setIndex(this.data);
    this.calcList();
    this.$nextTick(() => {
      this.debounceFn = debounce(() => {
        this.scrollTop = this.$refs["wl-table"].bodyWrapper.scrollTop;
      }, 100);
      this.$refs["wl-table"].bodyWrapper.addEventListener(
        "scroll",
        this.debounceFn
      );
    });
  },
  methods: {
    setIndex(data) {
      let queue = [...data];
      let loop = 0;
      this.num = 0;
      while (queue.length > 0) {
        loop++;
        [...queue].forEach((child, i) => {
          queue.shift();
          this.num++;
          if (loop == 1) {
            child.customIndex = i + 1 + "";
            child.currentIndex = i;
            child.path = i;
          }
          if (child.children && child.children.length > 0) {
            child.dataType = 1;
            for (let ci = 0; ci < child.children.length; ci++) {
              child.children[ci].currentIndex = ci;
              child.children[ci].customIndex =
                child.customIndex + "." + (ci + 1);
              child.children[ci].path = child.path + ".children." + ci;
            }
            queue.push(...child.children);
          } else {
            child.dataType = 2;
          }
          child.expend = child.expend || true;
        });
      }
      this.$nextTick(() => {
        this.calcList();
      });
    },
    getPathByKey(value, key, arr) {
      this.temppath = [];
      this.realPath = "";
      try {
        for (let i = 0; i < arr.length; i++) {
          this.getNodePath(arr[i], value, key);
        }
      } catch (e) {
        return this.realPath;
      }
    },
    getNodePath(node, value, key) {
      this.temppath.push(node.currentIndex);
      //找到符合条件的节点，通过throw终止掉递归
      if (node[key] === value) {
        this.temppath.forEach((v, i) => {
          if (i == 0) {
            this.realPath += "." + v;
          } else {
            this.realPath += `.children.${v}`;
          }
        });
        // temppath = temppath.join(",")
        throw "GOT IT!";
        // return;
      }
      if (node.children && node.children.length > 0) {
        for (var i = 0; i < node.children.length; i++) {
          this.getNodePath(node.children[i], value, key);
        }

        //当前节点的子节点遍历完依旧没找到，则删除路径中的该节点
        this.temppath.pop();
      } else {
        //找到叶子节点时，删除路径当中的该叶子节点
        this.temppath.pop();
      }
    },
    calcBottom() {
      this.$nextTick(() => {
        let obj = this.$refs["wl-table"].$el;
        var top = obj.getBoundingClientRect().top; //元素顶知端到可见区域道顶端的距离专
        var bottom = obj.getBoundingClientRect().bottom; //元素顶知端到可见区域道顶端的距离专
        var se = document.documentElement.clientHeight; //浏览器可见区域高度。属
        if (top <= se - 50 && bottom >= se) {
          this.positionType = false; //fix
        } else {
          this.positionType = true;
        }
      });
    },
    calcList(scrollTop = this.scrollTop) {
      console.time("js 运行时间：");

      this.startIndex = Math.floor(scrollTop / this.rowHeight);
      console.log(this.startIndex)
      this.virtualRows = this.data.slice(this.startIndex, this.startIndex + 10);
      console.log(this.virtualRows )
      let height = this.num * this.rowHeight;
      let mainTable = this.$refs["wl-table"].$el.getElementsByClassName(
        "el-table__body"
      );

      Array.from(mainTable).forEach(v => {
        v.style.height = height + "px";
        if (this.startIndex + 10 >= this.num) {
          v.style.paddingTop = scrollTop - this.rowHeight + "px";
          v.style.paddingBottom = 0;
        } else {
          v.style.paddingTop = scrollTop + "px";
          v.style.paddingBottom =
            height - 10 * this.rowHeight - scrollTop + "px";
        }
      });
      this.$nextTick(() => {
        console.timeEnd("js 运行时间：");
      });
    },
    //单元格单击事件
    cellClick(row, column, cell, event) {
      if (column.type != "index" && column.type != "selection") {
        this.$emit("cellClick", row, column, cell, event);
      }
    },
    //每页条数change
    handleSizeChange(size) {
      this.$emit("size-change", size);
      this.$refs["tableRef"].bodyWrapper.scrollTop = 0;
    },
    //当前页数change
    handleCurrentChange(currentPage) {
      this.$emit("current-change", currentPage);
      this.$refs["tableRef"].bodyWrapper.scrollTop = 0;
    },
    //当用户手动勾选数据行的 Checkbox 时触发的事件， 注意会多输出一个字段表示是选中还是取消选中
    select(selection, row) {
      let _is_add = selection.some(i => i[this.rowKey] === row[this.rowKey]);
      this.selectionList = selection;
      this.$emit("select", selection, row, _is_add);
    },
    //当选择项发生变化时会触发该事件
    selectionChange(selections) {
      this.selectionList = selections;
      this.$emit("selection-change", selections);
    },
    //用于多选表格，清空用户的选择
    clearSelection() {
      this.$refs.tableRef.clearSelection();
    },
    // 行点击事件
    handleRowClick(row) {
      if (this.hasCheck && this.quickCheck) {
        let selected = this.selectionList.some(
          i => i[this.rowKey] == row[this.rowKey]
        );
        this.toggleRowSelection(row, !selected);
        this.$nextTick(() => {
          this.select(this.selectionList, row, !selected);
        });
      }
      this.$emit("row-click", row);
      this.rowClick && this.rowClick();
    },
    // 默认选中
    setDefaultCheck(val) {
      this.$nextTick(() => {
        if (Array.isArray(val)) {
          if (val.length > 0) {
            val.forEach(i => {
              this.toggleRowSelection(i, true);
            });
          } else {
            this.$refs["tableRef"].clearSelection();
          }
          return;
        }
        if (DataType.isObject(val)) {
          this.setCurrentRow(val);
        }
      });
    },
    // ------------------------------------------------一下为提供方法-------------------------------------------
    // 设置单行选中方法
    setCurrentRow(row) {
      this.$refs["tableRef"].setCurrentRow(row);
    },
    // 设置单行选中方法
    toggleRowSelection(row, selected) {
      this.$refs["tableRef"].toggleRowSelection(row, selected);
    },
    // 设置数表的行展开状态
    toggleRowExpansion(row, expanded = true) {
      this.$refs["tableRef"].toggleRowExpansion(row, expanded);
    },
    /**
     * 手动调用树表懒加载
     * row 要展开的行信息
     */
    loadTree(row) {
      this.$refs["tableRef"].store.loadOrToggle(row);
    },
    /**
     * 更新树表懒加载后的子节点
     * 要更新的节点id
     * 要添加的节点data
     */
    loadTreeAdd(id, data) {
      let _children =
        this.$refs["tableRef"].store.states.lazyTreeNodeMap[id] || [];
      _children.unshift(data);
      this.$set(
        this.$refs["tableRef"].store.states.lazyTreeNodeMap,
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
      let _children = this.$refs["tableRef"].store.states.lazyTreeNodeMap[id];
      let _new_children = _children.filter(i => i[this.rowKey] != key);
      this.$set(
        this.$refs["tableRef"].store.states.lazyTreeNodeMap,
        id,
        _new_children
      );
    }
  }
};
</script>

