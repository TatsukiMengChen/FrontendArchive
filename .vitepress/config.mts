import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "洞察前端",
  description: "探索前端开发的无限可能",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/zh' },
    ],

    sidebar: [
      {
        text: '学习路线',
        items: [
          { text: '总览', link: '/zh/roadMap' }
        ]
      }
    ],

    outline: [2,3],

    socialLinks: [
      { icon: 'github', link: 'https://github/TatsukiMengChen/FrontendArchive' }
    ]
  },
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/zh/',
      themeConfig: {
        nav: [
          { text: '首页', link: '/zh' },
        ],
      }
    },
    en: {
      label: 'English',
      lang: 'en',
      link: '/en/',
      title: 'Frontend Archive',
      description: 'Explore the infinite possibilities of frontend development',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/en' },
        ],
        sidebar: [
          {
            text: 'Examples',
            items: [
              { text: 'Markdown Examples', link: '/en/markdown-examples' },
              { text: 'Runtime API Examples', link: '/en/api-examples' }
            ]
          }
        ]
      }
    }
  }
})