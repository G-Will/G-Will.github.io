# 大文件分片

本文主要介绍将大文件分片的实现

## 展示

<script setup>
import demo from "./index.vue"
</script>

<demo></demo>

## 代码实现

::: code-group

<<< @/fe/other/big-file-chunk-split/index.vue

<<< @/fe/other/big-file-chunk-split/utils.ts

<<< @/fe/other/big-file-chunk-split/worker.ts

- 计算 MD5 是 CPU 密集型任务，慢的主要瓶颈在计算 MD5。
- 要减少处理时间，只能开启多线程。需要开启多线程一般也是因为遇到了 CPU 密集型任务。

## TODO

- [ ] 总的 hash 计算（可以将各个 chunk 的 hash 加起来再次 hash），请求上传接口
- [ ] 断点续传
- [ ] 边分片边上传

[视频讲解](https://www.douyin.com/video/7390671292048936211)
