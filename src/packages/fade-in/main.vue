<template>
  <transition name="wl-fade">
    <div v-if="show" class="wl-fade-in">
      <h3 class="wl-fade-in-header" v-if="$slots.header">
        <slot name="header"></slot>
      </h3>
      <!-- 主体区 -->
      <el-scrollbar class="wl-fade-in-scroll" v-if="useScroll">
        <slot></slot>
      </el-scrollbar>
      <div v-else class="wl-fade-in-main" :class="wlBodyClass">
        <slot></slot>
      </div>
      <!-- 主体内容区 - 底部 -->
      <div class="wl-fade-in-footer" v-if="$slots.footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "WlFadeIn",
  props: {
    // 是否显示
    show: {
      type: Boolean,
      default: false
    },
    // 是否使用scroll组件
    useScroll: {
      type: Boolean,
      default: true
    },
    // 自定义main的class
    wlBodyClass: [String, Function]
  }
};
</script>

<style lang="scss">
@import "~@/assets/css/fade-in/index.scss";
</style>