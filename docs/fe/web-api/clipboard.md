# Clipboard API

在 Chrome 浏览器中，你可以使用 Clipboard API 来访问和修改用户的剪切板内容。这个 API 提供了一个现代的、承诺（Promise）-基础的接口，允许你以异步方式读取和写入剪切板。

## 读取剪切板内容

要从剪切板读取内容，你可以使用 navigator.clipboard.readText()方法。这个方法返回一个 Promise，解析为剪切板上的文本内容。请注意，出于安全和隐私的考虑，浏览器可能会要求用户授权才能访问剪切板。

```js
async function readClipboard() {
  if (!navigator.clipboard) {
    console.log("Clipboard API not available");
    return;
  }
  try {
    const text = await navigator.clipboard.readText();
    console.log("Pasted content: ", text);
  } catch (err) {
    console.error("Failed to read clipboard contents: ", err);
  }
}

readClipboard();
```

## 写入剪切板内容

要向剪切板写入内容，你可以使用 navigator.clipboard.writeText()方法。这个方法同样返回一个 Promise，当文本成功写入剪切板时完成。

```js
async function writeToClipboard(text) {
  if (!navigator.clipboard) {
    console.log("Clipboard API not available");
    return;
  }
  try {
    await navigator.clipboard.writeText(text);
    console.log("Text copied to clipboard");
  } catch (err) {
    console.error("Failed to copy text: ", err);
  }
}

writeToClipboard("Hello, world!");
```

## 注意事项

- 用户授权：由于隐私原因，访问剪切板可能需要用户的明确授权。在某些情况下，浏览器可能会自动拒绝访问剪切板的请求，特别是如果请求不是由用户的直接操作触发的（如点击事件）。
- HTTPS 要求：出于安全考虑，Clipboard API 通常只在通过 HTTPS 服务的页面上可用。
- 兼容性：虽然 Clipboard API 在现代浏览器中得到了广泛支持，但在一些旧浏览器中可能不可用。在实际应用中，建议检查 navigator.clipboard 的存在性，以确保代码的兼容性。

通过使用 Clipboard API，你可以提供一个更加流畅和用户友好的剪切板交互体验。
