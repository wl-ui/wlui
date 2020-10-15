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
                class="form-item-box"
                v-for="item in formJson"
                :key="item._id"
                @click="handleFormJsonClick(item)"
              >
                <el-form-item
                  :label="item.label"
                  class="draggable-item"
                  :class="{ 'field-active': activeId == item._id }"
                >
                  <p>{{ item.placeholder }}</p>
                  <p
                    v-if="formElementType.money.includes(item._key)"
                    class="form-item-des"
                  >
                    大写
                  </p>
                  <p
                    v-else-if="formElementType.date.includes(item._key)"
                    class="form-item-des"
                  >
                    {{ item.durationLabel }}
                  </p>
                </el-form-item>
                <p class="item-del-box" @click.stop="handleFormJsonDel(item)">
                  <i class="iconfont wl-shanchu"></i>
                </p>
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
import { autoPositionAfterDelete } from "wl-core";

export default {
  name: "FormView",
  components: { draggable },
  props: {
    formElementType: Object, // 表单元素类型，用于显示不同字段信息
  },
  data() {
    return {
      formJson: [], // 表单json数据
      activeId: null, //当前选中数据id
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
          this.activeId = val._id;
        }
      });
    },
    // 表单字段选中
    handleFormJsonClick(item) {
      Bus.$emit("form-field-click", item);
      this.activeId = item?._id;
    },
    // 表单字段删除
    handleFormJsonDel(item) {
      const theNext = autoPositionAfterDelete(
        this.formJson,
        "_id",
        item._id,
        this.activeId
      );
      this.formJson = theNext.nextData;
      this.handleFormJsonClick(theNext.nextItem);
    },
    // 回显时重置整个json
    setJson(data) {
      this.formJson = data;
      if (data.length) {
        this.handleFormJsonClick(data[0]);
      }
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
  .form-item-box {
    position: relative;
    &:hover {
      > .item-del-box {
        display: block;
      }
      .draggable-item {
        border-color: $color;
      }
    }
    > .item-del-box {
      display: none;
      position: absolute;
      top: 6px;
      right: $padding;
      padding: 2px $padding 0;
      background: $form-bg;
      border-radius: 15px;
      line-height: 22px;
      cursor: pointer;
      transition: all 0.3s;
    }
  }
  .draggable-item {
    padding: 4px $padding;
    background: $form-element-bg;
    cursor: pointer;
    border-left: 5px solid $form-element-bg;

    .form-item-des {
      color: $form-label-color;
      font-size: 12px;
    }
  }
  .field-active {
    border-color: $color;
  }
}
</style>