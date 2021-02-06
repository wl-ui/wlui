import Select from "./select";
import SelectTree from "./select-tree";
import TransferTree from "./transfer-tree";
import Address from "./address";
import Add from "./add";
import Input from "./input";
import Container from "./container";
import ContextMenu from "./context-menu";
import FadeIn from "./fade-in";
import Scroll from "./scroll";
import Table from "./table";
import TableDynamic from "./table-dynamic";
import BimViewer from "./bim-viewer";
import Explorer from "./explorer";
import Gantt from "./gantt";
import Tree from "./tree";
import FormDesigner from "./form-designer";
import FormParser from "./form-parser";
import "@/assets/base/clear.min.css"

const components = [Select, SelectTree, TransferTree, Address, Add, Input, Container, ContextMenu, FadeIn, Scroll, Table, TableDynamic, BimViewer, Explorer, Gantt, Tree, FormDesigner, FormParser];

const install = function (Vue) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export {
  Select, SelectTree, TransferTree, Address, Add, Input, Container, ContextMenu, FadeIn, Scroll, Table, TableDynamic, BimViewer, Explorer, Gantt, Tree, FormDesigner, FormParser
}

export default {
  install,
  Select, SelectTree, TransferTree, Address, Add, Input, Container, ContextMenu, FadeIn, Scroll, Table, TableDynamic, BimViewer, Explorer, Gantt, Tree, FormDesigner, FormParser
};

