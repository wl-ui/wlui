<template>
  <div class="wl-tree border">
    <!-- 头部自定义区 -->
    <div>
      <slot name="top"></slot>
    </div>
    <!-- 主体树 -->
    <ft-scroll class="wl-tree-body">
      <el-tree
        ref="wl-tree"
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
      <el-tree
        ref="wl-tree"
        v-else
        :data="data"
        :props="selfProps"
        :node-key="nodeKey"
        :default-expand-all="defaultExpandAll"
        :filter-node-method="filterNodeMethod"
        :expand-on-click-node="expandOnClickNode"
        :default-expanded-keys="defaultExpandedKeys"
        @current-change="handleCurrentChange"
        @node-click="handleNodeClick"
      >
        <div slot-scope="{ node, data }" v-if="data.isEdit">
          <el-input
            size="small"
            v-loading="load.nodeChange"
            v-model="data[selfProps.label]"
            @change="nodeChange($event, data, node)"
            placeholder="请输入节点名称"
          ></el-input>
        </div>
        <div
          v-else
          class="wl-tree-node"
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
                <i
                  class="el-icon-circle-plus-outline handle-tree-icon color-blue"
                ></i>
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
  },
  data() {
    return {
      load: {
        nodeChange: false,
        nodeDel: null,
      }, // load管理
      hasAddNow: false, // 现在是否存在新增节点
      loadingInstance: null,
    };
  },
  computed: {
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
     * @param {Object} data 父级数据
     */
    handleTreeAdd(data) {
      if (this.hasAddNow) {
        this.$message({
          type: "warning",
          message: "当前存在一个未提交新增节点,请提交后再创建",
        });
        return;
      }
      const newNode = {
        [this.nodeKey]: "a-new-node",
        [this.selfProps.label]: "",
        [this.selfProps.children]: [],
        isEdit: true,
      };
      this.hasAddNow = true;
      this.append(newNode, data);
    },
    /**
     * @name 编辑当前节点
     * @param {Object} data 当前节点数据
     */
    handleTreeEdit(data) {
      this.$set(data, this.selfProps.isEdit, true);
    },
    /**
     * @name 节点修改提交
     * @param {String} val 数据
     * @param {Object} data 节点数据
     * @param {Object} node 节点对应的 Node
     */
    nodeChange(val, data, node) {
      if (!val) {
        this.$message({
          type: "warning",
          message: "请输入节点名！",
        });
        return;
      }
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
      this.$refs["wl-tree"].setCurrentNode(node);
    },
    setCurrentKey(key) {
      this.$refs["wl-tree"].setCurrentKey(key);
    },
    // 移除某个节点
    remove(data) {
      this.load.nodeDel?.close?.();
      this.$refs["wl-tree"].remove(data);
    },
    // 根据 data 或者 key 拿到 Tree 组件中的 nod
    getNode(data) {
      return this.$refs["wl-tree"].getNode(data);
    },
    // 为 Tree 中的一个节点追加一个子节点
    append(data, parentNode) {
      this.$refs["wl-tree"].append(data, parentNode);
    },
    // 筛选
    filter(val) {
      this.$refs["wl-tree"].filter(val);
    },
  },
};
</script>

<style lang="scss">
</style>
