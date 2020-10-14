<template>
  <!-- 表单元素库组件 -->
  <div class="designer-body-element">
    <!-- 表单元素类型 -->
    <div class="element-type-box">
      <el-radio-group
        size="medium"
        v-model="layout.elementType"
        @change="handleElementTypeChange"
      >
        <el-radio-button class="wl-button" label="item">控件库</el-radio-button>
        <el-radio-button class="wl-button" label="group"
          >套件库</el-radio-button
        >
      </el-radio-group>
    </div>
    <!-- 表单元素列表 -->
    <div class="element-box">
      <transition name="fade">
        <div
          key="element-item"
          v-if="isElementItemActive"
          class="element-type element-item-box"
        >
          <draggable
            class="draggable-box"
            v-model="elementList"
            group="people"
          >
            <transition-group tag="ul">
              <li
                class="draggable-item"
                v-for="item in elementList"
                :key="item.key"
                @click="handleElementSelect(item)"
              >
                <i class="iconfont draggable-icon" :class="item.icon"></i>
                <span>{{ item.name }}</span>
              </li>
            </transition-group>
          </draggable>
        </div>
        <div key="element-group" v-else class="element-type element-group-box">
          <div
            class="group-draggable-box"
            v-for="mode of elementGroupList"
            :key="mode.key"
          >
            <h3 class="group-mode-title">{{ mode.name }}</h3>
            <draggable
              class="draggable-box"
              v-model="mode.children"
              group="people"
            >
              <transition-group tag="ul">
                <li
                  class="draggable-item"
                  v-for="item in mode.children"
                  :key="item.key"
                  @click="handleElementSelect(item)"
                >
                  <i class="iconfont draggable-icon" :class="item.icon"></i>
                  <span>{{ item.name }}</span>
                </li>
              </transition-group>
            </draggable>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import Bus from "../assets/js/bus";
import { formElementList, formElementGroupList } from "../assets/js/data";
import { createGuid } from "../assets/js/util";

export default {
  name: "FormElement",
  components: { draggable },
  data() {
    return {
      layout: {
        elementType: "item",
      }, // 视图管理
      elementList: formElementList, // 表单元素列表
      elementGroupList: formElementGroupList, // 表单元素列表
    };
  },
  computed: {
    // 当前聚焦表单元素类型
    isElementItemActive() {
      return this.layout.elementType === "item";
    },
  },
  methods: {
    // 表单类型改变
    handleElementTypeChange() {},
    // 点击选则表单元素控件
    handleElementSelect(item) {
      const id = createGuid();
      Bus.$emit("form-element-select", { ...item, id });
    },
  },
};
</script>

<style lang="scss">
@import url("../assets/iconfont/iconfont.css");
@import "../assets/css/variable.scss";

.designer-body-element {
  display: flex;
  flex-direction: column;
  border-right: 1px solid $form-element-bg-hover;
  width: 250px;
  padding: $padding;
  > .element-type-box {
    height: 50px;
  }

  > .element-box {
    position: relative;
    flex: 1;
    overflow: auto;

    > .element-type {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      .group-mode-title {
        margin: 8px 0;
      }
    }

    .draggable-item {
      width: 48%;
      margin: 5px 0;
      border: 1px solid $form-element-bg-hover;
      padding: 4px 10px;
      background-color: $form-element-bg;
      cursor: pointer;
      line-height: 28px;
      border-radius: 6px;
      box-sizing: border-box;
      &:hover {
        border-color: $form-element-bg;
        background-color: $form-element-bg-hover;
      }

      > .draggable-icon {
        margin-right: 10px;
      }
    }
  }

  .draggable-box > ul {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    transform: translateX(-100%);
    opacity: 0;
  }
}
</style>