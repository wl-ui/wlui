import WlTree from "./main.vue";

WlTree.install = function (Vue) {
  Vue.component(WlTree.name, WlTree);
};

export default WlTree;