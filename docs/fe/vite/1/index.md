# Vite 的实现原理，确实很巧妙

> 原文：https://mp.weixin.qq.com/s/ejkfARh6hlOAUnw5Eadb6Q

![alt text](imgs/image.png)

那它是如何做到这么快的呢？

因为 vite 在开发环境并不做打包。

我们创建个 vite 项目：

```bash
npx create-vite
```

![alt text](imgs/image-1.png)

安装依赖，然后把服务跑起来：

```bash
npm install
npm run dev
```

![alt text](imgs/image-2.png)

浏览器访问下：

本地是 main.tsx 引入了 App.tsx，并且还有 react 和 react-dom/client 的依赖：

![alt text](imgs/image-3.png)

用 devtools 看下：

![alt text](imgs/image-4.png)

可以看到，main.tsx、App.tsx 还有 react 和 react-dom/client 的依赖都是直接引入的，做了编译，但是并没有打包。

这是基于浏览器的 type 为 module 的 script 实现的：

![alt text](imgs/image-5.png)

我们加一个 index2.html：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React + TS</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="aaa.js"></script>
  </body>
</html>
```

然后添加 aaa.js

```js
import { add } from "./bbb.js";

console.log(add(1, 2));
```

bbb.js

```js
export function add(a, b) {
  return a + b;
}
```

起个静态服务访问下：

```bash
npx http-server
```

![alt text](imgs/image-6.png)

浏览器访问下 `http://localhost:8080/index2.html`

![alt text](imgs/image-7.png)
![alt text](imgs/image-8.png)
可以看到，aaa 和 bbb 模块都被下载并执行了。

当然，我们没有做编译，如果有 ts 或者 jsx 的语法，需要做一次编译。

那我们是不是可以起个服务器，请求的时候根据 url 找到对应的文件，编译之后返回呢？

没错，如果你这样想了，那你也可以写一个 vite。

vite 在开发环境下就是起了一个做编译的服务器，根据请求的 URL 找到对应的模块做编译之后返回。

当你执行 npm run dev 的时候：

![alt text](imgs/image-9.png)
vite 会跑一个开发服务：

![alt text](imgs/image-10.png)
这个开发服务是基于 connect 实现的，vite 给它加了很多中间件来处理请求：

![alt text](imgs/image-11.png)
当你请求 index.html 的时候，它会通过 ast 遍历，找到其中所有的 script：

![alt text](imgs/image-12.png)
然后提前对这些文件做编译：

![alt text](imgs/image-13.png)
编译是通过不同插件完成的：

![alt text](imgs/image-14.png)
插件就是一个对象，它导出了 transform 方法的话，就会在 transform 的时候被调用。

比如图中有 css 插件来编译 css、esbuild 插件来编译 ts/js 等。

每个插件都会判断下，只处理对应的资源：

![alt text](imgs/image-15.png)
![alt text](imgs/image-16.png)
比如 vite:esbuild 插件，就是对 js/ts 做编译，然后返回编译后的 code 和 sourcemap：

![alt text](imgs/image-17.png)
还有个 import-anlysis 插件，在 esbuild 完成编译之后，分析模块依赖，继续处理其它模块的 transform：

![alt text](imgs/image-18.png)
![alt text](imgs/image-19.png)
这样，浏览器只要访问了 index.html，那么你依赖的所有的 js 模块，就都给你编译了。

![alt text](imgs/image-20.png)
这就是 vite 为什么叫 no bundle 方案，它只是基于浏览器的 module import，在请求的时候对模块做下编译。

但不知道大家有没有想过一个问题：

浏览器支持 es module 的 import，那如果 node_modules 下的依赖有用 commonjs 模块规范的代码呢？

是不是就不行了。

这种就需要提前做一些转换，把 commonjs 转成 esm。

还有一个问题，如果每个模块都是请求时编译，那向 lodash-es 这种包，它可是有几百个模块的 import 呢：

![alt text](imgs/image-21.png)
这样跑起来，一个 node_modules 下的包就有几百个请求，依赖多了以后，很容易就几千个请求。

这谁受的了？

所以我们要提前处理下，不但要把 node_modules 下代码的 commonjs 提前转成 es module，还有提前对这些包做一次打包，变成一个 es module 模块。

所以，vite 加了一个预构建功能 pre bunle。

在启动完开发服务器的时候，就马上对 node_modules 下的代码做打包，这个也叫 deps optimize，依赖优化。

![alt text](imgs/image-22.png)
![alt text](imgs/image-23.png)
如何优化呢？

首先，扫描出所有的依赖来：

![alt text](imgs/image-24.png)
这一步是用 esbuild 做的：

![alt text](imgs/image-25.png)
esbuild.context 和 esbuild.build 差不多的功能。

可以看到，用 esbuild 对入口 index.html 开始做打包，输出格式为 esm，但是 write 为 false，不写入磁盘。

有同学说，esbuild 支持 import html 么？

这里用到了一个 esbuild scan plugin：

![alt text](imgs/image-26.png)
vite 实现的，用来记录依赖的：

![alt text](imgs/image-27.png)
它会在每种模块路径解析的时候做处理，其中支持了 html 的处理。

这样用 esbuild 处理完一遍，是不是就知道预打包哪些包了？

![alt text](imgs/image-28.png)
我们在项目里引入下 dayjs 和 lodash-es 再试下：

![alt text](imgs/image-29.png)
![alt text](imgs/image-30.png)
![alt text](imgs/image-31.png)
依然给你一个不少的给分析了出来：

![alt text](imgs/image-32.png)
接下来调用 esbuild 打包就行。

![alt text](imgs/image-33.png)
但打包之前呢，还会对路径做扁平化，比如 react-dom/client 变成 react-dom_client

效果就是打包之后文件是平级的。

![alt text](imgs/image-34.png)
从每个依赖包作为入口打包，输出 esm 格式的模块到 node_modules/.vite 下。

![alt text](imgs/image-35.png)
之后还会生成一个 \_metadata.json 文件写入 node_modules/.vite 下：

![alt text](imgs/image-36.png)
这样的：

![alt text](imgs/image-37.png)
这个 metadata.json 是干啥的呢？

看到这几个 hash 了么

vite 会在这些预打包的模块后加一个 query 字符串带上 hash，然后用 max-age 强缓存：

![alt text](imgs/image-38.png)
因为这些依赖一般不会变，不用每次都请求，强缓存就行。

但是在 lock 文件变化或者 config 有一些变化的时候也需要重新 build：

![alt text](imgs/image-39.png)
重新预编译，然后在资源请求时带上新的 query，这样就让强缓存失效了。

这里强缓存的用法很典型，面试官们可以记一下作为考点。

这样，vite 的开发服务的请求时编译，再就是预构建就都完成了。

有的同学可能会问，为啥预构建要用 esbuild 呢？

原因就是快：

![alt text](imgs/image-40.png)
vite 在 dev 时的核心原理我们理清了，但是在 build 的时候总要打包的吧。

那肯定，在 build 的时候 vite 会用 rollup 做打包。

那不会导致开发时的代码和生产环境不一致么？

不会。

能做到这一点也很巧妙。

看下 build 时的 rollup 插件：

![alt text](imgs/image-41.png)
是不是似曾相识？

对比下 dev 时跑的 vite 插件：

![alt text](imgs/image-42.png)
没错，vite 插件时兼容 rollup 插件的，这样在开发的时候，在生产环境打包的时候，都可以用同样的插件对代码做 transform 等处理。

处理用的插件都一样，又怎么会开发和生产不一致呢？

这也是 vite 的巧妙之处。

在 dev 的时候，它实现了一个 PluginContainer，用和 rollup 插件同样的参数来调用 vite 插件：

![alt text](imgs/image-43.png)
然后 build 的时候，可以把这些插件直接作为 rollup 插件用。

![alt text](imgs/image-44.png)
对了，vite 在 dev 的时候还支持热更新，也就是本地改了代码能够自动同步到浏览器。

这个就是基于 chokidar 监听了本地文件变动：

![alt text](imgs/image-45.png)
然后在模块变动的时候通过 websocket 通知浏览器端：

![alt text](imgs/image-46.png)
浏览器端接受之后做相应处理就好了：

![alt text](imgs/image-47.png)
我们改下 Aaa.tsx，可以看到浏览器端收到了 update 的 ws 消息：

![alt text](imgs/image-48.png)
收到消息之后，把模块换成这个新的，加上 timestamp 重新请求就好了：
![alt text](imgs/image-49.png)

## 总结

今天我们分析了下 vite 的实现原理。

它是基于浏览器的 type 为 module 的 script 可以直接下载 es module 模块实现的。

做了一个开发服务，根据请求的 url 来对模块做编译，调用 vite 插件来做不同模块的 transform。

但是 node_modules 下的文件有的包是 commonjs 的，并且可能有很多个模块，这时 vite 做了预构建也叫 deps optimize。

它用 esbuild 分析依赖，然后用 esbuild 打包成 esm 的包之后输出到 node_modules/.vite 下，并生成了一个 metadata.json 来记录 hash。

浏览器里用 max-age 强缓存这些预打包的模块，但是带了 hash 的 query。这样当重新 build 的时候，可以通过修改 query 来触发更新。

在开发时通过 connect 起了一个服务器，调用 vite 插件来做 transform，并且对 node_modules 下的模块做了预构建，用 esbuild 打包。

在生产环境用 rollup 来打包，因为 vite 插件兼容了 rollup 插件，所以也是用同样的插件来处理，这样能保证开发和生产环境代码一致。

此外，vite 还基于 chokidar 和 websocket 来实现了模块热更新。

这就是 vite 的实现原理。

回想下，不管是基于浏览器 es module import 实现的编译服务，基于 esbuild 做的依赖预构建，基于 hash query 做的强缓存和缓存更新，还是兼容 rollup 的 vite 插件可以在开发服务和 rollup 里同时跑，这些功能实现都挺巧妙的。
