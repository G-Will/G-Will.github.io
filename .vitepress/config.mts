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
        text: "其他",
        items: [
          { text: "数字动画函数", link: "fe/other/number-animation" },
          { text: "task-pro", link: "fe/other/task-pro" },
          { text: "用 Sass 简化媒体查询", link: "fe/scss" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/G-Will/G-Will.github.io" },
    ],
  },
});
