<template>
  <!-- 表单效果组件 -->
  <div class="designer-body-view">
    <div class="phone-outer-layer">
      <div class="phone-inner-layer">
        <el-scrollbar class="form-view-scroll">
          <el-form ref="form" label-width="100px" label-position="top">
            <draggable
              class="formview-draggable-box"
              v-model="formJson"
              group="formJson"
            >
              <div
                v-for="item in formJson"
                :key="item._id"
                @click="handleFormJsonClick(item)"
              >
                <el-form-item :label="item.label" class="draggable-item">
                  <p>{{ item.placeholder }}</p>
                </el-form-item>
              </div>
            </draggable>
          </el-form>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script>
import Bus from "../assets/js/bus";
import draggable from "vuedraggable";

export default {
  name: "FormView",
  components: { draggable },
  data() {
    return {
      formJson: [],
    };
  },
  created() {
    this.listenFieldInfoUpdate();
  },
  methods: {
    // 监听字段信息更新
    listenFieldInfoUpdate() {
      Bus.$on("field-info-update", (val) => {
        const theItemIdx = this.formJson.findIndex((i) => i._id === val._id);
        if (theItemIdx != -1) {
          this.formJson[theItemIdx] = Object.assign(
            this.formJson[theItemIdx],
            val
          );
        } else {
          this.formJson.push(val);
        }
      });
    },
    // 表单字段选中
    handleFormJsonClick(item) {
      Bus.$emit("form-field-click", item);
    },
  },
};
</script>

<style lang="scss">
@import "../assets/css/variable.scss";

.designer-body-view {
  flex: 1;
  overflow: auto;
  .el-form-item__label {
    padding: 0;
  }

  > .phone-outer-layer {
    margin: 30px auto;
    border: 1px solid $phone-border-color;
    background-color: $form-element-bg;
    width: 360px;
    height: 640px;
    padding: 10px;
    border-radius: 20px;
    box-sizing: border-box;
    > .phone-inner-layer {
      border: 1px solid $phone-border-color;
      height: 100%;
      border-radius: 14px;
      background: $form-bg;
      overflow: hidden;
      > .form-view-scroll {
        height: 100%;
      }
    }
  }
}

.formview-draggable-box {
  .draggable-item {
    padding: 4px $padding;
    background: $form-element-bg;
    cursor: pointer;
    border-left: 3px solid $form-element-bg;
  }
}
</style>