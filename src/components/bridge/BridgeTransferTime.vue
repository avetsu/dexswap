<script setup>
defineProps({
  time: String,
  geas: String,
});
</script>

<template>
  <ul class="bridge-transfer-time__list">
    <li class="bridge-transfer-time__item">
      <span class="bridge-transfer-time__title">Transfer time</span>
      <span class="bridge-transfer-time__value-time">{{ time }}</span>
    </li>
    <li class="bridge-transfer-time__item">
      <span class="bridge-transfer-time__title">Geas fee to transfer</span>
      <span class="bridge-transfer-time__value-geas">{{ geas }}</span>
    </li>
  </ul>
</template>

<style scoped>
.bridge-transfer-time__list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 28px;
}
@media (max-width: 375px) {
  .bridge-transfer-time__list {
    gap: 11px;
    margin-bottom: 20px;
  }
}
.bridge-transfer-time__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
}
.bridge-transfer-time__title {
  font-family: var(--font-family);
  font-weight: 300;
  font-size: clamp(13px, 3vw, 18px);
  color: #22212e;
  opacity: 0.5;
}
.bridge-transfer-time__value-time {
  font-family: var(--font-family);
  font-weight: 500;
  font-size: clamp(13px, 3vw, 18px);
  color: #22212e;
}
.bridge-transfer-time__value-geas {
  font-family: var(--font-family);
  font-weight: 300;
  font-size: clamp(13px, 3vw, 18px);
  color: #22212e;
}
</style>
