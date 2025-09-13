<script setup>
import { useTradeStore } from '@/stores/TradeStore';

const tradeStore = useTradeStore();

defineProps({
  contentType: String,
});

const emit = defineEmits(['update-content']);

const changeContent = (type) => {
  tradeStore.switchTab(type);
  emit('update-content', type);
};

const nav = [
  {
    name: 'swap',
    title: 'Swap',
  },
  {
    name: 'limit',
    title: 'Limit',
  },
  {
    name: 'send',
    title: 'Send',
  },
];
</script>

<template>
  <nav class="trade__nav">
    <button
      v-for="button in nav"
      :key="button.name"
      :class="{ 'btn-active': contentType === button.name }"
      class="trade__nav-btn trade__swop-btn"
      @click="changeContent(button.name)"
    >
      {{ button.title }}
    </button>
  </nav>
</template>

<style scoped>
.trade__nav {
  display: flex;
  align-items: center;
  gap: 41px;
}

.trade__nav-btn {
  font-family: var(--font-family);
  font-weight: 375;
  font-size: clamp(13px, 3vw, 18px);
  color: #22212e;
}
.btn-active {
  font-weight: 600;
}
</style>
