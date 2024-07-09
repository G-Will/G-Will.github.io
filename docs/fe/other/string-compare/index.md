# 字符串比较

```ts
/**
 * 比较两个字符串的大小
 * 两个字符串都是用-连接的数字，比如 1-2-33-41-5
 * 比较方式是从左到右，依次比较每个数字的大小，遇到相等的数字继续往后比较，遇到不同的数字直接得到比较结果
 * s1 > s2 return 1
 * s1 < s2 return -1
 * s1 === s2 return 0
 */

function compare(s1: string, s2: string) {}
```

## 惯性思维

将字符串按 “-” 进行 split，然后循环进行依次比较

截取有效率问题，万一字符串长度为 1 万呢？

代码略

## 迭代器

::: details

<<< @/fe/other/string-compare/index.ts

:::

[视频讲解](https://www.douyin.com/video/7388068852678135074)
