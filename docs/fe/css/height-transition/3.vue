<template>
  <div class="btn" ref="btnRef">
    Hover Me
    <div class="detail" ref="detailRef">
      <div class="inner">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
        aperiam assumenda officia culpa vitae aspernatur? Molestias consequuntur
        vel doloremque, numquam nihil nemo sequi facere, quia ex unde autem
        commodi earum.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const btnRef = ref<HTMLElement>();
const detailRef = ref<HTMLElement>();

onMounted(() => {
  if (!btnRef?.value || !detailRef?.value) return;
  btnRef.value.onmouseenter = () => {
    if (!btnRef?.value || !detailRef?.value) return;
    detailRef.value.style.height = "auto";
    const { height } = detailRef.value.getBoundingClientRect();
    // 运行到这一行时，不会发生高度闪动，因为还没有进行绘制
    detailRef.value.style.height = "0px";

    detailRef.value.style.transition = "0.5s";

    // 强制回流。让 detailRef.value.style.height = "0px" 高度设置成 0 生成到整个布局的计算结果中，使得高度为 0 生效
    detailRef.value.getBoundingClientRect();

    detailRef.value.style.height = `${height}px`;
  };

  btnRef.value.onmouseleave = () => {
    if (!btnRef?.value || !detailRef?.value) return;
    detailRef.value.style.height = "0px";
  };
});
</script>

<style lang="scss" scoped>
.btn {
  position: relative;
  display: inline-block;
  line-height: 1;
  user-select: none;
  cursor: pointer;
  color: #fff;
  padding: 5px;
  border-radius: 4px;
  background: #0051a6;
  .detail {
    position: absolute;
    background: lightblue;
    line-height: 1.5;
    box-sizing: border-box;
    border-radius: 8px;
    width: 300px;
    top: 30px;
    overflow: hidden;
    z-index: 999;
    height: 0px;
    .inner {
      padding: 10px;
    }
  }
}
</style>
