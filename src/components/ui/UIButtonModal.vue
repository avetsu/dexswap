<script setup>
import { inject } from 'vue';

const openModal = inject('openModal');

defineProps({
  text: String,
  url: String,
});
</script>

<template>
  <button @click="openModal">
    <img :src="url || '/icons/tether-small.svg'" width="26" height="26" alt="" />

    <span>{{ text || 'USDT' }}</span>

    <svg width="7" height="6" viewBox="0 0 7 6" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path opacity="0.5" d="M3.5 6L0.468912 0.749999L6.53109 0.75L3.5 6Z" fill="#22212E" />
</svg>
  </button>
</template>

<style scoped>
button {
  display: flex;
  align-items: center;
  max-width: fit-content;
  width: 100%;
  padding: 5px;
  background: #eeedf0;
  height: 35px;
  border-radius: 50px;
  gap: 6px;
  z-index: 3;
}
button img {
  width: 25px;
  height: 25px;
}
button span {
  font-family: var(--font-family);
  font-weight: 400;
  font-size: clamp(14px, 3vw, 17px);
  color: #22212e;
}
</style>
