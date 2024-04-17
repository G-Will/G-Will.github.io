import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  title: "学习笔记",
  description: "学习笔记 based on VitePress",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      // { text: "Examples", link: "/markdown-examples" },
    ],

    sidebar: [
      {
        text: "Examples",
        items: [
          { text: "Markdown Examples", link: "/markdown-examples" },
          { text: "Runtime API Examples", link: "/api-examples" },
        ],
      },
      {
        text: "CommonJS",
        items: [{ text: "CommonJS的本质", link: "fe/commonjs" }],
      },
      {
        text: "WebAPIs",
        items: [
          {
            text: "Intersection Observer",
            link: "fe/web-api/intersection-observer",
          },
        ],
      },
      {
        text: "SASS",
        items: [
          { text: "用 Sass 简化媒体查询", link: "fe/sass/media-query" },
          { text: "SASS 中的模块化开发", link: "fe/sass/module" },
        ],
      },
      {
        text: "webpack",
        items: [
          {
            text: "webpack 中的 code spliting 是如何动态加载 chunk 的？",
            link: "fe/webpack/code-split",
          },
        ],
      },
      {
        text: "其他",
        items: [
          { text: "数字动画函数", link: "fe/other/number-animation" },
          { text: "task-pro", link: "fe/other/task-pro" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/G-Will/G-Will.github.io" },
    ],
  },
});
