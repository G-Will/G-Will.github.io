# npm install xxxx --legacy-peer-deps 命令是什么？

在日常使用命令 `npm install / npm install XX` 下载依赖的操作中，我经常会遇到无法解析依赖树的问题（依赖冲突）：

但是每当遇到这种情况的时候，我用命令 `npm install --legacy-peer-deps` 就可以顺利进行下载操作。

这是为什么呢？带着好奇心，我去研究学习了一番 `npm install xxxx --legacy-peer-deps` 命令是什么？为什么可以解决下载时候产生的依赖冲突呢？（注：我本地当前正在使用的 npm 版本是 8.6.0）

## 什么是 `peerDependency`？

我们日常在前端项目开发过程中，见到最多的一定是 `package.json` 文件里的 `devDependencies`（用于在开发环境下依赖的模块）和 `dependencies`（无论开发环境还是生产环境都需要的依赖模块）这两个字段。

那么命令 `--legacy-peer-dep` 里的 `peerDependency` 是什么依赖呢？根据 `geeksforgeeks` 网站里的定义：

> Peer Dependencies: In `package.json` file, there is an object called as `peerDependencies` and it consists of all the packages that are exactly required in the project or to the person who is downloading and the version numbers should also be the same. That is the reason they were named as `peerDependencies`. The best example is ‘react’ which is common in every project to run similarly.

翻译一下就是说，在 `package.json` 文件中，存在一个叫做 `peerDependencies`（对等依赖关系）的对象，它包含了项目里需要的所有的包或则用户正在下载的版本号相同的所有的包（很绕，但意思就是对等依赖关系指定我们的包与某个特定版本的 npm 包兼容）；对等依赖关系最好的例子就是 `React`，一个声明式的创建用户界面的 JS 库。

那么我们为什么需要对等依赖关系呢？

假设我们现在有一个 HelloHWCloud 工程，已经在其根目录下的 `package.json` 文件中的 `dependencies` 字段里声明了 packageA 作为依赖，而其下面有两个项目 app_A 和 app_B，它们也依赖 packageA。如果我们用 `dependencies` 而不是 `peerDepenedencies` 来声明，那么 npm install 安装完项目之后的依赖结构如下图所示：

```js
├── HelloHWCloud
│ └── node_modules
│ ├── packageA
│ ├── app_A
│ │ └── nodule_modules
│ │ └── packageA
│ └── app_B
│ │ └── nodule_modules
│ │ └── packageA
```

从上图可以看出，packageA 依赖包被安装了 3 次，造成了 2 次安装冗余。

而如果采用 `peerDepenedency` 来下载，就可以避免这个核心依赖库被重复下载的问题。还是上面那个场景，我们在项目 app_A 和 app_B 的 package.json 文件里的 peerDependencies 字段声明一下核心依赖库 packageA，然后在根目录的 package.json 文件里的 `dependencies` 字段也声明一下 packageA。接着再执行 `npm install`，生成的依赖结构就会如下图所示：

```js
├── HelloHWCloud
│ └── node_modules
│ ├── packageA
│ ├── app_A
│ └── app_B
```

如上图所示，packageA 就只会被安装一次。因此，npm 从**版本 v7** 开始，install 就默认以 `peerDependencies` 的方式去下载了：

1. 如果用户在根目录的 `package.json` 文件里显式依赖了核心库，那么各个子项目里的 `peerDepenedencies` 声明就可以忽略
2. 如果用户没有显式依赖核心库，那么就按照子项目的 `peerDepenedencies` 中声明的版本将依赖安装到项目根目录里

而方式 2 就会导致一个问题：**用户依赖的包版本与各个子项目依赖的包版本相互不兼容，那么就会报错**（无法解析依赖树的问题（依赖冲突））让用户自行去修复，因而导致安装过程的中断。（因为是从 npm v7 引入的，因此 npm v3-v6 就不会发生这个错误）

## npm install xxxx --legacy-peer-deps 命令是什么？为什么可以解决下载时候产生的依赖冲突呢？

`npm install xxxx --legacy-peer-deps` 命令与其说是告诉 npm 要去干什么，不如说是告诉 npm 不要去干什么。

legacy 的意思：遗产/（软件或硬件）已过时但因使用范围广而难以替代的；而 `npm install xxxx --legacy-peer-deps` 命令用于绕过 `peerDependency` 里依赖的自动安装；它告诉 npm **忽略项目中引入的各个依赖模块之间依赖相同但版本不同的问题，以 npm v3-v6 的方式去继续执行安装操作**。

所以其实该命令并没有真的解决冲突，而是忽略了冲突，以“过时”（v3-v6）的方式进行下载操作。

> https://zhuanlan.zhihu.com/p/506596270?utm_psn=1807885219908440064
