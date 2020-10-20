<template>
  <!-- 弹出预览区 -->
  <div class="wl-popup-mask">
    <div class="wl-popup-context">
      <!-- 标题区 -->
      <h3 class="wl-popup-title">
        <el-button
          type="primary"
          size="medium "
          class="wl-button"
          @click="handelPreviewChange('data')"
        >
          JSON数据
        </el-button>
        <el-button
          type="primary"
          size="medium "
          class="wl-button"
          @click="handelPreviewChange('Template')"
        >
          Vue Template
        </el-button>
        <div @click="handelPopupClose" class="popup-title-close">
          <i class="iconfont wl-guanbi"></i>
        </div>
      </h3>
      <!-- 代码区 -->
      <div class="wl-popup-code">
        <el-scrollbar class="popup-code-scroll">
          <!-- json data 展示区 -->
          <pre class="code-box" v-show="isJsonData">{{ code }}</pre>
          <!-- template 展示区 -->
          <div v-show="!isJsonData" class="tab-template-box">
            <pre class="template-code">{{ tamplateCode }}</pre>
            <div class="template-model">
              <form-parser
                class="form-parser"
                :ui="ui"
                :json="code"
              ></form-parser>
            </div>
          </div>
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
import FormParser from "../../form-parser";

export default {
  name: "PopupPreview",
  components: { FormParser },
  props: {
    code: Array,
  },
  data() {
    return {
      tabActive: "data", // 选中tab
      ui: "vant", // 生成模板用那个ui
    };
  },
  computed: {
    // 当前展示的是否json数据
    isJsonData() {
      return this.tabActive === "data";
    },
    // 根据code中的json数据生成的 vue template
    tamplateCode() {
      return `      <template>
            <form-parser
                class="form-parser"
                ui="${this.ui}"
                :json="json"
            ></form-parser>
      </template>`;
    },
  },
  methods: {
    // tab切换
    handelPreviewChange(val) {
      this.tabActive = val;
    },
    // 关闭
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
  .tab-template-box {
    display: flex;
    overflow: hidden;
    > .template-code {
      flex: 1;
    }
    > .template-model {
      width: 320px;
      height: 569px;
      background-color: #f3f3f3;
      padding: 20px;
      > .form-parser {
        border-radius: 10px;
        overflow: hidden;
      }
    }
  }
}
</style>