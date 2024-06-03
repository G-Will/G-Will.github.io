# TS 中的函数重载，以及类型书写

## demo1：直接调用

```ts
/**
 * 函数声明
 */
function message(options: object): void;
function message(text: string, onClose?: Function): void;
function message(text: string, mode: string, duration?: number): void;
function message(text: string, duration?: number, onClose?: Function): void;
function message(
  param1: string | object, // 第一个参数的交叉类型
  param2: number | string | Function, // 第二个参数的交叉类型
  param3: number | Function // 第三个参数的交叉类型
): void {
  // 具体实现
}

/**
 * 函数调用
 */
message({
  mode: "mode",
  text: "text",
  onClose: function () {},
});
```

**类型书写方式：**

1. 每种调用方式分别写一个定义，不需要写实现
2. 最后一个包含前边的所有情况，并且包含实现。

## demo2：xxx.调用，或组件传参

```ts
interface ShowMessage {
  (options: object): void;
  (text: string, onClose?: Function): void;
  (text: string, mode: string, duration?: number): void;
  (text: string, duration?: number, onClose?: Function): void;
}

interface Utils {
  showMessage: ShowMessage;
}

const utils: Utils = {
  showMessage(
    param1: string | object, // 第一个参数的交叉类型
    param2: number | string | Function, // 第二个参数的交叉类型
    param3: number | Function // 第三个参数的交叉类型
  ) {},
};

utils.showMessage({
  mode: "mode",
  text: "text",
  onClose: function () {},
});
```

**类型书写方式：**

1. 先将一中的每种声明都写在 interface 中：

```ts

interface ShowMessage {
  function message(options: object): void;
  function message(text: string, onClose?: Function): void;
  function message(text: string, mode: string, duration?: number): void;
  function message(text: string, duration?: number, onClose?: Function): void;
}
```

2. 删掉 function 关键字和 函数名，即可

```ts
interface ShowMessage {
  (options: object): void;
  (text: string, onClose?: Function): void;
  (text: string, mode: string, duration?: number): void;
  (text: string, duration?: number, onClose?: Function): void;
}
```
