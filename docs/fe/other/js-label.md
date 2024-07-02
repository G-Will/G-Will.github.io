# JS Label 语法

> https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/label
> https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/break

有如下代码，希望是在 `i * j > 30` 时退出最外层的循环。但是 break 只能终止当前循环或 switch 语句。
```js
for (let i = 0; i < 10; i++) {
  console.log('==第一层循环==');
  for (let j = 0; j < 10; j++) {
    console.log('==第二层循环==');
    if (i * j > 30) {
      console.log('==退出第一层循环==');
      break;
    }
  }
}
```

要达到这样的目的，可以使用JS Label语法。
可使用一个标签来唯一标记一个循环，然后使用 break 或 continue 语句来指示程序是否中断循环或继续执行。
```js
loop1: for (let i = 0; i < 10; i++) {
  console.log('==第一层循环==');
  for (let j = 0; j < 10; j++) {
    console.log('==第二层循环==');
    if (i * j > 30) {
      console.log('==退出第一层循环==');
      break loop1; // 退出 loop1
    }
  }
}
```

