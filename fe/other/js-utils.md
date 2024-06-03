# 极简精妙的 JS 代码片段

## 去除字符串中的元素标记

```js
const removeTag = (fragment) =>
  new DOMParser().parseFromString(fragment, "text/html").body.textContent || "";
```

```js
removeTag(`<div>Hello World</div>`); // Hello World
removeTag(`<div>123<p>Hello World</p></div>`); // 123Hello World
```

## 解析 url 中的参数

1. 方法 1：正则

```js
const parseQuery = (url) => {
  const result = {};
  url.replace(/([^?&=]+)=([^&]+)/g, (match, k, v) => (result[k] = v));
  return result;
};
```

```js
parseQuery("http://a.com?a=1&b=2"); // {a: '1', b: '2'}
parseQuery("a=1&b=2"); // {a: '1', b: '2'}
```

2. 方法 2：URL

```js
const parseQuery = (url) => {
  const result = {};
  const searchParams = new URLSearchParams(url);
  searchParams.forEach((v, k) => {
    result[k] = v;
  });
  return result;
};
```

```js
parseQuery("http://a.com?a=1&b=2"); // {a: '1', b: '2'}
parseQuery("a=1&b=2"); // {a: '1', b: '2'}
```
