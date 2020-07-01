import WlBimViewer from "./main.vue";

WlBimViewer.install = function(Vue) {
  Vue.component(WlBimViewer.name, WlBimViewer);
};

export default WlBimViewer;
