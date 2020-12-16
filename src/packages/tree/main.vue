<template>
  <div class="ft-tree border">
    <!-- 头部自定义区 -->
    <div>
      <slot name="top"></slot>
    </div>
    <!-- 主体树 -->
    <ft-scroll class="ft-tree-body">
      <el-tree
        ref="ft-tree"
        v-if="!editable"
        :data="data"
        :props="selfProps"
        :node-key="nodeKey"
        :default-expand-all="defaultExpandAll"
        :filter-node-method="filterNodeMethod"
        :expand-on-click-node="expandOnClickNode"
        @current-change="handleCurrentChange"
        @node-click="handleNodeClick"
      >
        <template slot-scope="{ node, data }">
          <slot :node="node" :data="data"></slot>
        </template>
      </el-tree>
      <template v-else>
        <el-button v-if="!selfData.length" type="primary" @click="handleTreeAdd(null)">
          {{ noDataBtn }}
        </el-button>
        <el-tree
          ref="ft-tree"
          :data="selfData"
          :props="selfProps"
          :node-key="nodeKey"
          :default-expand-all="defaultExpandAll"
          :filter-node-method="filterNodeMethod"
          :render-after-expand="renderAfterExpand"
          :expand-on-click-node="expandOnClickNode"
          :default-expanded-keys="selfDefaultExpandedKeys"
          @current-change="handleCurrentChange"
          @node-click="handleNodeClick"
        >
          <div slot-scope="{ node, data }" v-if="data.isEdit">
            <el-input
              clearable
              size="small"
              v-loading="load.nodeChange"
              v-model="data[selfProps.label]"
              @change="nodeChange($event, data, node)"
              @blur="nodeBlur($event, data)"
              placeholder="请输入节点名称"
            ></el-input>
          </div>
          <div
            v-else
            class="ft-tree-node"
            slot-scope="{ node, data }"
            :ref="data[nodeKey]"
          >
            <template>
              <div class="tree-label-box">{{ node.label }}</div>
              <div class="tree-icon-box">
                <el-dropdown
                  v-if="node.level === 1"
                  trigger="click"
                  placement="bottom"
                  @command="handleTreeCommand($event, data)"
                >
                  <i class="el-icon-circle-plus-outline handle-tree-icon color-blue"></i>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="next">同级</el-dropdown-item>
                    <el-dropdown-item command="child">子级</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <i
                  v-else
                  @click.stop="handleTreeAdd(data)"
                  class="handle-tree-icon color-blue el-icon-circle-plus-outline"
                ></i>
                <i
                  @click.stop="handleTreeEdit(data)"
                  class="handle-tree-icon color-blue el-icon-edit-outline"
                ></i>
                <i
                  @click.stop="handleTreeDel(data)"
                  class="handle-tree-icon color-red el-icon-delete"
                ></i>
              </div>
            </template>
          </div>
        </el-tree>
      </template>
    </ft-scroll>
  </div>
</template>

<script>
/**
 * @author weilan
 * @time 2020.07.09
 * @description 树组件封装
 * @param {Array} data 数据
 * @param {String} nodeKey node-key
 * @param {Boolean} editable 是否可编辑
 * @param {Boolean} expandOnClickNode 是否可点击节点展开
 * @param {Boolean} defaultExpandAll 是否默认展开全部
 * @param {Array} defaultExpandedKeys 默认展开节点
 * @param {Object} props 配置项
 * @param {Function} filterNodeMethod 自定义筛选函数
 * @method el-tree提供的方法
 * @emits node-change (val, {data, node}, this.closeLoading) 节点编辑change事件
 * @emits node-del (data, this.remove) 节点删除事件
 * @emits el-tree提供的事件
 */
export default {
  name: "WlTree",
  props: {
    data: Array, // 数据
    nodeKey: {
      type: String,
      default: "id",
    }, // node-key
    editable: {
      type: Boolean,
      default: false,
    }, // 是否可编辑
    expandOnClickNode: {
      type: Boolean,
      default: true,
    }, // 点击节点展开
    defaultExpandAll: {
      type: Boolean,
      default: false,
    }, // 是否默认展开全部
    defaultExpandedKeys: Array, // 默认展开节点
    props: Object, // 配置项
    filterNodeMethod: Function, // 自定义筛选函数
    noDataBtn: {
      type: String,
      default: "新增",
    }, // 无数据时的新增按钮名
    renderAfterExpand: {
      type: Boolean,
      default: true,
    }, // 是否在第一次展开某个树节点后才渲染其子节点
  },
  data() {
    return {
      load: {
        nodeChange: false,
        nodeDel: null,
      }, // load管理
      hasAddNow: false, // 现在是否存在新增节点
      loadingInstance: null,
      expandedKey: "", // 要展开的节点
      addData: [], // 新增的根节点
      nodeKeyVal: "a-new-node", // 新增时默认节点id值
    };
  },
  computed: {
    // 默认字段
    selfProps() {
      return {
        label: "name",
        children: "children",
        disabled: "disabled",
        isLeaf: "isLeaf",
        isEdit: "isEdit",
        ...this.props,
      };
    },
    // 设置默认展开节点
    selfDefaultExpandedKeys() {
      return [...this.defaultExpandedKeys, this.expandedKey];
    },
    // 动态监听数据
    selfData() {
      return [...this.data, ...this.addData];
    },
  },
  watch: {
    // 监听到外部传入data发生变化，情况内部data
    data() {
      this.addData = [];
    },
  },
  methods: {
    /**
     * @name 顶层节点选择添加同级或子集
     * @param {String} command 指令
     * @param {Object} data 当前节点数据
     */
    handleTreeCommand(command, data) {
      let parent_data = command === "child" ? data : null;
      this.handleTreeAdd(parent_data);
    },
    /**
     * @name 添加下级节点
     * @param {Object} parent_data 父级数据
     */
    handleTreeAdd(parent_data) {
      if (this.hasAddNow) {
        this.$message({
          type: "warning",
          message: "当前存在一个未提交新增节点,请提交后再创建",
        });
        return;
      }
      const newNode = {
        [this.nodeKey]: this.nodeKeyVal,
        [this.selfProps.label]: "",
        [this.selfProps.children]: [],
        isEdit: true,
      };
      this.hasAddNow = true;
      this.appendData(newNode, parent_data);
      this.expandedKey = this.nodeKeyVal;
      this.$refs["ft-tree"].setCurrentKey(this.nodeKeyVal);
      this.focus();
    },
    /**
     * @name 编辑当前节点
     * @param {Object} data 当前节点数据
     */
    handleTreeEdit(data) {
      this.$set(data, "_name", data[this.selfProps.label]);
      this.$set(data, this.selfProps.isEdit, true);
      this.focus();
    },
    /**
     * @name 节点修改提交
     * @param {String} val 数据
     * @param {Object} data 节点数据
     * @param {Object} node 节点对应的 Node
     */
    nodeChange(val, data, node) {
      // 编辑时不允许无输入值
      if (!val) {
        this.$message({
          type: "warning",
          message: "请输入节点名！",
        });
        return;
      }
      // 正常提交
      this.load.nodeChange = true;
      const _info = {
        data,
        node,
      };
      this.$emit("node-change", val, _info, () => {
        this.load.nodeChange = false;
        this.hasAddNow = false;
      });
    },
    /**
     * @name 补充change监听不到新增时不填写内容和编辑时不更改内容的缺陷
     * @param {Object} event 元素内容
     * @param {Object} data 节点数据
     */
    nodeBlur(event, data) {
      const val = event.target.value;
      // 新增时无输入值视为取消
      if (!val && data[this.nodeKey] == this.nodeKeyVal) {
        this.remove({ [this.nodeKey]: this.nodeKeyVal });
        this.hasAddNow = false;
      }
      // 有值但是无改动时只切换视图不触发提交
      if (val === data._name) {
        this.$set(data, this.selfProps.isEdit, false);
        return;
      }
    },
    /**
     * @name 删除节点
     * @param {Object} data 当前节点数据
     */
    handleTreeDel(data) {
      this.$confirm("是否确认删除当前节点？")
        .then(() => {
          this.load.nodeDel = this.$loading({
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
            target: this.$refs[data[this.nodeKey]],
          });

          this.$emit("node-del", data, this.remove);
        })
        .catch();
    },
    /**
     * @name 用数据的方法添加一个节点
     * @param {Object} newNode 新节点数据
     * @param {Object} parent_data 父节点数据
     */
    appendData(newNode, parent_data) {
      if (parent_data) {
        let new_children = Array.isArray(parent_data[this.selfProps.children])
          ? [...parent_data[this.selfProps.children], newNode]
          : [newNode];
        this.$set(parent_data, this.selfProps.children, new_children);
      } else {
        this.addData.push(newNode);
      }
    },
    // 节点点击 -------------------------------------------------事件---------------------------------------
    handleNodeClick(data, node, event) {
      this.$emit("node-click", data, node, event);
    },
    // 节点选中变化
    handleCurrentChange(data, node) {
      this.$emit("current-change", data, node, event);
    },
    // 设置某个节点的当前选中状态 ------------------------------------------方法-----------------------------
    setCurrentNode(node) {
      this.$refs["ft-tree"].setCurrentNode(node);
    },
    setCurrentKey(key) {
      this.$refs["ft-tree"].setCurrentKey(key);
    },
    // 移除某个节点
    remove(data) {
      this.load.nodeDel?.close?.();
      data && this.$refs["ft-tree"].remove(data);
    },
    // 根据 data 或者 key 拿到 Tree 组件中的 nod
    getNode(data) {
      return this.$refs["ft-tree"].getNode(data);
    },
    // 为 Tree 中的一个节点追加一个子节点
    append(data, parentNode) {
      this.$refs["ft-tree"].append(data, parentNode);
    },
    // 筛选
    filter(val) {
      this.$refs["ft-tree"].filter(val);
    },
    // 使输入框获得焦点
    focus() {
      this.$nextTick(() => {
        this.$refs["wl-input"].focus();
      });
    },
  },
};
</script>

<style lang="scss">
.ft-tree {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 260px;
  padding: 10px;
  box-sizing: border-box;

  .el-tree {
    background: transparent;
  }
  .el-tree-node__content {
    height: 36px;
    line-height: 36px;
  }

  .ft-tree-node {
    display: flex;
    justify-content: space-between;
    width: calc(100% - 24px);
    .tree-label-box {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: calc(100% - 66px);
    }
    &:hover .tree-icon-box {
      display: flex;
      width: 66px;
    }
  }

  .tree-icon-box {
    display: none;
    justify-content: space-between;
    padding-right: 6px;
    width: 66px;
    transition: all 0.3s;
  }

  .handle-tree-icon {
    line-height: 36px;
    font-size: 16px;
  }
}
</style>
