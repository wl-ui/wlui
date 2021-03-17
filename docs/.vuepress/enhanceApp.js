import ElementUi from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import WeilanUi from "../../src/packages/index"
export default ({
    Vue,
}) => {
    Vue.use(ElementUi)
    Vue.use(WeilanUi)
}