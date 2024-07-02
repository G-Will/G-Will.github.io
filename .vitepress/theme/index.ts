import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme-without-fonts";
import "element-plus/theme-chalk/dark/css-vars.css";

import MyLayout from "./layout.vue";

import "./custom.css";

import TypeText from "docs/fe/components/type-text/index.vue";
import PicViewer from "docs/fe/components/pic-viewer/index.vue";

export default {
  extends: DefaultTheme,
  Layout: MyLayout,
  enhanceApp({ app }) {
    app.component("TText", TypeText);
    app.component("PicViewer", PicViewer);
  },
} satisfies Theme;
