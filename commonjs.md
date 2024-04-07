# CommonJS 的本质

CommonJS 是一个模块化的标准，每个文件都是一个模块。当我们使用 require 去导入一个模块的时候，就会出发这个模块的执行。所以，要搞清楚 commCommonJSonjs 的本质，关键就是要搞清楚 require 函数是怎么运行的，它做了什么事情，又返回了什么，它返回的内容就是模块导出的结果。

require 是 node 在本地实现的，以下用一个伪代码说明 require 的实现原理。

**CommonJS 的每一个模块，实际上都是处于一个函数当中。可以在模块中打印函数特有的 `arguments` 来验证，如果有值，说明运行在函数中。**

在模块中，`this`、`exports`、`module.exports` 是恒等的

```js{4}
function require(modulePath) {
  // 1. 根据传入的模块路径，得到模块完整的绝对路径
  var moduleId = getModuleId(modulePath);
  // 2. 判断缓存
  if (cache[moduleId]) {
    return cache[moduleId];
  }
  // 3. 真正运行模块代码的辅助函数
  function _require(exports, require, module, __filename, __dirname) {
    // 目标模块的代码在这里
  }
  // 4. 准备并运行辅助函数
  var module = {
    exports: {},
  };
  var exports = module.exports;
  // 得到模块文件的绝对路径
  var __filename = moduleId;
  // 得到模块所在目录的绝对路径
  var __dirname = getDirname(__filename);
  _require.call(exports, exports, require, module, __filename, __dirname);
  // 5. 缓存 module.expots
  cache[moduleId] = module.exports;
  // 6. 返回 module.exports
  return module.exports;
}

```

## 一个问题

下边的模块，导出的是什么？

```js{4}
this.a = 1;
exports.b = 2;
exports = { c: 3 };
module.exports = { d: 4 };
exports.e = 5;
this.f = 6;
```

分析：

1. 初始时，`this、exports.modules、exports`: {}
2. 第 1 行运行后：`this、exports.modules、exports: { a: 1 }`
3. 第 2 行运行后：`this、exports.modules、exports: { a: 1, b: 2 }`
4. 第 3 行运行后：
   `this、exports.modules: { a: 1, b: 2 }`,
   `exports: { c: 3 }`
5. 第 4 行运行后：
   `this: { a: 1, b: 2 }`,
   `exports: { c: 3 }`,
   `exports.modules: { d: 4 }`
6. 第 5 行运行后：
   `this: { a: 1, b: 2, f: 6 }`,
   `exports: { c: 3, e: 5 }`,
   `exports.modules: { d: 4 }`
7. 所以，结果是 `{ d: 4 }`
