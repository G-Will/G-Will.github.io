# 用 Sass 简化媒体查询

简化前：

```css
.header {
  width: 100%;
}

@media (min-width: 320px) and (max-width: 480px) {
  .header {
    width: 50px;
  }
}

@media (min-width: 481px) and (max-width: 768px) {
  .header {
    width: 60px;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .header {
    width: 80px;
  }
}

@media (min-width: 1025px) and (max-width: 1200px) {
  .header {
    width: 100px;
  }
}

@media (min-width: 1201px) {
  .header {
    width: 120px;
  }
}
```

简化后：

```scss
// 在公共 scss 中定义好数据 （只需做一次）
$breakpoints: (
    "phone": (
      320px,
      480px,
    ),
    "pad": (
      481px,
      768px,
    ),
    "notebook": (
      769px,
      1024px,
    ),
    "desktop": (
      1025px,
      1200px,
    ),
    "tv": 1201px,
  )
  @mixin responseTo($breakname) {
  $bp: map-get($breakpoints, $breakname);
  @if type-of($bp) == "list" {
    @media (min-width: nth($bp, 1)) and (max-width: nth($bp, 2)) {
      // @content：调用方 "{}" 中的内容
      @content;
    }
  } @else {
    @media (min-width: $bp) {
      @content;
    }
  }
}

// 使用
.header {
  width: 100%;
  @include responseTo("phone") {
    height: 50px;
  }
  @include responseTo("pad") {
    height: 60px;
  }
  @include responseTo("notebook") {
    height: 80px;
  }
  @include responseTo("desktop") {
    height: 100px;
  }
  @include responseTo("tv") {
    height: 120px;
  }
}
```
