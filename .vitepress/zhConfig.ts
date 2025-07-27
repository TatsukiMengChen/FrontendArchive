const zhConfig = {
  title: "洞察前端",
  description: "探索前端开发的无限可能",
  themeConfig: {
    nav: [{ text: "首页", link: "/zh" }],
    sidebar: [
      {
        text: "学习路线",
        items: [{ text: "总览", link: "/zh/roadMap" }],
      },
      {
        text: "必备技能",
        items: [{ text: "总览", link: "/zh/skills/" }],
      },
      {
        text: "实用库",
        items: [{ text: "组件库", link: "/zh/libs/components" }],
      },
      {
        text: "实用工具",
        link: "/zh/tools/",
      },
    ],
    outline: [2, 3] as [number, number], // 修复类型错误
    socialLinks: [
      {
        icon: "github",
        link: "https://github/TatsukiMengChen/FrontendArchive",
      },
    ],
  },
  locales: {
    root: {
      label: "简体中文",
      lang: "zh-CN",
      link: "/zh/",
      themeConfig: {
        nav: [{ text: "首页", link: "/zh" }],
      },
    },
  },
};

export default zhConfig;
