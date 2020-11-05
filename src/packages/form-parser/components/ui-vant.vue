<template>
  <div class="ui-want">
    <van-form
      validate-first
      ref="vant-form"
      @submit="onSubmit"
      @failed="onFailed"
    >
      <!-- 表单元素解析区 -->
      <div v-for="item of json" :key="item._id">
        <!-- 输入框型 -->
        <van-field
          v-if="formTypeInput.includes(item._key)"
          v-model="form[item.fieldKey]"
          :name="item._id"
          :label="item.label"
          :placeholder="item.placeholder"
          :rules="parseItemRules(item)"
          :type="parseItemType(item)"
        />
        <!-- 点击型 -->
        <van-field
          v-else-if="formTypeClick.includes(item._key)"
          v-model="form[item.fieldKey]"
          readonly
          clickable
          :name="item._id"
          :label="item.label"
          :placeholder="item.placeholder"
          @click="formDateClick(item)"
        />
        <!-- 日期区间 -->
        <template v-else-if="formElementType.dateRange == item._key">
          <van-field
            v-model="form[item.fieldKey]"
            readonly
            clickable
            :name="item._id"
            :label="item.label"
            :placeholder="item.placeholder"
            @click="formDateClick(item)"
          />
          <van-field
            v-model="form[item.fieldKey2]"
            readonly
            clickable
            :name="item._id"
            :label="item.label2"
            :placeholder="item.placeholder"
            @click="formDateClick(item, item.fieldKey2)"
          />
          <van-field
            v-if="item.autoDuration"
            :label="durationLabel(item)"
            :value="dateInfo.duration"
            disabled
          />
        </template>
        <!-- 插槽型 -->
        <van-field v-else :name="item._id" :label="item.label">
          <template #input>
            <!-- 评分 -->
            <van-rate
              v-if="formElementType.rate === item._key"
              v-model="form[item.fieldKey]"
              :count="item.scoringSystem"
              color="#ffd21e"
            />
            <!-- 附件 -->
            <van-uploader
              v-if="formElementType.file === item._key"
              v-model="form[item.fieldKey]"
            />
          </template>
        </van-field>
      </div>
      <!-- 表单元素插槽区 -->
      <slot></slot>
      <!-- 表单元素提交按钮 -->
      <div class="submit-box" v-if="submitBtn">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
    <!-- 日期选择 弹出 -->
    <van-popup
      v-model="layout.popup"
      position="bottom"
      :style="{ height: '40%' }"
    >
      <van-datetime-picker
        v-if="formElementType.date.includes(layout.el)"
        v-model="dateInfo.currentDate"
        :title="dateInfo.title"
        :type="dateInfo.type"
        @confirm="handleDateConfirm"
        @cancel="handlePopupCancel"
      />
      <!-- 选项型 -->
      <div
        class="popup-select-box"
        v-else-if="formElementType.select.includes(layout.el)"
      >
        <!-- 单选框 -->
        <van-radio-group
          v-if="formElementType.radio === layout.el"
          v-model="selectInfo.value"
          @change="handelRadioChange"
        >
          <van-radio
            v-for="checkbox of selectInfo.options"
            :key="checkbox.id"
            :name="checkbox.name"
            checked-color="#07c160"
            class="popup-select-item"
            >{{ checkbox.name }}</van-radio
          >
        </van-radio-group>
        <!-- 多选框 -->
        <van-checkbox-group
          v-else
          v-model="selectInfo.values"
          @change="handelCheckboxChange"
        >
          <van-checkbox
            v-for="checkbox of selectInfo.options"
            :key="checkbox.id"
            :name="checkbox.name"
            checked-color="#07c160"
            class="popup-select-item"
            >{{ checkbox.name }}</van-checkbox
          >
        </van-checkbox-group>
      </div>
      <!-- 地区选择 -->
      <van-area
        v-else
        v-model="areaInfo.value"
        :title="areaInfo.title"
        :area-list="areaList"
        @confirm="handleAreaConfirm"
        @cancel="handlePopupCancel"
      />
    </van-popup>
  </div>
</template>

<script>
import { Time } from "wl-core";
import areaList from "../assets/js/area-data";

export default {
  name: "UiVant",
  props: {
    json: Array,
    submitBtn: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      layout: { popup: false, el: "" },
      areaList, // 省市县插件地址数据
      form: {}, // 表单集
      formTypeInput: [
        "element-input",
        "element-textarea",
        "element-phone",
        "element-numberInput",
        "element-password",
      ], // 输入框型的表单元素
      formTypeClick: [
        "element-date",
        "element-area",
        "element-checkbox",
        "element-radio",
      ], // 需点击事件触发其他操作的表单元素
      formElementType: {
        select: ["element-radio", "element-checkbox"],
        checkbox: "element-checkbox",
        radio: "element-radio",
        date: ["element-date", "element-dateRange"],
        dateRange: "element-dateRange",
        rate: "element-rate", // 评分
        file: "element-file", // 文件
      }, // 表单元素类型，用于显示不同字段信息
      dateInfo: {
        currentDate: new Date(),
        value: "",
        value2: "",
        duration: "", // 时长
        unit: "", // 单位 d天 h时
        type: "",
        title: "", // 标题
        key: "",
        format: "", // 格式
        act: null, // 当前是开始时间还是结束时间选择 1开始2结束
      }, // 日期弹出信息
      areaInfo: {
        value: "",
        title: "",
        areaList: {},
        key: "",
      }, // 地址弹出信息
      selectInfo: {
        key: "",
        value: null,
        values: [],
        options: [],
      }, // 选择弹出信息
    };
  },
  methods: {
    // 验证成功表单提交
    onSubmit(val) {
      this.$emit("submit", val, this.getForm());
    },
    // 验证失败
    onFailed(err) {
      this.$emit("failed", err);
    },
    // 点击型表单元素
    formDateClick(item, key) {
      this.layout.popup = true;
      this.layout.el = item._key;
      if (this.formElementType.date.includes(item._key)) {
        // 记录插件时间类型和计算时长时的单位
        if (item.dateType == "YYYY-MM-DD") {
          this.dateInfo.type = "date";
          this.dateInfo.unit = "d";
        } else {
          this.dateInfo.type = "datetime";
          this.dateInfo.unit = "h";
        }
        // 处理时间段两个点的逻辑
        if (key) {
          this.dateInfo.key = key;
          this.dateInfo.act = 2;
        } else {
          this.dateInfo.key = item.fieldKey;
          this.dateInfo.act = 1;
        }
        this.dateInfo.format = item.dateType;
      } else if (this.formElementType.select.includes(item._key)) {
        this.selectInfo.key = item.fieldKey;
        this.selectInfo.options = item.options;
      } else {
        this.areaInfo.key = item.fieldKey;
      }
    },
    // 日期选择完毕时间
    handleDateConfirm(val) {
      let format = Time.quickFormat(val, this.dateInfo.format);
      this.form[this.dateInfo.key] = format;
      if (this.dateInfo.act === 2) {
        this.dateInfo.value2 = val;
        // 计算时长
        if (this.dateInfo.value) {
          const timer = new Time(val);
          this.dateInfo.duration = timer.diff(
            this.dateInfo.value,
            this.dateInfo.unit
          );
        }
      } else {
        this.dateInfo.value = val;
      }
      this.handlePopupCancel();
    },
    // 单选选择完毕
    handelRadioChange(val) {
      this.form[this.selectInfo.key] = val;
    },
    // 多选选择完毕
    handelCheckboxChange(val) {
      this.form[this.selectInfo.key] = val.join();
    },
    // 省市县选择完毕
    handleAreaConfirm(val) {
      let [{ name: a }, { name: b }, { name: c }] = val;
      this.form[this.areaInfo.key] = `${a} ${b} ${c}`;
      this.handlePopupCancel();
    },
    // 关闭弹出框
    handlePopupCancel() {
      this.layout.popup = false;
    },
    // 解析表单校验规则
    parseItemRules(item) {
      let rules = [];
      if (item.isRequired) {
        rules.push({ required: true });
      }
      if (item.diyRegular) {
        rules.push({ pattern: item.diyRegular, message: item.diyErrMsg });
      }
      return rules;
    },
    // 解析表单元素类型
    parseItemType(item) {
      let type = "";
      switch (item._key) {
        case "element-textarea":
          type = "textarea";
          break;
        case "element-phone":
          type = "tel";
          break;
        case "element-numberInput":
        case "element-money":
          type = "number";
          break;
        case "element-password":
          type = "password";
          break;
        default:
          type = "";
      }
      return type;
    },
    // 自动计算时长单位
    durationLabel(item) {
      return item.dateType == "YYYY-MM-DD"
        ? `${item.durationLabel}(天)`
        : `${item.durationLabel}(时)`;
    },
    // --------------------------------------- 方法 --------------------------------
    // 获取表单内容
    getForm() {
      let submit_form_json = [];
      for (const iterator of this.json) {
        submit_form_json.push({
          label: iterator.label,
          key: iterator.fieldKey,
          value: this.form[iterator.fieldKey] || null,
        });
        if (iterator._key == this.formElementType.dateRange) {
          submit_form_json.push({
            label: iterator.label2,
            key: iterator.fieldKey2,
            value: this.form[iterator.fieldKey2] || null,
          });
        }
      }
      return submit_form_json;
    },
    // 提交
    submit() {
      this.$refs["vant-form"].submit();
    },
    // 验证表单，支持传入name来验证单个表单项
    validate(name) {
      this.$refs["vant-form"].validate(name);
    },
    // 重置表单项的验证提示，支持传入name来重置单个表单项
    resetValidation(name) {
      this.$refs["vant-form"].resetValidation(name);
    },
    // 滚动到对应表单项的位置，默认滚动到顶部，第二个参数传 false 可滚动至底部
    scrollToField(name, alignToTop) {
      this.$refs["vant-form"].scrollToField(name, alignToTop);
    },
  },
};
</script>

<style lang="scss">
.ui-want {
  .submit-box {
    margin-top: 16px;
  }
  .popup-select-box {
    padding: 20px;
    .popup-select-item {
      margin-bottom: 15px;
    }
  }
}
</style>