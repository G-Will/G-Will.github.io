<template>
  <div class="btn">
    Hover Me
    <div class="detail">
      <div class="inner">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
        aperiam assumenda officia culpa vitae aspernatur? Molestias consequuntur
        vel doloremque, numquam nihil nemo sequi facere, quia ex unde autem
        commodi earum.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

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
    transition: 0.5s;
    display: grid;
    grid-template-rows: 0fr;
    .inner {
      /* padding: 10px; */
      /* 这里很关键，不然 grid-template-rows: 0fr 会无效 */
      min-height: 0;
    }
  }
  &:hover {
    .detail {
      grid-template-rows: 1fr;
    }
  }
}
</style>
