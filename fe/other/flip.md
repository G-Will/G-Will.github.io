# FLIP 动画方案

通常的动画都是针对元素样式的变化，那针对**元素结构的变化**怎么实现动画呢？

可以使用 FLIP。它并不是第三方库或者插件，而是一种思路，应用这种思路。即：

- First：记录要监控的元素位置
- Last：记录元素结构变化后的位置
- Invert（反转）：移动元素到 First 的位置
- Play：播放动画

## 示例 1：改变第一个元素的位置

使用 transform + requestAnimationFrame

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>FLIP 动画方案</title>

    <style>
      .container {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .btn {
        background: rgb(26, 126, 26);
        width: 200px;
        height: 30px;
        border-radius: 10px;
        border: none;
        margin-block-end: 10px;
        cursor: pointer;
      }

      .container .item {
        width: 200px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #ccc;
        border-radius: 10px;
      }

      .container .item.first {
        background: #f40;
      }
    </style>
  </head>

  <body>
    <div class="container">
      <div class="item first">1</div>
      <div class="item">2</div>
      <div class="item">3</div>
      <div class="item">4</div>
      <div class="item">5</div>
    </div>
    <button class="btn">改变第一个元素的位置</button>

    <script>
      const btn = document.querySelector(".btn");

      const list = document.querySelector(".container");
      const firstItem = document.querySelector(".first");

      function getLocation() {
        const rect = firstItem.getBoundingClientRect();
        return rect.top;
      }

      const start = getLocation();
      console.log("First:", start);

      btn.onclick = () => {
        list.insertBefore(firstItem, null); // 这一行代码结束后，firstItem 的位置并没有变化，因为页面还没有渲染。可以通过添加 delay 阻止主线程查看
        // delay();
        const end = getLocation();
        console.log("Last:", end);
        const dis = start - end;
        firstItem.style.transform = `translateY(${dis}px)`;
        // delay();
        console.log("Invert:", dis);
        requestAnimationFrame(() => {
          console.log("Play");
          firstItem.style.transition = `transform 1s`;
          firstItem.style.removeProperty("transform");
        });
      };

      function delay(duration = 1000) {
        const now = Date.now();
        while (Date.now() - now < duration) {}
        // console.log('==delay end==');
      }
    </script>
  </body>
</html>
```

## 示例 2：列表随机排序

使用 Animations API

> 参考：https://cloud.tencent.com/developer/article/2383439

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>FLIP 动画方案</title>

    <style>
      #container {
        display: flex;
        gap: 10px;
      }

      #btn {
        background: rgb(26, 126, 26);
        width: 100px;
        height: 40px;
        border-radius: 10px;
        border: none;
        margin-block-end: 10px;
        cursor: pointer;
      }

      #container .item {
        width: 150px;
        height: 150px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #ccc;
        border-radius: 10px;
        font-size: 25px;
      }
    </style>
  </head>

  <body>
    <div id="container">
      <div class="item">1</div>
      <div class="item">2</div>
      <div class="item">3</div>
      <div class="item">4</div>
      <div class="item">5</div>
    </div>
    <button id="btn">随机排序</button>

    <script>
      const container = document.getElementById("container");
      const btn = document.getElementById("btn");

      // 记录开始位置信息
      function record() {
        const list = [...container.children];
        list.forEach((item, i) => {
          const rect = item.getBoundingClientRect();
          item.startX = rect.left;
        });
      }

      function change() {
        const list = [...container.children];
        const len = list.length;
        list.forEach((item, i) => {
          const newIndex = Math.floor(Math.random() * len);
          if (newIndex !== i) {
            const nextDOM = item.nextElementSibling;
            container.insertBefore(item, list[newIndex]);
            container.insertBefore(list[newIndex], nextDOM);
          }
        });
      }

      function play() {
        const list = [...container.children];
        const len = list.length;
        list.forEach((item, i) => {
          const endPosition = item.getBoundingClientRect();
          const disX = item.startX - endPosition.left;
          item.animate(
            [
              { transform: `translateX(${disX}px)` },
              { transform: "translateX(0px)" },
            ],
            { duration: 500 }
          );
        });
      }

      btn.onclick = () => {
        record();
        change();
        play();
      };
    </script>
  </body>
</html>
```
