# 如何实现高度自动的过度

## 展示

<script setup>
import demo from "./index.vue"
import demo1 from "./1.vue"
import demo2 from "./2.vue"
import demo3 from "./3.vue"
</script>

<demo></demo>

因为 height 不是数值，所以过度不生效。

可以给 height、max-height 设置一个比较大的值，如 1000 px，但是这样会导致动画有延时。

::: code-group
<<< @/fe/css/height-transition/index.vue
:::

## 方法 1

方法：初始时 transform: scaleY(0)，hover 时 transform: scaleY(1)。
缺点：有压缩感，视觉效果不好。

<demo1></demo1>

::: code-group
<<< @/fe/css/height-transition/1.vue
:::

## 方法 2

方法：display: grid，初始时 grid-template-rows: 0fr（子元素需要设置 min-height: 0），hover 时 grid-template-rows: 1fr。

缺点：safari 支持不太好，最新版本才支持。

<demo2></demo2>

::: code-group
<<< @/fe/css/height-transition/2.vue
:::

## 方法 3

方法：js + Flip，效果完美

<demo3></demo3>

::: code-group
<<< @/fe/css/height-transition/3.vue
:::
