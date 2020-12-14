<template>
  <!-- uview库的表单解释器 -->
  <view class="ui-uview">
    <!-- 表单部分 -->
    <u-form :model="form" ref="u-form" class="u-form" label-width="180">
      <div v-for="item of json" :key="item.id">
        <u-form-item
          :label="item.label"
          :props="item.fieldKey"
          v-if="item._key != formElementType.dateRange"
        >
          <!-- 输入框型元素 -->
          <u-input
            v-if="formTypeInput.includes(item._key)"
            v-model="form[item.fieldKey]"
            :placeholder="item.placeholder"
            :type="parseItemType(item)"
          />
          <!-- 省市县元素 -->
          <u-input
            v-else-if="formTypeClick.includes(item._key)"
            v-model="form[item.fieldKey]"
            type="select"
            :placeholder="item.placeholder"
            @click="formElementClick(item)"
          />
          <!-- <u-upload ref="uUpload" :action="action" :auto-upload="false" ></u-upload> -->
        </u-form-item>
        <!-- 日期范围 -->
        <template v-else-if="formElementType.dateRange == item._key">
          <u-form-item :label="item.label" :props="item.fieldKey">
            <u-input
              type="select"
              v-model="form[item.fieldKey]"
              :placeholder="item.placeholder"
              @click="formElementClick(item)"
            />
          </u-form-item>
          <u-form-item :label="item.label2" :props="item.fieldKey">
            <u-input
              type="select"
              v-model="form[item.fieldKey2]"
              :placeholder="item.placeholder"
              @click="formElementClick(item, item.fieldKey2)"
            />
          </u-form-item>
          <u-form-item
            v-if="item.autoDuration"
            :label="durationLabel(item)"
            :props="item.fieldKey"
          >
            <u-input v-model="dateInfo.duration" disabled />
          </u-form-item>
        </template>
      </div>
    </u-form>
    <!-- 弹出区 -->
    <!-- 时间-地区选择 -->
    <u-picker
      v-model="picker.show"
      :mode="picker.mode"
      :params="picker.params"
      @confirm="handlePickerConfirm"
    ></u-picker>
    <!-- 单选-多选选择 -->
    <u-popup v-model="popup.show" mode="bottom" length="40%" border-radius="10">
      <view class="a-form-popup">
        <u-checkbox-group
          wrap
          v-if="popup.mode == formElementType.checkbox"
          @change="handelCheckboxChange"
        >
          <u-checkbox
            v-for="checkbox in popup.options"
            v-model="checkbox.checked"
            :key="checkbox.id"
            :name="checkbox.name"
          >
            {{ checkbox.name }}
          </u-checkbox>
        </u-checkbox-group>
        <u-radio-group v-else v-model="form[tsKey]" wrap>
          <u-radio
            v-for="radio in popup.options"
            :key="radio.id"
            :name="radio.name"
          >
            {{ radio.name }}
          </u-radio>
        </u-radio-group>
      </view>
    </u-popup>
  </view>
</template>

<script>
import { Time } from "wl-core";

export default {
  name: "UiUview",
  props: { json: Array },
  data() {
    return {
      picker: {
        show: false,
        mode: "",
        params: {
          year: true,
          month: true,
          day: true,
          hour: false,
          minute: false,
          second: false,
          province: true,
          city: true,
          area: true,
        },
      }, // 选择器管理
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
        select: ["element-checkbox", "element-radio"],
        checkbox: "element-checkbox",
        radio: "element-radio",
        date: ["element-date", "element-dateRange"],
        dateRange: "element-dateRange",
        rate: "element-rate", // 评分
        file: "element-file", // 文件
        area: "element-area", // 省市县
      }, // 表单元素类型
      form: {}, // 表单字段
      rules: {}, // 验证字段
      tsKey: null, // 需要分段式操作的字段辅助信息
      dateInfo: {
        duration: "", // 时长
        value: "", // 开始时间记录
        value2: "", // 结束时间记录
        key: "",
        act: "", // 当前是开始还是结束
        format: "", // 时间单位
      }, // 日期类型的辅助信息字段
      popup: { show: false, mode: "", options: [] }, // 弹出框管理
    };
  },
  watch: {
    json: {
      handler(val) {
        // 处理表单验证规则
        val.forEach((i) => {
          this.rules[i.fieldKey] = [];
          let message = i.diyErrMsg || i.placeholder;
          // 必填项
          if (i.isRequired) {
            this.rules[i.fieldKey].push({
              required: true,
              trigger: "blur",
              message,
            });
          }
          // 自定义校验正则
          if (i.diyRegular) {
            this.rules[i.fieldKey].push({
              pattern: i.diyRegular,
              trigger: "blur",
              message,
            });
          }
        });
        this.$refs["u-form"]?.setRules(this.rules);
      },
      immediate: true,
    },
  },
  methods: {
    // 需要点击操作的表单元素
    formElementClick(item, key) {
      this.tsKey = key ? key : item.fieldKey;
      // 日期类型的点击事件
      if (this.formElementType.date.includes(item._key)) {
        this.picker.show = true;
        this.picker.mode = "time";
        if (item.dateType == "YYYY-MM-DD") {
          this.picker.params.hour = false;
          this.picker.params.minute = false;
          this.dateInfo.unit = "d";
        } else {
          this.picker.params.hour = true;
          this.picker.params.minute = true;
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
        // 选择类型
        this.popup.show = true;
        this.popup.mode = item._key;
        this.popup.options = item.options;
      } else if (this.formElementType.area == item._key) {
        // 地区类型
        this.picker.show = true;
        this.picker.mode = "region";
      }
    },
    // 选择器确定
    handlePickerConfirm(val) {
      // this.form[this.tsKey] = val;
      if (this.picker.mode == "time") {
        this.form[this.tsKey] = this.picker.params.hour
          ? `${val.year}-${val.month}-${val.day} ${val.hour}:${val.minute}`
          : `${val.year}-${val.month}-${val.day}`;

        if (this.dateInfo.act === 2) {
          this.dateInfo.value2 = this.form[this.tsKey];
          // 计算时长
          if (this.dateInfo.value) {
            const timer = new Time(this.form[this.tsKey]);
            this.dateInfo.duration = timer.diff(
              this.dateInfo.value,
              this.dateInfo.unit
            );
          }
        } else {
          this.dateInfo.value = this.form[this.tsKey];
        }
      } else {
        this.form[
          this.tsKey
        ] = `${val.province.label} ${val.city.label} ${val.area.label}`;
      }
    },
    // 多选框选中
    handelCheckboxChange() {
      this.form[this.tsKey] = val;
    },
    // 解析表单元素类型
    parseItemType(item) {
      let type = "";
      switch (item._key) {
        case "element-textarea":
          type = "textarea";
          break;
        case "element-phone":
          type = "number";
          break;
        case "element-numberInput":
        case "element-money":
          type = "digit";
          break;
        case "element-password":
          type = "password";
          break;
        default:
          type = "text";
      }
      return type;
    },
    // 自动计算时长单位
    durationLabel(item) {
      return item.dateType == "YYYY-MM-DD"
        ? `${item.durationLabel}(天)`
        : `${item.durationLabel}(时)`;
    },
    // ----------------------------- 方法 ----------------------------
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
    // 表单验证
    submit(successCB, errorCb) {
      this.$refs["u-form"].validate((valid) => {
        if (valid) {
          successCB?.(this.form);
        } else {
          errorCb?.();
        }
      });
    },
  },
};
</script>

<style lang="scss">
$bg-color: #fff;
$padding: 20rpx;
.ui-uview {
  > .u-form {
    background-color: $bg-color;
  }
  .u-form-item {
    padding-left: $padding;
    padding-right: $padding;
  }
  .a-form-popup {
    padding: 20rpx;
  }
}
</style>