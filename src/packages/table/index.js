import WlTable from "./main.vue";

WlTable.install = function (Vue) {
  Vue.component(WlTable.name, WlTable);
};

export default WlTable;