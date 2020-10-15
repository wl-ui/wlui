<template>
  <!-- 表单字段描述组件 -->
  <div class="designer-body-info" v-if="title.key">
    <!-- 头部 -->
    <h3 class="from-info-title">
      <i class="iconfont from-info-icon" :class="title.icon"></i>
      <span>{{ title.name }}</span>
    </h3>
    <!-- 字段信息描述 -->
    <div class="form-info-body">
      <el-scrollbar class="form-info-scroll">
        <el-form ref="form" :model="form" label-position="top">
          <!-- 公共信息 -->
          <el-form-item label="标题">
            <el-input v-model="form.label"></el-input>
          </el-form-item>
          <el-form-item label="提示文字">
            <el-input v-model="form.placeholder"></el-input>
          </el-form-item>
          <el-form-item label="是否必填">
            <el-switch v-model="form.isRequired" active-color="#13ce66">
            </el-switch>
          </el-form-item>
          <!-- 数字型字段信息 -->
          <el-form-item
            label="单位"
            v-if="title.key === formElementType.number"
          >
            <el-input v-model="form.unit" placeholder="请输入"></el-input>
          </el-form-item>
          <!-- 选项型字段信息 -->
          <el-form-item
            label="选项"
            v-if="formElementType.checkbox.includes(title.key)"
          >
            <draggable
              class="draggable-box"
              v-model="form.options"
              group="people"
            >
              <transition-group tag="ul">
                <li
                  class="checkbox-item"
                  v-for="item in form.options"
                  :key="item.id"
                >
                  <div class="checkbox-icon">
                    <i
                      class="iconfont draggable-icon"
                      :class="item.iconMove"
                    ></i>
                  </div>
                  <div class="checkbox-ipt">
                    <el-input v-model="item.name"></el-input>
                  </div>
                  <div class="checkbox-icon" @click="handleDelOption(item)">
                    <i
                      class="iconfont draggable-icon"
                      :class="item.iconDel"
                    ></i>
                  </div>
                </li>
              </transition-group>
            </draggable>
            <p class="checkbox-add-box">
              <span @click="addCheckboxOptions()">添加选项</span>
            </p>
          </el-form-item>
          <!-- 日期型字段信息 -->
          <template v-if="formElementType.date.includes(title.key)">
            <el-form-item label="日期类型">
              <el-select v-model="form.dateType" class="width-full">
                <el-option
                  v-for="item of dateTypes"
                  :key="item.id"
                  :value="item.format"
                  :label="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="自动计算时长">
              <el-switch v-model="form.autoDuration" active-color="#13ce66">
              </el-switch>
            </el-form-item>
            <el-form-item label="时长标题" v-if="form.autoDuration">
              <el-input v-model="form.durationLabel"> </el-input>
            </el-form-item>
          </template>
          <!-- 金额型字段信息 -->
          <el-form-item
            label="自动显示大写"
            v-if="formElementType.money.includes(title.key)"
          >
            <el-switch v-model="form.autoCapital" active-color="#13ce66">
            </el-switch>
          </el-form-item>
          <el-form-item label="默认值">
            <el-input v-model="form.defaultValue"></el-input>
          </el-form-item>
          <el-form-item label="自定义Class">
            <el-input v-model="form.diyClass"></el-input>
          </el-form-item>
          <el-form-item label="自定义校验规则">
            <el-input v-model="form.diyClass"></el-input>
          </el-form-item>
          <el-form-item label="自定义错误提示语">
            <el-input v-model="form.diyClass"></el-input>
          </el-form-item>
        </el-form>
      </el-scrollbar>
    </div>
  </div>
  <!-- 未选择表单元素时 -->
  <div class="designer-body-info designer-info-none" v-else>请选择表单元素</div>
</template>

<script>
import Bus from "../assets/js/bus";
import draggable from "vuedraggable";
import { createGuid } from "../assets/js/util";

export default {
  name: "FormInfo",
  components: { draggable },
  props: {
    formElementType: Object, // 表单元素类型，用于显示不同字段信息
  },
  data() {
    return {
      title: {
        icon: "",
        name: "",
        key: "",
      }, // 标题信息
      form: {}, // 表单信息
      publicTemplate: {
        label: "", // 标题
        placeholder: "请输入", // 提示
        isRequired: false, // 必填
        defaultValue: null, // 默认值
        diyClass: "", // 自定义类名
      }, // 字段元素公共模板
      unmberTemplate: {
        unit: "", // 单位
        placeholder: "请输入数字", // 提示
      }, // 数字输入框元素模板
      checkboxTemplate: {
        options: [],
        placeholder: "请选择", // 提示
      }, // checkbox模板
      optionsModel: {
        name: "选项1",
        iconMove: "wl-tuozhuai",
        iconDel: "wl-shanchu",
      }, // checkbox选项模板
      dateTemplate: {
        dateType: "", // 日期类型
        autoDuration: false, // 自动计算时长
        placeholder: "请选择", // 提示
        durationLabel: "时长", // 时长
      }, // 日期模板
      dateTypes: [
        { id: "dateType1", format: "YYYY-MM-DD", name: "年-月-日" },
        { id: "dateType2", format: "YYYY-MM-DD hh:mm", name: "年-月-日 时:分" },
      ], // 日期类型
      moneyTemplate: {
        placeholder: "请输入金额", // 提示
        autoCapital: true, // 自动显示大写
      }, // 金额类型
    };
  },
  watch: {
    form: {
      handler(val) {
        this.sendFieldInfoUpdate(val);
      },
      deep: true,
    },
  },
  created() {
    this.listenFromElementSelect();
    this.listenViewFieldSelect();
  },
  methods: {
    // 监听表单元素选中
    listenFromElementSelect() {
      Bus.$on("form-element-select", (val) => {
        // 获取当前字段元素信息
        this.title = val;
        this.checkboxTemplate.options = [
          {
            ...this.optionsModel,
            id: createGuid(),
          },
        ];
        // 组装当前字段元素表单
        let unmberTemplate = {};
        let checkboxTemplate = {};
        let dateTemplate = {};
        let moneyTemplate = {};
        if (this.formElementType.number === val.key) {
          unmberTemplate = this.unmberTemplate;
        } else if (this.formElementType.checkbox.includes(val.key)) {
          checkboxTemplate = this.checkboxTemplate;
        } else if (this.formElementType.date.includes(val.key)) {
          dateTemplate = this.dateTemplate;
        } else if (this.formElementType.money.includes(val.key)) {
          moneyTemplate = this.moneyTemplate;
        }

        this.form = {
          ...this.publicTemplate,
          label: val.name,
          _key: val.key,
          _icon: val.icon,
          _id: val.id,
          ...unmberTemplate,
          ...checkboxTemplate,
          ...dateTemplate,
          ...moneyTemplate,
        };
      });
    },
    // 监听表单预览选中字段元素
    listenViewFieldSelect() {
      Bus.$on("form-field-click", (val) => {
        if (val) {
          this.form = { ...val };
          this.title = { icon: val._icon, name: val.label, key: val._key };
        } else {
          this.title = { key: null };
        }
      });
    },
    // 发送字段信息维护事件
    sendFieldInfoUpdate(val) {
      Bus.$emit("field-info-update", val);
    },
    // 增加checkbox选项
    addCheckboxOptions() {
      this.form.options.push({
        ...this.optionsModel,
        id: createGuid(),
      });
    },
    // 删除checkbox选项
    handleDelOption(item) {
      this.form.options = this.form.options.filter((i) => i.id != item.id);
    },
  },
};
</script>

<style lang="scss">
@import "../assets/css/variable.scss";

.designer-body-info {
  display: flex;
  flex-direction: column;
  border-left: 1px solid $form-element-bg-hover;
  width: 300px;

  > .from-info-title {
    padding: 6px $padding;
    font-size: 14px;
    background-color: $form-element-bg;
    color: $titlt-color;

    > .from-info-icon {
      margin-right: 6px;
    }
  }

  > .form-info-body {
    flex: 1;
    padding: $padding;
    overflow: hidden;
    > .form-info-scroll {
      height: 100%;
    }

    .checkbox-item {
      display: flex;
      > .checkbox-icon {
        width: 30px;
        text-align: center;
        font-size: 18px;
      }
      > .checkbox-ipt {
        flex: 1;
      }
    }
    .checkbox-item + .checkbox-item {
      margin-top: $padding;
    }

    .checkbox-add-box {
      padding-left: $padding;
      color: $titlt-color;
      font-size: 12px;
      cursor: pointer;
    }
  }
}

.designer-info-none {
  padding-top: 10%;
  text-align: center;
}
</style>