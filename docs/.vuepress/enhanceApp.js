import ElementUi from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import WeilanUi from "weilan-ui";
import 'weilan-ui/weilan-ui.css';
export default ({
  Vue,
  isServer
}) => {
  if (!isServer) {
    console.log(11);
    /* import('element-ui/lib/index.js').then(module => {
      Vue.use(module)
    })
    import('weilan-ui/weilan-ui.umd.min.js').then(module => {
      Vue.use(module)
    }) */
    Vue.use(ElementUi)
    Vue.use(WeilanUi)
  } else {
    console.log(13);

    Vue.use(ElementUi)
    Vue.use(WeilanUi)
  }

}