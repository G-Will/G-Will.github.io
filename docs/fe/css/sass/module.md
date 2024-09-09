# SASS 中的模块化开发

与 js、java 等一样，CSS 中也是支持模块化的。

## CSS 的模块化

语法如下：

```CSS
@import url("xxx");
```

上述这种是运行时态的。即，这个代码是可以在浏览器运行的，浏览器运行到这一行，会加载对应的 CSS。

## SASS 中的模块化

假如有全局 SCSS 文件 common.scss 如下：

```SCSS
$color: #f40;

a {
  color: inherit;
  text-decoration: none;
}

@mixin xxx
```

分为两种：运行时模块化、编译时模块化。

### @import

承担了两种。既可以做运行时模块化，又可以做编译时模块化。

#### @import 运行时模块化：

```SCSS
@import url('./common.css');
@import url('./common.scss');
```

编译后

```CSS
@import url('./common.css');
@import url('./common.scss');
```

编译后的代码和编译前一模一样。说明这个是运行时的模块化，是交给浏览器解析运行的，SASS 不对其做特殊处理。

#### @import 编译时模块化：

但是我们很多时候希望使用编译时的模块化。那什么是编译时的模块化呢？即，SCSS 在编译时，发现使用了 `@import './xxx.scss'` 的方式导入 SCSS，它就会把对应的文件中的样式直接“复制”过来，这样我们在导入的文件中也可以使用对应的变量、mixin 等。

在 foo.scss 中引入 `common.scss`：

```SCSS
@import './common.scss';

.foo {
  color: $color;
}
```

编译后：

```CSS
a {
  color: inherit;
  text-decoration: none;
}

.foo {
  color: #f40;
}

```

但是，SCSS 中的编译时模块化写法即将过时了，将来可能会被移除掉，只保持 CSS 中的运行时的模块化写法，即`@import url('xxx')`

原因有 点：

1. 容易造成混淆。`@import url('xxx')`、`@import 'xxx'` 运行时和编译时的写法太过相似，可读性不好
2. 会造成污染。导入的多个 SCSS 中存在同名变量时（$color），后边导入的文件中的变量会覆盖前边导入文件中的变量。

```SCSS
@import './common.scss';
@import './var.scss';

```

3. 没有私有。模块化是需要私有变量的，但是 `@import` 做不到私有。

### @use

解决 `@import` 的问题。

专门给 SCSS 做编译时的模块化的。从语法层面就做了区分，不容易和 `@import url('xxx')` 混淆。

怎么解决的：

1. 解决混淆。从名字做了区分。
2. 解决污染。通过模块名访问。

```SCSS
@use './common.scss';
@use './var.scss';

.foo {
  color: common.$color;
}

```

也支持指定导入模块的名字：

```SCSS
@use './a/common.scss' as common;
@use './b/common.scss' as var;

.foo {
  color: common.$color;
  border: var.$border;
}

```

3. 解决私有。在变量前添加 \_ 即可。

```SCSS
a {
  color: inherit;
  text-decoration: none;
}

$_color: #f40; // 私有变量

```

```SCSS
@use './common.scss' as common;

.foo {
  color: common.$_color; // 报错，不能访问
}

```
