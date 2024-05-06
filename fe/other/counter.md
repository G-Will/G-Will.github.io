# React计数器

## setTimeout
```ts
import React, { useState, useEffect } from 'react';

function CounterWithTimeout() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setCount(count + 1);
    }, 1000);
  }, [count]);

  return <div>Count: {count}</div>;
}

export default CounterWithTimeout;
```
一旦定时器的回调函数被执行，定时器就自动结束了，因此这里不需要显式地调用 clearTimeout 来清除定时器。

## setInterval
```ts
import React, { useState, useEffect } from 'react';

function CounterWithInterval() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 1000);

    return () => {
      clearInterval(timer)
    }
  }, []);

  return <div>Count: {count}</div>;
}

export default CounterWithTimeout;
```

## 易错点
1. 使用 setInterval，useEffect 是空依赖，并且使用 `setCount(count + 1)`。
  useEffect 添加了 count 依赖后，结果虽然是对的，但是每次 count 都会重新启动一个 setInterval，显得很冗余。
```ts
import React, { useState, useEffect } from 'react';

function CounterWithInterval() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(count + 1); // 由于没有添加依赖 count，这里的 count 一直是 0，导致显示结果一直是 1
    }, 1000);

    return () => {
      clearInterval(timer)
    }
  }, []);

  return <div>Count: {count}</div>;
}

export default CounterWithTimeout;
```
