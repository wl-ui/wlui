import Vue from "vue";
import ElementUi from "./element"
import WlUi from "./wlui"

ElementUi.concat(WlUi).forEach(i => Vue.use(i))
