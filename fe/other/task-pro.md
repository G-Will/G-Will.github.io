# 模拟任务执行的洋葱模型

模拟任务执行的洋葱模型，实现 TaskPro，满足如下调用和输入：

```js
/**
 * 任务执行的洋葱模型：实现 TaskPro，满足如下调用和输入
 */
const t = new TaskPro();
t.addTask(async (next) => {
  console.log(1, "start");
  await next();
  console.log(1, "end");
});
t.addTask(() => {
  console.log(2);
});
t.addTask(() => {
  console.log(3);
});
t.run(); // 输入 1 start, 2, 3, 1 end
```

## 实现

```js
class TaskPro {
  _taskList = [];
  _isRunning = false;
  _currIdx = 0;

  addTask = (task) => {
    this._taskList.push(task);
  };

  _runTask = async () => {
    if (this._currIdx >= this._taskList.length) {
      this._isRunning = false;
      this._currIdx = 0;
      this._taskList = [];
      return;
    }
    const task = this._taskList[this._currIdx];
    // 执行 next 之前的下标
    const i = this._currIdx;
    await task(this._next);
    // 执行 next 之后的下标
    const j = this._currIdx;
    // 如果 i === j，则说明 task 中没有显式调用 next，那么需要手动调用一下 next
    if (i === j) {
      await this._next();
    }
  };

  _next = async () => {
    this._currIdx++;
    await this._runTask();
  };

  run = async () => {
    // 不允许在执行中再次执行
    if (this._isRunning) return;
    this._isRunning = true;
    await this._runTask();
  };
}
```
