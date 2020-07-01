<template>
  <el-scrollbar class="wl-scroll">
    <slot></slot>
  </el-scrollbar>
</template>

<script>
export default {
  name: "WlScroll"
};
</script>

<style lang="scss">
@import "~@/assets/css/scroll/index.min.css";
</style>