# 使用 SASS 实现主题切换

**主题切换的原理**：主题切换实际上**切换的是 html 的自定义属性**。点击切换按钮时，将 html 的 data-theme 属性切换为 light 或者 dark，并且针对 `html[data-theme="light"]`、`html[data-theme="dark"]` 应用对应的主题样式。

主题切换实际上有**两种常见的做法**：

- css 变量
- sass

这里介绍 sass 的做法。

```scss
// 定义一份配置
$themes: (
  light: (
    textColor: #333,
    bgColor: #fff,
  ),
  dark: (
    textColor: #fff,
    bgColor: #333,
  ),
);

$themeMap: ();

@mixin useTheme() {
  @each $key, $value in $themes {
    $themeMap: $value !global; // !global：声明 $themeMap 是全局变量中的 $themeMap，将全局变量中的 $themeMap 赋值为 $value
    html[data-theme="#{$key}"] & {
      @content;
    }
  }
}

@function getVar($paramName) {
  @return map-get($themeMap, $paramName);
}

// 使用
.item {
  font-size: 16px;
  @include useTheme {
    color: getVar(textColor);
    background: getVar(bgColor);
  }
}
```
