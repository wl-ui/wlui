import WlExplorer from "./main.vue";
WlExplorer.install = function(Vue) {
  Vue.component(WlExplorer.name, WlExplorer);
};
export default WlExplorer;