<template>
  <el-row
    class="wl-transfer-table"
    type="flex"
    justify="space-around"
    :gutter="20"
    v-if="show"
  >
    <el-col :span="colSpan[0]" class="transfer-table-span">
      <!-- 左侧上部slot -->
      <slot name="header-left"></slot>
      <!-- 左侧表格 -->
      <wl-table
        class="wl-table"
        ref="left-table"
        has-check
        quick-check
        :data="leftData"
        :row-key="rowKey"
        :has-index="false"
        :columns="leftColumns"
        :pageSize="10"
        :total="selfPage.total"
        :selectable="selectable"
        :reserve-selection="true"
        :page-size="selfPage.size"
        :page-num="selfPage.index"
        :defaultChecked="selfDefaultChecked"
        @current-change="currentPageChanged"
        @size-change="selfSizeChange"
        @select-all="AllSelect"
        @select="rowSelect"
      >
      </wl-table>
    </el-col>
    <el-col :span="colSpan[1]" class="transfer-table-span">
      <!-- 右侧上部slot -->
      <slot name="header-right"></slot>
      <!-- 右侧表格 -->
      <wl-table
        class="wl-table"
        ref="right-table"
        :row-key="rowKey"
        :data="selfRightData"
        :columns="selfRightColumns"
      >
        <template #handle="{ row }">
          <el-button
            type="text"
            icon="el-icon-delete"
            class="color-red remove-icon"
            @click="remove(row)"
          ></el-button>
        </template>
      </wl-table>
    </el-col>
  </el-row>
</template>

<script>
import WlTable from "../table";
import { differenceBy } from "lodash";

export default {
  name: "table-transfer",
  components: { WlTable },
  props: {
    rowKey: {
      type: String,
      default: "id",
    }, // 表格行数据key，默认id
    leftColumns: {
      type: Array,
      default: () => {
        return [];
      },
    }, // 左侧表头
    leftData: {
      type: Array,
      default: () => {
        return [];
      },
    }, // 左侧数据
    rightColumns: Array, // 右侧表头，如果不传则使用左侧表头
    rightData: {
      type: Array,
      default: () => {
        return [];
      },
    }, // 右侧数据
    selectable: Function, // 是否可选
    colSpan: {
      type: Array,
      default: () => {
        return [12, 12];
      },
    }, // 栅格占比
  },
  data() {
    return {
      selfRightData: [], // 右侧数据
    };
  },
  computed: {
    // 处理右侧表头
    selfRightColumns() {
      let prop_columns = this.rightColumns || this.leftColumns;
      const handle_item = [
        {
          label: "操作",
          slot: true,
          width: 60,
          prop: "handle",
          align: "center",
        },
      ];
      return prop_columns.concat(handle_item);
    },
    // 默认选中
    selfDefaultChecked() {
      return this.leftData.filter((i) =>
        this.selfRightData.some((t) => t[this.rowKey] == i[this.rowKey])
      );
    },
  },
  watch: {
    rightData: {
      handler(val) {
        this.selfRightData = [...val];
      },
      immediate: true,
    },
  },
  methods: {
    /**
     * @name 左侧行checkbox事件
     * @param {Array} data 数据
     * @param {Object} row 行数据
     * @param {Object} isCheck 是否选中
     */
    rowSelect(data, row, isCheck) {
      // 选中
      if (isCheck) {
        this.selfRightData.push(row);
        this.$emit("add", row);
      } else {
        // 取消选中
        this.selfRightData = this.selfRightData.filter(
          (i) => i[this.rowKey] !== row[this.rowKey]
        );
        this.$emit("remove", row);
      }
    },
    /**
     * @name 选中全部
     */
    AllSelect(data) {
      if (data.length) {
        // 添加
        data.forEach((i) => {
          let had = this.selfRightData.find((t) => t[this.rowKey] == i[this.rowKey]);
          if (!had) {
            this.selfRightData.push(i);
          }
        });
        this.$emit("add-all", this.data);
      } else {
        // 移除
        this.selfRightData = differenceBy(this.selfRightData, this.leftData, this.rowKey);
        this.$emit("remove-all", this.leftData);
      }
    },
    /**
     * @name 移除已选数据
     */
    remove(row) {
      this.selfRightData = this.selfRightData.filter(
        (i) => i[this.rowKey] !== row[this.rowKey]
      );
      const left_row = this.leftData.find((i) => i[this.rowKey] == row[this.rowKey]);
      this.$refs["left-table"].toggleRowSelection(left_row, false);
      this.$emit("remove", row);
    },
    // 全部移除
    delRight() {
      this.$emit("remove-all", this.selfRightData);
      this.selfRightData = [];
    },
  },
};
</script>

<style lang="scss">
.transfer-table-span {
  height: 100%;
  display: flex;
  flex-direction: column;
  > .wl-table {
    flex: 1;
    overflow: auto;
  }
}
</style>
