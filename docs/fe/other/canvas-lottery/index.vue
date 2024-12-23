<template>
  <div class="container">
    <canvas ref="wheelCanvas" width="400" height="400"></canvas>
    <div class="pointer"></div>
    <div class="button-container">
      <button class="button" @click="handleClick">抽奖</button>
      <button class="button" @click="handleReset">重置</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

// 奖品配置 JSON
const prizeConfig = ref([
  { name: "奖品1", color: "#f39c12", probability: 0.1 },
  { name: "奖品2", color: "#e74c3c", probability: 0.2 },
  { name: "奖品3", color: "#9b59b6", probability: 0.3 },
  { name: "奖品4", color: "#3498db", probability: 0.2 },
  { name: "奖品5", color: "#2ecc71", probability: 0.2 },
]);

const bingoAngle = ref({});

const wheelCanvas = ref(null);
const isSpinning = ref(false);
const currentRotation = ref(0);
const totalProbability = ref(0);
const initAngle = ref(0);

// 初始化转盘
onMounted(() => {
  totalProbability.value = prizeConfig.value.reduce(
    (sum, prize) => sum + prize.probability,
    0
  );
  drawWheel();
});

const calculateBingoAngle = (extraAngle = 0) => {
  let sum = 0;
  prizeConfig.value.forEach((prize, idx) => {
    const sliceAngle =
      (prize.probability / totalProbability.value) * 2 * Math.PI;
    sum += (sliceAngle * 180) / Math.PI;
    // 记录每个块能够中奖需要转动的角度
    bingoAngle.value[idx] = 360 - sum;
  });
  console.log("==bingoAngle==", bingoAngle.value);
};

// 绘制转盘
const drawWheel = () => {
  const canvas = wheelCanvas.value;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  // 将第一个奖品的块放到起始位置
  let startAngle = -(1 / 2) * Math.PI;

  prizeConfig.value.forEach((prize) => {
    const sliceAngle =
      (prize.probability / totalProbability.value) * 2 * Math.PI;

    // 绘制扇形
    ctx.beginPath();
    ctx.moveTo(200, 200);
    ctx.arc(200, 200, 200, startAngle, startAngle + sliceAngle);
    ctx.fillStyle = prize.color;
    ctx.fill();

    // 绘制奖品名称
    ctx.save();
    ctx.translate(200, 200);
    ctx.rotate(startAngle + sliceAngle / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = "white";
    ctx.font = "16px Arial";
    ctx.fillText(prize.name, 180, 10);
    ctx.restore();

    startAngle += sliceAngle;
  });
};

// 生成累积概率数组
const generateProbabilityRanges = () => {
  const ranges = [];
  let cumulative = 0;

  prizeConfig.value.forEach((prize) => {
    cumulative += prize.probability;
    ranges.push(cumulative);
  });

  return ranges;
};

// 根据概率选择奖品
const selectPrizeIndex = (ranges) => {
  const random = Math.random(); // [0, 1)
  for (let i = 0; i < ranges.length; i++) {
    if (random < ranges[i]) {
      return i;
    }
  }
  return ranges.length - 1;
};

// 转盘旋转动画
const rotateWheel = (finalRotation, callback) => {
  const canvas = wheelCanvas.value;
  const ctx = canvas.getContext("2d");
  const totalRotation = finalRotation + 360 * 5; // 多圈旋转
  const duration = 4000; // 动画时长
  const startTime = performance.now();

  // calculateBingoAngle();

  const animate = (time) => {
    const elapsed = time - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = 1 - Math.pow(1 - progress, 3); // 缓动公式

    currentRotation.value = easedProgress * totalRotation;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(200, 200);
    ctx.rotate((currentRotation.value * Math.PI) / 180);
    ctx.translate(-200, -200);
    drawWheel();
    ctx.restore();

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      callback();
    }
  };

  requestAnimationFrame(animate);
};

// 按钮点击事件
const handleClick = () => {
  if (isSpinning.value) return;
  // 已经转动过时，先重置
  if (currentRotation.value) {
    handleReset();
  }
  calculateBingoAngle();
  isSpinning.value = true;

  const probabilityRanges = generateProbabilityRanges();
  const selectedPrizeIndex = selectPrizeIndex(probabilityRanges);
  const sliceAngle =
    (prizeConfig.value[selectedPrizeIndex].probability /
      totalProbability.value) *
    360;
  // 中奖块内浮动的角度
  const randomExtra = Math.random() * sliceAngle;
  // 总共需要转动的角度
  const finalRotation =
    selectedPrizeIndex * 360 +
    randomExtra +
    bingoAngle.value[selectedPrizeIndex];

  rotateWheel(finalRotation, () => {
    isSpinning.value = false;
    alert(`恭喜您获得奖品：${prizeConfig.value[selectedPrizeIndex].name}`);
  });
};

const handleReset = () => {
  const extraAngle = currentRotation.value % 360;
  console.log("==extraAngle==", extraAngle);
  currentRotation.value = 0;
  const canvas = wheelCanvas.value;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(200, 200);
  ctx.rotate(0);
  ctx.translate(-200, -200);
  drawWheel();
  ctx.restore();
};
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  width: 400px;
  height: 400px;
}

canvas {
  display: block;
}

.pointer {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  transform: translate(-50%, -50%);
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-bottom: 30px solid red;
}

.button-container {
  text-align: center;
  .button {
    padding: 10px 20px;
    font-size: 16px;
    color: white;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    &:active {
      transform: scale(0.95);
    }
  }
}
</style>
