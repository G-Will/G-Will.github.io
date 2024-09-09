# ESModule 的工作原理

浏览器环境也支持 ES 模块。通过给 script 设置 `type=“module”` 属性即可。
工程化环境，如 webpack、vite 中也支持。

以下只讨论浏览器环境中的 ES 模块化解析和执行过程。

::: code-group

<<< @/fe/modularization/es-module/work-principle/main.js

<<< @/fe/modularization/es-module/work-principle/foo.js

<<< @/fe/modularization/es-module/work-principle/bar.js

## 模块解析

即， 把相关的 js 文件全部下载下来

1. 找到入口文件 `***/main.js`，(如果是相对路径，则会转为绝对路径)，然后开始下载
2. 下载完成后，会进入到该 js 文件中去看**顶层**的静态导入语句，并把它们提到整个代码的最前边
3. 递归的下载并且解析对应的 js。下载完成后，再进到它们的文件中去看静态导入语句，如果没有下载，则继续下载（下载过的就跳过，不再下载了）
4. 都下载完成后，开始下一步 ———— 模块的执行

> 静态导入语句只能写到顶层，不能写到循环和条件语句中

## 模块执行

1. 从入口文件开始执行，先进入到 `main.js`

`main.js`：
| | |
| ------- | ----- |
| | |

2. `main.js` 的第一行是 `import foo from './foo.js`，则进入 `foo.js`，`foo.js` 的第一行是 `import bar from './bar.js`，则又会进入 `bar.js`，`bar.js` 的第一行是 `console.log("bar");`，在控制台打印了一个 `bar`。接着，默认导出一个字符串 `bar`，生成一个表格，然后 `bar.js` 执行完成了。

`bar.js`：
| default | "bar" |
| ------- | ----- |
| | |

3. 然后回到 `foo.js`，`foo.js` 是通过 `import bar from './bar.js` 导入的 `bar.js`，这里的变量 `bar` 和 `bar.js` 的默认导出是**符号绑定**（用的同一块内存空间），打印出一个 `foo bar`。接着，`foo.js` 中也有一个默认导出，也会生成一个表格，然后 `foo.js` 执行完成了。

`foo.js`：

| default | "foo" |
| ------- | ----- |
|         |       |

4. 然后回到 `main.js` 中的下一行 `import bar from "./bar.js";`，因为 `bar.js` 已经运行过了，所以直接把 `bar.js` 表格中的内容直接取出来了。接着是一个动态导入，之前没下载过，所以先去下载解析。这里是异步的，所以主线程继续往后运行到 `console.log("main", foo, bar);` 打印对应的结果 `main foo bar`，然后 `main.js` 运行结束。
5. 等到动态的 js 下载完成后，继续进行模块的解析和执行，和刚刚的过程是一样的，然后导出的结果也会生成一个表格。然后执行 `import("./dynamic.js").then((m))` 回调，这里的 `m` 就是 `dynaic.js` 模块生成的表格。

`dynamic.js`：
| default | "dynamic" |
| ------- | --------- |
| | |

> 模块的导出会给模块生成一个表格，每个模块最终都会变成一个表格，表格中会记录模块导出的结果。**记录是为了方便缓存**，以后再次导入该模块时，就不会从头到尾运行了，而是从表格中取相应的结果进行返回。

[视频讲解](https://www.douyin.com/video/7385474101227392308)
