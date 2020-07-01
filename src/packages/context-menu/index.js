import WlContextMenu from "./main.vue";

WlContextMenu.install = function (Vue) {
  Vue.component(WlContextMenu.name, WlContextMenu);
};

export default WlContextMenu;