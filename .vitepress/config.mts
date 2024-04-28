import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  title: "学习笔记",
  description: "based on VitePress",
  markdown: {
    lineNumbers: true,
    image: {
      // 默认禁用图片懒加载
      lazyLoading: true,
    },
  },
  // lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      // { text: "Examples", link: "/markdown-examples" },
    ],
    // 使用浏览器内索引进行模糊全文搜索
    search: {
      provider: "local",
    },

    sidebar: [
      /*  {
        text: "Examples",
        items: [
          { text: "Markdown Examples", link: "/markdown-examples" },
          { text: "Runtime API Examples", link: "/api-examples" },
        ],
      }, */
      {
        text: "CommonJS",
        items: [{ text: "CommonJS的本质", link: "fe/commonjs" }],
      },
      {
        text: "TypeScript",
        items: [{ text: "看过最简洁的 TSConfig 介绍", link: "fe/ts/1" }],
      },
      {
        text: "WebAPIs",
        items: [
          {
            text: "Intersection Observer",
            link: "fe/web-api/intersection-observer",
          },
          {
            text: "Clipboard API",
            link: "fe/web-api/clipboard",
          },
        ],
      },
      {
        text: "SASS",
        items: [
          { text: "用 Sass 简化媒体查询", link: "fe/sass/media-query" },
          { text: "SASS 中的模块化开发", link: "fe/sass/module" },
          { text: "使用 SASS 实现主题切换", link: "fe/sass/theme" },
        ],
      },
      {
        text: "构建工具",
        items: [
          {
            text: "Webpack",
            items: [
              {
                text: "webpack 中的 code spliting 是如何动态加载 chunk 的？",
                link: "fe/webpack/code-split",
              },
            ],
          },
          {
            text: "Vite",
            items: [
              {
                text: "Vite 的实现原理，确实很巧妙",
                link: "fe/vite/1/index",
              },
            ],
          },
        ],
      },
      {
        text: "正则表达式           ",
        items: [
          {
            text: "一些案例",
            link: "fe/regex/index",
          },
        ],
      },
      {
        text: "其他",
        items: [
          { text: "数字动画函数", link: "fe/other/number-animation" },
          { text: "task-pro", link: "fe/other/task-pro" },
          {
            text: "跨标签页的数据通信",
            link: "fe/other/cross-tab-data-sharing",
          },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/G-Will/G-Will.github.io" },
    ],
  },
});
