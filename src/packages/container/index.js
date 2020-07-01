import WlContainer from "./main.vue";

WlContainer.install = function (Vue) {
  Vue.component(WlContainer.name, WlContainer);
};

export default WlContainer;