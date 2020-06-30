module.exports = {
  title: 'wlui中文文档',
  description: '精美易用的前端复杂组件解决方案 🖖',
  themeConfig: {
    nav: [
      { text: '主页', link: '/' },
      { text: '组件', link: '/components/guide/installation' },
      { text: '专栏', link: '/aiticle/' },
      { text: 'GitHub', link: 'https://github.com/wl-ui/wlui' },
    ],
    sidebar: {
      '/components/': [
        {
          title: '开发指南',
          children: [
            'guide/installation',
            'guide/quickstart',
          ]
        },
        {
          title: '基础组件',
          children: [
            'base/select',
            'base/select-tree',
            'base/address'
          ]
        },
        {
          title: '复杂组件',
          children: [
            'complex/elplorer',
            'complex/gantt'
          ]
        },
      ],
      '/aiticle/': [
        {
          title: 'Vue3+Koa2+qiankun2打造微前端后台管理系统',
          collapsable: true,
          children: [
          ]
        },
      ]
    }
  }
}