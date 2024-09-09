import { createChunk } from "./utils";
import type { Chunk } from "./utils";

onmessage = async (e) => {
  const { file, start, end, CHUNK_SIZE } = e.data;

  const result: Promise<Chunk>[] = [];
  for (let i = start; i < end; i++) {
    const p = createChunk(file, i, CHUNK_SIZE);
    result.push(p);
  }
  const chunks = await Promise.all(result);
  postMessage(chunks);
};
