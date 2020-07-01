<template>
  <div class="wl-container">
    <!-- 主体内容区 - 头部 -->
    <div class="wl-container-header" v-if="$slots.header">
      <slot name="header"></slot>
    </div>
    <!-- 主体区 -->
    <el-scrollbar class="wl-container-scroll" v-if="useScroll">
      <slot></slot>
    </el-scrollbar>
    <div v-else class="wl-container-main" :class="wlBodyClass">
      <slot></slot>
    </div>
    <!-- 主体内容区 - 底部 -->
    <div class="wl-container-footer" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "WlContainer",
  props: {
    // 是否使用带scroll的main
    useScroll: {
      type: Boolean,
      default: true
    },
    // 自定义main的class
    wlBodyClass: [String, Function]
    // 更多条件
  }
};
</script>

<style>
@import "~@/assets/css/container/index.min.css";
</style>