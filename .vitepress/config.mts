import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "FrontendArchive",
  description: "A Comprehensive Frontend Resource Repository",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/zh' },
      { text: '示例', link: '/zh/markdown-examples' }
    ],

    sidebar: [
      {
        text: '示例',
        items: [
          { text: 'Markdown 示例', link: '/zh/markdown-examples' },
          { text: '运行时 API 示例', link: '/zh/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://TatsukiMengChen/FrontendArchive' }
    ]
  },
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      themeConfig: {
        nav: [
          { text: '首页', link: '/zh' },
          { text: '示例', link: '/zh/markdown-examples' }
        ],
        sidebar: [
          {
            text: '示例',
            items: [
              { text: 'Markdown 示例', link: '/zh/markdown-examples' },
              { text: '运行时 API 示例', link: '/zh/api-examples' }
            ]
          }
        ]
      }
    },
    en: {
      label: 'English',
      lang: 'en',
      link: '/en/',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/en' },
          { text: 'Examples', link: '/en/markdown-examples' }
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