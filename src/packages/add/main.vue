
<template>
  <el-button :type="type" :icon="icon" :size="size" @click="submitAdd()">
    <slot>确 定</slot>
  </el-button>
</template>

<script>
import { throttle } from "wl-core";

export default {
  name: "WlAdd",
  props: {
    // 类型
    type: {
      type: String,
      default: "primary"
    },
    icon: {
      type: String,
      default: ""
    },
    size: {
      type: String,
      default: "medium"
    }
  },
  methods: {
    submitAdd: throttle(function() {
      this.$emit("click");
    }, 1000)
  }
};
</script>
