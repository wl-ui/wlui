/**
 * @name 内置数据
 * @time 2020-10-14
 */

// 表单元素列表
const formElementList = [{ key: "element-input", name: "单行输入框", icon: "wl-danhangshuru" },
{ key: "element-textarea", name: "多行输入框", icon: "wl-duohangshuru" },
{ key: "element-numberInput", name: "数字输入框", icon: "wl-shuzishuru" },
{ key: "element-password", name: "密码输入框", icon: "wl-mima" },
{ key: "element-radio", name: "单选框", icon: "wl-danxuan" },
{ key: "element-checkbox", name: "多选框", icon: "wl-xuanzhong" },
{ key: "element-date", name: "日期", icon: "wl-riqi1" },
{ key: "element-dateRange", name: "日期区间", icon: "wl-riqi" },
{ key: "element-money", name: "金额", icon: "wl-jine" },
{ key: "element-file", name: "附件", icon: "wl-fujian" },
{ key: "element-ID", name: "身份证", icon: "wl-shenfenzheng" },
{ key: "element-phone", name: "电话", icon: "wl-shouji" },
{ key: "element-contact", name: "联系人", icon: "wl-ren" },
{ key: "element-department", name: "部门", icon: "wl-bumen" },
{ key: "element-site", name: "地点", icon: "wl-icon-" },
{ key: "element-area", name: "省市县", icon: "wl-Group-" },
{ key: "element-caption", name: "说明文字", icon: "wl-shuoming" },
{ key: "element-rate", name: "评分", icon: "wl-pingfen" },
{ key: "element-formula", name: "计算公式", icon: "wl-jisuangongshi" },
{ key: "element-invoice", name: "电子发票", icon: "wl-fapiaoguanli" },
{ key: "element-associatedForm", name: "关联审批单", icon: "wl-guanlianchanpin" },
{ key: "element-table", name: "表格", icon: "wl-biaoge" },
{ key: "element-account", name: "收款账户", icon: "wl-zhanghuxinxi" },] // 表单元素列表

// 表单套件列表
const formElementGroupList = [
  {
    key: "group-mode-1",
    name: "假勤模块",
    children: [
      { key: "group-mode-1-1", name: "假休套件", icon: "wl-qingjia1" },
      { key: "group-mode-1-2", name: "加班套件", icon: "wl-jiaban" },
      { key: "group-mode-1-3", name: "补卡套件", icon: "wl-buqia" },
      {
        key: "group-mode-1-4",
        name: "外出套件",
        icon: "wl-waichuchucha",
      },
      { key: "group-mode-1-5", name: "出差套件", icon: "wl-chucha" },
      {
        key: "group-mode-1-6",
        name: "换班套件",
        icon: "wl-huanbanhuhuan",
      },
    ],
  },
  {
    key: "group-mode-2",
    name: "人事模块",
    children: [
      { key: "group-mode-2-1", name: "转正套件", icon: "wl-zhuanzheng" },
      { key: "group-mode-2-2", name: "离职套件", icon: "wl-lizhi" },
      { key: "group-mode-2-3", name: "调岗套件", icon: "wl-tiaogang" },
      {
        key: "group-mode-2-4",
        name: "入职套件",
        icon: "wl-flow-entry",
      },
      { key: "group-mode-2-5", name: "交接套件", icon: "wl-jiaojie" },
    ],
  },
  {
    key: "group-mode-3",
    name: "财务模块",
    children: [
      { key: "group-mode-3-1", name: "报销套件", icon: "wl-baoxiao" },
      { key: "group-mode-3-2", name: "收款套件", icon: "wl-shoukuan" },
      { key: "group-mode-3-3", name: "付款套件", icon: "wl-fukuan" },
    ],
  },
  {
    key: "group-mode-4",
    name: "行政模块",
    children: [
      { key: "group-mode-4-1", name: "采购套件", icon: "wl-icon-cart" },
      { key: "group-mode-4-2", name: "领用套件", icon: "wl-lingyong" },
    ],
  },
] // 表单套件列表

export {
  formElementList, // 表单元素列表
  formElementGroupList, // 表单套件列表
}