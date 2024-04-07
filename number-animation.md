# 数字动画函数

实现数字在 duration（默认 1000 毫秒） 内从 form 到 to 的动画过度。

```js{4}

function animation(duration = 1000, from, to, onProgress) {
  let value = from;
  const speed = (to - from) / duration;
  const start = Date.now();

  // 让value前进一点
  function _run() {
    // 改变value的值
    const t = Date.now() - start;
    if (t >= duration) {
      value = to;
      onProgress(value); // 更新 dom 等操作
      return;
    }
    value = from + t * speed;
    // console.log(value);
    // 注册下一次的改变
    requestAnimationFrame(_run);
  }

  _run();
}

```
