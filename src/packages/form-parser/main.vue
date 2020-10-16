<template>
  <div class="wl-form-parser">
    <keep-alive>
      <component :is="currentComponent" :code="code"></component>
    </keep-alive>
  </div>
</template>

<script>
/**
 * @name 表单解释器
 * @author weilan
 * @time 2020-10-16
 * @description 配合表单生成器导出的json数据使用，暂不支持自定义数据结构
 */
import UiVant from "./components/ui-vant";
import UiElement from "./components/ui-element";

export default {
  name: "WlFormParser",
  components: { UiVant, UiElement },
  props: {
    ui: {
      type: String,
      default: "element",
      required: true,
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return ["element", "vant"].indexOf(value) !== -1;
      },
    },
    code: {
      type: Array,
      default: () => {
        return [
          {
            label: "多行输入框",
            placeholder: "请输入",
            isRequired: false,
            defaultValue: null,
            diyClass: "",
            diyRegular: "",
            diyErrMsg: "",
            _key: "element-2",
            _icon: "wl-duohangshuru",
            _id: "f2df1184-2da1-433d-97f4-1f43e58916e9",
          },
          {
            label: "单选框",
            placeholder: "请选择",
            isRequired: false,
            defaultValue: null,
            diyClass: "",
            diyRegular: "",
            diyErrMsg: "",
            _key: "element-4",
            _icon: "wl-danxuan",
            _id: "e3f1f0cd-bf89-4cc6-b872-17ba4df700f5",
            options: [
              {
                name: "选项1",
                iconMove: "wl-tuozhuai",
                iconDel: "wl-shanchu",
                id: "1560708f-b9b0-43ed-80fd-e4fc8758a901",
              },
            ],
          },
          {
            label: "日期",
            placeholder: "请选择",
            isRequired: false,
            defaultValue: null,
            diyClass: "",
            diyRegular: "",
            diyErrMsg: "",
            _key: "element-6",
            _icon: "wl-riqi1",
            _id: "40cba02e-c8f4-4e28-b2d6-1dc29e70a269",
            dateType: "",
            autoDuration: false,
            durationLabel: "时长",
          },
          {
            label: "金额",
            placeholder: "请输入金额",
            isRequired: false,
            defaultValue: null,
            diyClass: "",
            diyRegular: "",
            diyErrMsg: "",
            _key: "element-10",
            _icon: "wl-jine",
            _id: "af4b3d13-d68c-4ac2-90b7-dcfab50c2fd4",
            autoCapital: true,
          },
          {
            label: "身份证",
            placeholder: "请输入",
            isRequired: false,
            defaultValue: null,
            diyClass: "",
            diyRegular: "",
            diyErrMsg: "",
            _key: "element-12",
            _icon: "wl-shenfenzheng",
            _id: "f991257a-b3ea-4e80-a811-285394fe4c58",
          },
        ];
      },
    },
  },
  computed: {
    currentComponent() {
      return `Ui${this.ui.replace(this.ui[0], this.ui[0].toUpperCase())}`;
    },
  },
};
</script>