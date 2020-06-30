import WlSelect from "./select";
import WlSelectTree from "./select-tree";
import WlTransferTree from "./transfer-tree";
import WlAddress from "./address";
import WlAdd from "./add";
import WlInput from "./input";

const components = [WlSelect, WlSelectTree, WlTransferTree, WlAddress, WlAdd, WlInput];

const install = function (Vue) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export {
  WlSelect, WlSelectTree, WlTransferTree, WlAddress, WlAdd, WlInput
}

export default {
  install,
  WlSelect, WlSelectTree, WlTransferTree, WlAddress, WlAdd, WlInput
};

