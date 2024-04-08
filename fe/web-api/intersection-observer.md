# Intersection Observer

**root**：
用作视口的元素，用于检查目标的可见性。必须是目标的祖先。如果未指定或为 null，则默认为浏览器视口。

**rootMargin**：
根周围的边距。其值可以类似于 CSS margin 属性，例如 "10px 20px 30px 40px"（上、右、下、左）。这些值可以是百分比。在计算交叉点之前，这组值用于**增大或缩小根元素边框的每一侧**。默认值为全零。

**threshold**：
一个数字或一个数字数组，表示目标可见度达到多少百分比时，观察器的回调就应该执行。如果只想在能见度超过 50% 时检测，可以使用 0.5 的值。如果希望每次能见度超过 25% 时都执行回调，则需要指定数组 [0, 0.25, 0.5, 0.75, 1]。默认值为 0（这意味着只要有一个像素可见，回调就会运行）。值为 1.0 意味着在每个像素都可见之前，阈值不会被认为已通过。

## 图片懒加载

```js{4}
const ob = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      // 正在和视口交叉
      if (entry.isIntersecting) {
        const img = entry.target();
        img.src = img.dataset.src;
        // 取消监听
        ob.unobserve();
      }
    }
  },
  {
    // root: null,
    // rootMargin: null,
    threshold: 0,
  }
);

const imgs = document.querySelectorAll("img[data-src]");
imgs.forEach((img) => ob.observe(img));

```

## 无限滚动

思路：只要下方 loading 图进入视口（或者离视口有一定具体，即：提前加载），就加载指定数量的图片。

```js{4}
async function loadMoreImages(num = 10) {
  // 加载逻辑...
}

const ob = new IntersectionObserver(
  (entries) => {
    const entry = entries[0];
    if (entry.isIntersecting) {
      loadMoreImages();
    }
  },
  {
    // rootMargin: null,
    threshold: 0,
  }
);

ob.observe(document.querySelector(".spin"));

```

## 视频进入视口播放，离开后暂停

```js{4}
const vdo = document.querySelector("video");

const ob = new IntersectionObserver(
  (entries) => {
    const entry = entries[0];
    if (entry.isIntersecting) {
      vdo.play();
    } else {
      vdo.pause();
    }
  },
  {
    threshold: 0.8,
  }
);

ob.observe(vdo);
```
