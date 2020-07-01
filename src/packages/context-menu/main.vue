<template>
  <div class="wl-context-menu" v-if="flag" :style="style">
    <ul class="menu-liet" v-if="useDefault">
      <li
        class="menu-item"
        v-for="item of menuList"
        :key="item.value"
        @click="handleMenuItem(item)"
      >
        <i class="memu-item-icon" :class="item.icon"></i>
        <span class="memu-item-title">{{item.title}}</span>
      </li>
      <li class="menu-item" v-if="menuList.length === 0" @click="flag = false">
        <span class="memu-item-title">暂无菜单</span>
      </li>
    </ul>
    <slot />
  </div>
</template>

<script>
export default {
  name: "WlContextMenu",
  props: {
    visible: {
      type: Boolean,
      default: false
    }, // 是否打开上下文菜单
    x: {
      type: Number,
      default: 0
    }, // 菜单打开坐标x轴
    y: {
      type: Number,
      default: 0
    }, // 菜单打开坐标y轴
    useDefault: {
      type: Boolean,
      default: true
    }, // 是否使用内置菜单样式
    menuList: {
      type: Array,
      default: () => []
    } // 使用内置菜单样式是，菜单列表
  },
  computed: {
    flag: {
      get() {
        if (this.visible) {
          // 注册全局监听事件 [ 目前只考虑鼠标解除触发 ]
          window.addEventListener("mousedown", this.watchContextmenu);
        }
        return this.visible;
      },
      set(newVal) {
        this.$emit("update:visible", newVal);
      }
    },
    style() {
      return {
        left: this.x + "px",
        top: this.y + "px",
        display: this.visible ? "block" : "none "
      };
    }
  },
  methods: {
    // 菜单点击事件
    handleMenuItem(item) {
      this.$emit("rowClick", item);
    },
    watchContextmenu(event) {
      if (!this.$el.contains(event.target) || event.button !== 0)
        this.flag = false;
      window.removeEventListener("mousedown", this.watchContextmenu);
    }
  },
  mounted() {
    // 将菜单放置到body下
    document.querySelector("body").appendChild(this.$el);
  }
};
</script>

<style lang="scss">
@import "~@/assets/css/context-menu/index.min.css";
</style>
