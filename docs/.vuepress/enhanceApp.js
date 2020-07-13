import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import WeilanUi from "weilan-ui";
import 'weilan-ui/weilan-ui.css';
export default ({
  Vue
}) => {
  Vue.use(ElementUi)
  Vue.use(WeilanUi)
}