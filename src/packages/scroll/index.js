import WlScroll from "./main.vue";

WlScroll.install = function (Vue) {
  Vue.component(WlScroll.name, WlScroll);
};

export default WlScroll;