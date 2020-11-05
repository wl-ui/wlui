<template>
  <div class="wl-form-parser">
    <keep-alive>
      <component
        ref="ui"
        :json="json"
        :is="currentComponent"
        @submit="handleSubmit"
        @failed="handleFailed"
      ></component>
    </keep-alive>
  </div>
</template>

<script>
/**
 * @name 表单解释器
 * @author weilan
 * @time 2020-10-16
 * @description 配合表单生成器导出的json数据使用，暂不支持自定义数据结构
 */
import UiVant from "./components/ui-vant";
import UiElement from "./components/ui-element";
// import UiUview from "./components/ui-uview"; // uview组件建议复制源码至你的项目

export default {
  name: "WlFormParser",
  components: { UiVant, UiElement/* , UiUview */ },
  props: {
    ui: {
      type: String,
      default: "element",
      required: true,
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return ["element", "vant", "uview"].indexOf(value) !== -1;
      },
    },
    json: {
      type: Array,
    },
    submitBtn: Boolean,
  },
  computed: {
    currentComponent() {
      return `Ui${this.ui.replace(this.ui[0], this.ui[0].toUpperCase())}`;
    },
  },
  methods: {
    // 验证通过提交操作
    handleSubmit(val) {
      this.$emit("submit", val);
    },
    // 验证失败
    handleFailed(err) {
      this.$emit("failed", err);
    },
    // ---------------- 方法 -------------------
    // 提交
    submit() {
      this.$refs["ui"].submit();
    },
    // 验证表单，支持传入name来验证单个表单项
    validate(name) {
      this.$refs["ui"].validate(name);
    },
    // 重置表单项的验证提示，支持传入name来重置单个表单项
    resetValidation(name) {
      this.$refs["ui"].resetValidation(name);
    },
    // 滚动到对应表单项的位置，默认滚动到顶部，第二个参数传 false 可滚动至底部
    scrollToField(name, alignToTop) {
      this.$refs["ui"].scrollToField(name, alignToTop);
    },
  },
};
</script>