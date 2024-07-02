# 模拟 call 的实现

## 知识点

1. globalThis

globalThis 提供了一个标准的方式来获取不同环境下的全局 this 对象（也就是全局对象自身）。不像 window 或者 self 这些属性，它确保可以在有无窗口的各种环境下正常工作。所以，你可以安心的使用 globalThis，不必担心它的运行环境。为便于记忆，你只需要记住，全局作用域中的 this 就是 globalThis。

2. 不适用其他辅助方法（bind 等）让函数在给定上下文执行

通过 xxx.fn()，fn 的 this 指向 xxx。但是这样可能会导致 fn 的名字覆盖掉 xxx 中的 fn 属性

3. 使用 Symbol 生成唯一的 key，还要防止被读取到，使用 `Object.defineProperty`

```js
Function.prototype.myCall = function (ctx, ...args) {
  ctx = ctx === null || ctx === undefined ? globalThis : Object(ctx);
  const fn = this;
  const key = Symbol();
  Object.defineProperty(ctx, key, {
    value: fn,
    enumerable: false,
  });
  const r = ctx[key](...args);
  delete ctx[key];
  return r;
};
```
