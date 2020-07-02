/**
 * 扩展 VuePress 应用
 */

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import WeilanUi from "../../lib/weilan-ui.common"
import "../../lib/weilan-ui.css"
// import 'weilan-ui/lib/css/weilan-ui.css'

export default ({
  Vue // VuePress 正在使用的 Vue 构造函数
}) => {
  // ...做一些其他的应用级别的优化
  Vue.use(Element)
  Vue.use(WeilanUi)
}