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
import WlTableDynamic from "./table-dynamic";
import WlBimViewer from "./bim-viewer";
import WlExplorer from "./explorer";
import WlGantt from "./gantt";

const components = [WlSelect, WlSelectTree, WlTransferTree, WlAddress, WlAdd, WlInput, WlContainer, WlContextMenu, WlFadeIn, WlScroll, WlTableDynamic, WlBimViewer, WlExplorer, WlGantt];

const install = function (Vue) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export {
  WlSelect, WlSelectTree, WlTransferTree, WlAddress, WlAdd, WlInput, WlContainer, WlContextMenu, WlFadeIn, WlScroll, WlTableDynamic, WlBimViewer, WlExplorer, WlGantt
}

export default {
  install,
  WlSelect, WlSelectTree, WlTransferTree, WlAddress, WlAdd, WlInput, WlContainer, WlContextMenu, WlFadeIn, WlScroll, WlTableDynamic, WlBimViewer, WlExplorer, WlGantt
};

