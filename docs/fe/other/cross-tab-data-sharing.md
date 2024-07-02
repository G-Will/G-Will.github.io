# 跨标签页的数据通信

跨标签页通信的常见方案：

1. BroadcastChannel

```js
// 新建一个频道，只要频道名字一样就可以通信
const channel = new BroadcastChannel("channel_name");

// 简单封装一下
const sendMsg = (type = "add" | "delete", msg: any) => {
  // 传递什么类型都行，这里传一个对象
  channel.postMessage({
    type,
    msg,
  });
};

const listenMsg = (callback) => {
  const handler = (event) => {
    console.log(event.data);
    callback?.(event.data);
  };
  channel.addEventListener("message", handler);
  // 取消监听
  return () => {
    channel.removeEventListener("message", handler);
  };
};

// ----------------------------------------------------------------

/* 使用 */
// 在标签页A中创建并发送消息：
sendMsg("add", {
  name: "Will",
  age: 16,
});

// 在标签页B中接收消息：
const unLinten = listenMsg((data) => {
  if (data.type === "add") {
    console.log("新增", data);
  } else {
    console.log("删除", data);
  }
});

// 关闭页面取消监听
unLinten();
```

2. Service Worker

- 注册 Service Worker：

首先，你需要在你的网页中注册一个 Service Worker。

```js
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/service-worker.js")
    .then(function (registration) {
      console.log("Service Worker 注册成功:", registration);
    })
    .catch(function (error) {
      console.log("Service Worker 注册失败:", error);
    });
}
```

- Service Worker 脚本 (service-worker.js):

在 Service Worker 中监听消息，并将其广播到所有客户端（即所有控制的页面）。

```js
self.addEventListener("message", function (event) {
  // 获取所有的客户端
  self.clients.matchAll().then((all) =>
    all.forEach((client) => {
      client.postMessage(event.data);
    })
  );
});
```

- 发送和接收消息：

在任一标签页中发送消息到 Service Worker，然后由 Service Worker 广播给所有标签页。

```js
// 发送消息到Service Worker
if (navigator.serviceWorker.controller) {
  navigator.serviceWorker.controller.postMessage("Hello from Tab A");
}

// 在每个标签页中监听来自Service Worker的消息
navigator.serviceWorker.addEventListener("message", function (event) {
  console.log("收到消息:", event.data);
});
```

3. localStorage/sessionStorage + window.onstorage 监听

```js
// 在标签页A中：
localStorage.setItem("message", "Hello from Tab A");

// 在标签页B中监听变化：
window.addEventListener("storage", (event) => {
  if (event.key === "message") {
    console.log(event.newValue); // 输出: Hello from Tab A
  }
});
```

4. Shared Worker 定时器轮训（setInterval）

- Shared Worker 脚本 (shared-worker.js):

```js
var connections = []; // 用于存储连接的端口
onconnect = function (e) {
  var port = e.ports[0];
  connections.push(port);

  port.onmessage = function (event) {
    // 当接收到消息时，将其广播到所有连接的端口
    connections.forEach(function (destination) {
      if (destination !== port) {
        destination.postMessage(event.data);
      }
    });
  };
};
```

- 在标签页中连接到 Shared Worker：

```js
var worker = new SharedWorker("shared-worker.js");
worker.port.start();

worker.port.postMessage("Hello from Tab A");

worker.port.onmessage = function (event) {
  console.log("收到消息:", event.data);
};
```

5. IndexedDbB 定时器轮训（setInterval）

6. cookie 定时器轮训（setInterval）

7. window.open、window.postMessage

虽然 Window.postMessage 通常用于窗口与 iframe 之间的通信，但如果你能够获得其他标签页的 window 引用（例如，通过 window.open 方法打开的标签页），也可以用于标签页之间的通信。

```js
// 在标签页A中打开标签页B，并发送消息：
const tabB = window.open("https://example.com/tab-b.html");
tabB.postMessage("Hello from Tab A", "https://example.com");

// 在标签页B中接收消息：
window.addEventListener("message", (event) => {
  if (event.origin === "https://example.com") {
    console.log(event.data); // 输出: Hello from Tab A
  }
});
```

8. Websocket
