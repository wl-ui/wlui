import WlSelect from "./select";
import WlSelectTree from "./select-tree";
import WlTransferTree from "./transfer-tree";
import WlAddress from "./address";
import WlAdd from "./add";
import WlInput from "./input";
import WlContainer from "./container";
import WlContextMenu from "./context-menu";
import WlFadeIn from "./fade-in";
import WlScroll from "./scroll";
import WlTable from "./table";
import WlTableDynamic from "./table-dynamic";
import WlBimViewer from "./bim-viewer";
import WlExplorer from "./explorer";
import WlGantt from "./gantt";
import WlTree from "./tree";
import WlFormDesigner from "./form-designer";

const components = [WlSelect, WlSelectTree, WlTransferTree, WlAddress, WlAdd, WlInput, WlContainer, WlContextMenu, WlFadeIn, WlScroll, WlTable, WlTableDynamic, WlBimViewer, WlExplorer, WlGantt, WlTree, WlFormDesigner];

const install = function (Vue) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export {
  WlSelect, WlSelectTree, WlTransferTree, WlAddress, WlAdd, WlInput, WlContainer, WlContextMenu, WlFadeIn, WlScroll, WlTable, WlTableDynamic, WlBimViewer, WlExplorer, WlGantt, WlTree, WlFormDesigner
}

export default {
  install,
  WlSelect, WlSelectTree, WlTransferTree, WlAddress, WlAdd, WlInput, WlContainer, WlContextMenu, WlFadeIn, WlScroll, WlTable, WlTableDynamic, WlBimViewer, WlExplorer, WlGantt, WlTree, WlFormDesigner
};

