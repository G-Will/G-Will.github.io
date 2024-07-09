import { defineConfig } from "vitepress";

import { nav, sidebar } from "./sidebar/routers";
import viteConfig from "./vite.config";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  // head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  title: "学习笔记",
  srcDir: "docs",
  description: "based on VitePress",
  markdown: {
    lineNumbers: true,
    image: {
      // 默认禁用图片懒加载
      lazyLoading: true,
    },
    container: {
      tipLabel: "提示",
      warningLabel: "警告",
      dangerLabel: "危险",
      infoLabel: "信息",
      detailsLabel: "点击展开",
    },
  },
  // lastUpdated: true,
  themeConfig: {
    logo: "/favicon.ico",
    // 将显示从 `<h2>` 到 `<h4>` 的所有标题
    outline: [2, 4],
    // https://vitepress.dev/reference/default-theme-config
    nav,
    // 使用浏览器内索引进行模糊全文搜索
    search: {
      provider: "local",
    },
    outlineTitle: "目录导航",
    sidebar,
    socialLinks: [
      { icon: "github", link: "https://github.com/G-Will/G-Will.github.io" },
    ],
    footer: {
      message:
        'Released under the <a target="_blank" href="https://github.com/G-Will/G-Will.github.io/master/LICENSE">MIT License</a>.',
      copyright:
        'Copyright © 2024-present <a href="https://github.com/G-Will">G-Will</a>',
    },
  },
  // 文字配置
  transformHead({ assets }) {
    const myFontFile = assets.find((file) => /DingTalkJinBuTi\.\w+\.ttf$/);
    if (myFontFile) {
      return [
        [
          "link",
          {
            rel: "preload",
            href: myFontFile,
            as: "font",
            type: "font/ttf",
            crossorigin: "",
          },
        ],
      ];
    }
  },
  vite: viteConfig,
});
