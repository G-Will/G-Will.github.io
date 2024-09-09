<template>
  <div>
    <input type="file" @change="handleFileChange" />
  </div>
</template>

<script setup lang="ts">
import { cutFile } from "./utils";

const handleFileChange = async (event: any) => {
  const file = event.target.files[0];
  console.log("==file==", file, typeof file);

  console.time("==curFile==");
  const chunks = await cutFile(file);
  console.timeEnd("==curFile==");

  console.log("==result==", chunks);
};
</script>
