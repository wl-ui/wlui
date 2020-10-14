<template>
  <!-- 弹出预览区 -->
  <div class="wl-popup-mask">
    <div class="wl-popup-context">
      <!-- 标题区 -->
      <h3 class="wl-popup-title">
        <el-button type="primary" size="medium " class="wl-button">
          JSON数据
        </el-button>
        <el-button type="primary" size="medium " class="wl-button">
          Vue Template
        </el-button>
        <div @click="handelPopupClose" class="popup-title-close">
          <i class="iconfont wl-guanbi"></i>
        </div>
      </h3>
      <!-- 代码区 -->
      <div class="wl-popup-code">
        <el-scrollbar class="popup-code-scroll">
          <pre class="code-box">{{ code }}</pre>
        </el-scrollbar>
      </div>
      <!-- 脚部按钮区 -->
      <!--  <div class="wl-popup-bottom">
        <el-button type="primary" size="medium " class="wl-button">
          复制
        </el-button>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "PopupPreview",
  props: {
    code: Array,
  },
  methods: {
    handelPopupClose() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss">
@import "../assets/css/variable.scss";

.wl-popup-mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  background: rgba(220, 220, 220, 0.5);
  overflow: auto;

  > .wl-popup-context {
    display: flex;
    flex-direction: column;
    width: 60%;
    height: 65%;
    margin: 8% auto;
    background: $popup-bg;
    border-radius: 3px;
    overflow: hidden;

    > .wl-popup-title {
      height: 60px;
      background: $form-element-bg-hover;
      padding: $padding;
      box-sizing: border-box;
      > .popup-title-close {
        float: right;
        line-height: 36px;
        cursor: pointer;
        padding: 0 5px;
        > .wl-guanbi {
          font-size: 18px;
        }
      }
    }
    > .wl-popup-bottom {
      height: 60px;
      padding: $padding 20px;
      background: $form-bg;
      text-align: center;
      box-sizing: border-box;
    }
  }
  .wl-popup-code {
    flex: 1;
    overflow: hidden;
    color: $titlt-color;

    > .popup-code-scroll {
      height: 100%;
      box-sizing: border-box;
    }
    .code-box {
      margin: 0;
      padding: 20px;
    }
  }
}
</style>