<template>
  <!-- 表单设计器 -->
  <div class="wl-form-designer">
    <!-- 表单设计器 头部 -->
    <div class="form-designer-header">
      <div class="designer-header-left">
        <slot name="title-left"></slot>
      </div>
      <div class="designer-header-center">
        <slot name="title"> 表单设计器 </slot>
      </div>
      <div class="designer-header-right">
        <slot name="title-right"> </slot>
        <el-button
          type="primary"
          size="medium "
          class="wl-button"
          @click="handelPrview()"
        >
          预览
        </el-button>
        <el-button
          type="primary"
          size="medium "
          class="wl-button"
          @click="handelPublish()"
        >
          发布
        </el-button>
      </div>
    </div>
    <!-- 表单设计器 内容区 -->
    <div class="form-designer-body">
      <!-- 表单元素区 -->
      <form-element></form-element>
      <!-- 表单预览区 -->
      <form-view ref="form-view" :formElementType="formElementType"></form-view>
      <!-- 表单字段描述区 -->
      <form-info :formElementType="formElementType"></form-info>
    </div>
    <!-- 预览 弹出区 -->
    <popup-preview
      :code="formJson"
      v-if="layout.preview"
      @close="layout.preview = false"
    ></popup-preview>
  </div>
</template>

<script>
/**
 * @name 表单生成器
 * @author weilan
 * @time 2020-10-13
 * @description 导出表单json数据，配合表单解释器使用更便捷
 */
import FormElement from "./components/form-element"; // 导入表单元素组件
import FormInfo from "./components/form-info"; // 导入表单字段描述组件
import FormView from "./components/form-view"; // 导入表单效果组件
import PopupPreview from "./components/popup-preview"; // 导入弹出组件

export default {
  name: "WlFormDesigner",
  components: { FormElement, FormInfo, FormView, PopupPreview },
  data() {
    return {
      layout: { preview: false }, // 视图管理
      formElementType: {
        number: ["element-numberInput"], // 数字输入框
        checkbox: ["element-checkbox", "element-radio"], // 单选多选
        date: ["element-date", "element-dateRange"], // 日期、日期区间
        dateRange: ["element-dateRange"], // 日期区间
        money: ["element-money"], // 金额输入框
        rate: ["element-rate"], // 评分
        file: ["element-file"], // 附件
        select: [
          "element-checkbox",
          "element-radio",
          "element-date",
          "element-dateRange",
          "element-contact",
          "element-department",
          "element-site",
          "element-area",
          "element-associatedForm",
        ], // 选择型表单
      }, // 表单元素类型，用于显示不同字段信息
      formJson: [], // 表单json
    };
  },
  methods: {
    // 预览表单
    handelPrview() {
      this.formJson = this.getFormJson();
      this.$emit("preview", this.formJson);
      this.layout.preview = true;
    },
    // 发布表单
    handelPublish() {
      this.$emit("publish", this.getFormJson());
    },
    // --------------------------- 方法 -----------------------------
    // 获取表单json
    getFormJson() {
      return this.$refs["form-view"].formJson;
    },
    // 设置表单json
    setFormJson(data) {
      if (!Array.isArray(data)) throw Error("data必须是一个数组");
      this.$refs["form-view"].setJson(data);
    },
  },
};
</script>

<style lang="scss">
@import "./assets/css/variable.scss";

.wl-form-designer {
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  overflow: hidden;
  color: $color;

  > .form-designer-header {
    display: flex;
    justify-content: space-between;
    height: 40px;
    padding: 10px $padding;
    line-height: 40px;
    background: $form-element-bg-hover;
    font-size: 16px;
  }

  .wl-button {
    background-color: $botton-bg;
    border-color: $botton-bg;
    color: $botton-color;
  }

  .form-designer-body {
    flex: 1;
    display: flex;
    background: $form-bg;
    overflow: hidden;
  }

  .draggable-item {
    transition: all 0.3s ease;
  }

  .el-form-item__label {
    color: $form-label-color;
  }
  .width-full {
    width: 100%;
  }
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
}
</style>