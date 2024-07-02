<template>
  <div class="border-light" ref="borderLight">
    <div
      class="card"
      ref="cardsRef"
      :class="isDark ? 'dark' : ''"
      v-for="(item, key) in cardsConfig"
      :key="key"
    >
      <div class="inner">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useData } from "vitepress";

const { isDark } = useData();
const borderLight = ref<HTMLElement>();
const cardsRef = ref<HTMLElement[]>();

const cardsConfig = [
  "将鼠标",
  "移动到",
  "当前区域",
  "然后",
  "疯狂晃动",
  "观察边框变化",
];

onMounted(() => {
  if (!borderLight.value) return;
  borderLight.value.onmousemove = (e: MouseEvent) => {
    if (!cardsRef.value) return;
    for (const card of cardsRef.value) {
      // 鼠标移入时，显示闪光边框
      card.style.setProperty("--display", "inline-block");
      const rect = card.getBoundingClientRect();
      const left = e.clientX - rect.left;
      const top = e.clientY - rect.top;
      card.style.setProperty("--left", `${left}px`);
      card.style.setProperty("--top", `${top}px`);
    }
  };

  borderLight.value.onmouseleave = (e: MouseEvent) => {
    if (!cardsRef.value) return;
    for (const card of cardsRef.value) {
      // 鼠标移出时，隐藏闪光边框
      card.style.setProperty("--display", `none`);
    }
  };
});

onBeforeUnmount(() => {
  if (!borderLight.value) return;
  borderLight.value.onmousemove = null;
});
</script>

<style lang="scss" scoped>
.border-light {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 8px;
  border-radius: 6px;

  .card {
    position: relative;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: inherit;
    aspect-ratio: 8/5;
    overflow: hidden;

    &.dark {
      background-color: rgba(255, 255, 255, 0.1);
      .inner {
        background-color: #222;
      }
    }

    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 150%;
      top: var(--top, 200%);
      left: var(--left, 200%);
      display: var(--display, inline-block);
      background: radial-gradient(
        closest-side circle,
        rgba(16, 185, 129, 0.8),
        transparent
      );
      transform: translate(-50%, -50%);
      border-radius: inherit;
      z-index: 2;
    }

    .inner {
      position: absolute;
      border-radius: inherit;
      inset: 5px;
      padding: 12px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background-color: #fff;
      z-index: 3;
    }
  }
}
</style>
