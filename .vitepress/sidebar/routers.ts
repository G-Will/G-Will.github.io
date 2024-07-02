import type { DefaultTheme } from "vitepress";

export const nav: DefaultTheme.NavItem[] = [
  { text: "前端", link: "/fe/main", activeMatch: "/fe" },
  // { text: "Examples", link: "/markdown-examples" },
];

// export const sidebar: DefaultTheme.Sidebar = [
//   /*  {
//     text: "Examples",
//     items: [
//       { text: "Runtime API Examples", link: "/api-examples" },
//     ],
//   }, */
//   {
//     text: "文档书写提示",
//     items: [
//       { text: "vitepress markdown 语法", link: "fe/home/markdown-examples" },
//     ],
//   },
//   {
//     text: "CommonJS",
//     collapsed: true,
//     items: [{ text: "CommonJS的本质", link: "fe/commonjs" }],
//   },
//   {
//     text: "TypeScript",
//     base: "fe/ts/",
//     collapsed: true,
//     items: [
//       { text: "看过最简洁的 TSConfig 介绍", link: "1" },
//       { text: "TS 中的函数重载", link: "override" },
//       { text: "GetOptionals", link: "get-optionals" },
//     ],
//   },
//   {
//     text: "WebAPIs",
//     base: "fe/web-api/",
//     collapsed: true,
//     items: [
//       {
//         text: "Intersection Observer",
//         link: "intersection-observer",
//       },
//       {
//         text: "Clipboard API",
//         link: "clipboard",
//       },
//     ],
//   },
//   {
//     text: "SASS",
//     base: "fe/sass/",
//     collapsed: true,
//     items: [
//       { text: "用 Sass 简化媒体查询", link: "media-query" },
//       { text: "SASS 中的模块化开发", link: "module" },
//       { text: "使用 SASS 实现主题切换", link: "theme" },
//     ],
//   },
//   {
//     text: "构建工具",
//     collapsed: true,
//     items: [
//       {
//         text: "Webpack",
//         base: "fe/webpack/",
//         items: [
//           {
//             text: "webpack 中的 code spliting 是如何动态加载 chunk 的？",
//             link: "code-split",
//           },
//         ],
//       },
//       {
//         text: "Vite",
//         base: "fe/vite/",
//         items: [
//           {
//             text: "Vite 的实现原理，确实很巧妙",
//             link: "1/index",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     text: "性能优化",
//     base: "fe/optimization/",
//     collapsed: true,
//     items: [
//       {
//         text: "JS 分片任务的高阶函数封装",
//         link: "1",
//       },
//     ],
//   },
//   {
//     text: "正则表达式",
//     base: "fe/regex/",
//     collapsed: true,
//     items: [
//       {
//         text: "一些案例",
//         link: "index",
//       },
//     ],
//   },
//   {
//     text: "网络",
//     base: "fe/network/",
//     collapsed: true,
//     items: [
//       {
//         text: "三张图让你了解 async 和 defer 的区别",
//         link: "async-defer/index",
//       },
//       {
//         text: "跨域方案的抉择",
//         link: "cross-origin/index",
//       },
//     ],
//   },
//   {
//     text: "其他",
//     collapsed: true,
//     base: "fe/other/",
//     items: [
//       { text: "数字动画函数", link: "number-animation" },
//       { text: "task-pro", link: "task-pro" },
//       {
//         text: "跨标签页的数据通信",
//         link: "cross-tab-data-sharing",
//       },
//       {
//         text: "React 计数器",
//         link: "counter",
//       },
//       {
//         text: "JS Label 语法",
//         link: "js-label",
//       },
//       {
//         text: "手写设计模式",
//         link: "design-patterns",
//       },
//       {
//         text: "模拟 call 的实现",
//         link: "call",
//       },
//       {
//         text: "模拟 bind 的实现",
//         link: "bind/index",
//       },
//       {
//         text: "极简精妙的 JS 代码片段",
//         link: "js-utils",
//       },
//       {
//         text: "FLIP 动画方案",
//         link: "flip",
//       },
//       {
//         text: "消除异步的传染性",
//         link: "solve-async-infection/index",
//       },
//     ],
//   },
// ];

export const sidebar: DefaultTheme.Sidebar = {
  "/fe/": [
    {
      text: "文档书写提示",
      base: "/fe/home/",
      collapsed: false,
      items: [{ text: "vitepress markdown 语法", link: "markdown-examples" }],
    },
    {
      text: "模块化",
      base: "/fe/modularization/",
      collapsed: true,
      items: [
        {
          text: "CommonJS",
          base: "/fe/modularization/commonjs/",
          items: [{ text: "CommonJS的本质", link: "/" }],
        },
      ],
    },
    {
      text: "TypeScript",
      base: "/fe/ts/",
      collapsed: true,
      items: [
        { text: "看过最简洁的 TSConfig 介绍", link: "1" },
        { text: "TS 中的函数重载", link: "override" },
        { text: "GetOptionals", link: "get-optionals" },
      ],
    },
    {
      text: "WebAPIs",
      base: "/fe/web-api/",
      collapsed: true,
      items: [
        {
          text: "Intersection Observer",
          link: "intersection-observer",
        },
        {
          text: "Clipboard API",
          link: "clipboard",
        },
      ],
    },
    {
      text: "SASS",
      base: "/fe/sass/",
      collapsed: true,
      items: [
        { text: "用 Sass 简化媒体查询", link: "media-query" },
        { text: "SASS 中的模块化开发", link: "module" },
        { text: "使用 SASS 实现主题切换", link: "theme" },
      ],
    },
    {
      text: "构建工具",
      collapsed: true,
      items: [
        {
          text: "Webpack",
          base: "/fe/webpack/",
          items: [
            {
              text: "webpack 中的 code spliting 是如何动态加载 chunk 的？",
              link: "code-split",
            },
          ],
        },
        {
          text: "Vite",
          base: "/fe/vite/",
          items: [
            {
              text: "Vite 的实现原理，确实很巧妙",
              link: "1/",
            },
          ],
        },
      ],
    },
    {
      text: "性能优化",
      base: "/fe/optimization/",
      collapsed: true,
      items: [
        {
          text: "JS 分片任务的高阶函数封装",
          link: "1",
        },
      ],
    },
    {
      text: "正则表达式",
      base: "/fe/regex/",
      collapsed: true,
      items: [
        {
          text: "一些案例",
          link: "1",
        },
      ],
    },
    {
      text: "网络",
      base: "/fe/network/",
      collapsed: true,
      items: [
        {
          text: "三张图让你了解 async 和 defer 的区别",
          link: "async-defer/",
        },
        {
          text: "跨域方案的抉择",
          link: "cross-origin/",
        },
      ],
    },
    {
      text: "其他",
      collapsed: true,
      base: "/fe/other/",
      items: [
        { text: "数字动画函数", link: "number-animation" },
        { text: "task-pro", link: "task-pro" },
        {
          text: "跨标签页的数据通信",
          link: "cross-tab-data-sharing",
        },
        {
          text: "React 计数器",
          link: "counter",
        },
        {
          text: "JS Label 语法",
          link: "js-label",
        },
        {
          text: "手写设计模式",
          link: "design-patterns",
        },
        {
          text: "模拟 call 的实现",
          link: "call",
        },
        {
          text: "模拟 bind 的实现",
          link: "bind/",
        },
        {
          text: "极简精妙的 JS 代码片段",
          link: "js-utils",
        },
        {
          text: "FLIP 动画方案",
          link: "flip",
        },
        {
          text: "消除异步的传染性",
          link: "solve-async-infection/",
        },
        {
          text: "复杂动画控制",
          link: "complex-animation/",
        },
        {
          text: "闪光边框",
          link: "border-light/",
        },
      ],
    },
  ],
};
