# 实现 GetOptionals

获取一个类型中的所有可选类型：

```ts
interface ComplexObject {
  name: string;
  option1?: number;
  option2?: boolean;
}

const keys: GetOptional<ComplexObject>;
// 结果 { option1?: number; option2?: boolean; }
```

```ts
type GetOptionals<T> = {
  [K in keyof T extends Required<T>[K] ? never : K]: T[K];
};
```

## 组件解析

1. `Required<T>`: 是 TypeScript 的内置工具类型，它将类型 T 的所有属性转换为必需的，即去除所有属性的可选性。

2. 映射类型 `[K in keyof T]`:

`[K in keyof T]`是一个映射类型，它会遍历类型 T 的每个键。

3. 条件类型 `T[K] extends Required<T>[K] ? never : K`:

`T[K] extends Required<T>[K]` 检查原始类型 T 中的属性 K 是否与在 `Required<T>` 中的对应属性类型相同。如果相同，说明属性 K 在原始类型 T 中是必需的；如果不同，说明属性 K 在原始类型 T 中是可选的。
使用条件类型的 as 子句 `as T[K] extends Required<T>[K] ? never : K`，如果属性是必需的，则映射到 never（即不包括该属性），如果属性是可选的，则保留该属性名。

4. 属性类型 `T[K]`:

对于每个保留下来的键（即可选属性的键），将其类型设置为 `T[K]`，即原始类型 T 中该属性的类型。
