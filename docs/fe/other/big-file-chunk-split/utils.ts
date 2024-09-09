import SparkMD5 from "spark-md5";

export interface Chunk {
  blob: Blob; // 文件的二进制格式
  start: number; // 从第几个字节处开始
  end: number; // 从第几个字节处结束
  hash: string; // 文件的唯一指纹，用来做检验，和服务器协商好算法，判断文件有没有上传过
  index: number; // 分片的下标
}

// 每个 chunk 大小
const CHUNK_SIZE = 1024 * 1024 * 5; // 5MB
// 线程数
const THREAD_COUNT = navigator.hardwareConcurrency || 4;

export const createChunk = (
  file: File,
  index: number,
  chunkSize: number
): Promise<Chunk> => {
  return new Promise((resolve) => {
    // 开始的 chunk 下标
    const start = index * chunkSize;
    // 结束的 chunk 下标
    const end = start + chunkSize;
    const spark = new SparkMD5.ArrayBuffer();
    const fileReader = new FileReader();
    const blob = file.slice(start, end);
    fileReader.onload = (e) => {
      spark.append(e.target!.result as ArrayBuffer);
      resolve({
        start,
        end,
        index,
        hash: spark.end(),
        blob,
      } as Chunk);
    };
    fileReader.readAsArrayBuffer(blob);
  });
};

export const cutFile = async (file: File) => {
  return new Promise((resolve, reject) => {
    console.log("==file==", file);
    const chunkCount = Math.ceil(file.size / CHUNK_SIZE);
    const result: Chunk[][] = [];
    // 已经完成的线程数
    let finishedCount = 0;

    /* for (let i = 0; i < chunkCount; i++) {
    const chunk = await createChunk(file, i, CHUNK_SIZE);
    result.push(chunk);
    } */
    /**
     * 这里用如下 Promise.all 并发也没有解决慢的问题。计算 MD5 是 CPU 密集型任务，因为慢的主要瓶颈在计算 MD5，。
     * 要减少处理时间，只能开启多线程。
     * 开启多线程的前提一般是遇到 CPU 密集型任务。
     */
    /* const result = [];
    for (let i = 0; i < chunkCount; i++) {
      const p = createChunk(file, i, CHUNK_SIZE);
      result.push(p);
    }
    await Promise.all(result); */

    // 每个线程处理的分片数
    const threadChunkCount = Math.ceil(chunkCount / THREAD_COUNT);

    for (let i = 0; i < THREAD_COUNT; i++) {
      // 分配线程任务
      const worker = new Worker("./worker.ts", {
        type: "module",
      });
      // 开始的 chunk 下标
      const start = i * threadChunkCount;
      // 结束的 chunk 下标
      const end = Math.min((i + 1) * threadChunkCount, chunkCount);
      worker.postMessage({
        file,
        start,
        end,
        CHUNK_SIZE,
      });
      // 线程处理完成后，回传分片结果
      worker.onmessage = (e) => {
        result[i] = e.data;
        worker.terminate();
        finishedCount++;
        // 全部线程都已经处理完成
        if (finishedCount === THREAD_COUNT) {
          resolve(result.flat());
        }
      };
    }
  });
};
