# 观察者模式

> https://www.yuque.com/yuqueyonghua2m9wj/web_food/kgawmyhxf93p0g70

定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知

```js
// 被观察者：学生
class Subject {
  constructor() {
    this.state = "happy";
    this.observers = []; // 存储所有的观察者
  }

  // 新增观察者
  add(o) {
    this.observers.push(o);
  }

  // 获取状态
  getState() {
    return this.state;
  }

  // 更新状态并通知
  setState(newState) {
    this.state = newState;
    this.notify();
  }

  // 通知所有的观察者
  notify() {
    this.observers.forEach((o) => o.update(this));
  }
}

// 观察者：父母和老师
class Observer {
  constructor(name) {
    this.name = name;
  }

  // 更新
  update(student) {
    console.log(
      `亲爱的${this.name} 通知您当前学生的状态是${student.getState()}`
    );
  }
}

let student = new Subject();
let parent = new Observer("父母");
let teacher = new Observer("老师");

// 添加观察者
student.add(parent);
student.add(teacher);

// 设置被观察者的状态
student.setState("刚刚好");
```

---

# 发布订阅模式

发布订阅模式跟观察者模式很像，但它发布和订阅是不互相依赖的，因为有一个统一调度中心

```js
class EventBus {
  constructor() {
    // 缓存列表，用来存放注册的事件与回调
    this.cache = {};
  }

  // 订阅事件
  on(name, cb) {
    // 如果当前事件没有订阅过，就给事件创建一个队列
    if (!this.cache[name]) {
      this.cache[name] = []; //由于一个事件可能注册多个回调函数，所以使用数组来存储事件队列
    }
    this.cache[name].push(cb);
  }

  // 触发事件
  emit(name, ...args) {
    // 检查目标事件是否有监听函数队列
    if (this.cache[name]) {
      // 逐个调用队列里的回调函数
      this.cache[name].forEach((callback) => {
        callback(...args);
      });
    }
  }

  // 取消订阅
  off(name, cb) {
    const callbacks = this.cache[name];
    const index = callbacks.indexOf(cb);
    if (index !== -1) {
      callbacks.splice(index, 1);
    }
  }

  // 只订阅一次
  once(name, cb) {
    // 执行完第一次回调函数后，自动删除当前订阅事件
    const fn = (...args) => {
      cb(...args);
      this.off(name, fn);
    };
    this.on(name, fn);
  }
}

// 测试
let eventBus = new EventBus();
let event1 = function (...args) {
  console.log(`通知1-订阅者小陈老师,小明同学当前心情状态：${args}`);
};

// 订阅事件，只订阅一次
eventBus.once("teacherName1", event1);

// 发布事件
eventBus.emit("teacherName1", "教室", "上课", "打架", "愤怒");
eventBus.emit("teacherName1", "教室", "上课", "打架", "愤怒");
eventBus.emit("teacherName1", "教室", "上课", "打架", "愤怒");
```

---

> [这里](https://refactoringguru.cn/design-patterns/observer) 说观察者和订阅发布是一种模式。可能理解有所不同吧。本文只是对这两种写法进行一个对比和说明。
