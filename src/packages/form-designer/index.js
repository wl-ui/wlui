import WlFormDesigner from "./main.vue";

WlFormDesigner.install = function (Vue) {
  Vue.component(WlFormDesigner.name, WlFormDesigner);
};

export default WlFormDesigner;
