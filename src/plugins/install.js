import Vue from "vue";
import ElementUi from "./element"
// import WeilanUi from "./wlui"
import WeilanUi from "weilan-ui"
import "weilan-ui/weilan-ui.css"
ElementUi.concat(WeilanUi).forEach(i => Vue.use(i))
