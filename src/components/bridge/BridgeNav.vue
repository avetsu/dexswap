<script setup>
import { ref, useId } from 'vue';

defineProps({
  contentType: String,
});

const emit = defineEmits(['update-content']);

const changeContent = (type) => {
  emit('update-content', type);
};

const navList = ref([
  {
    id: useId(),
    name: 'deposit',
    title: 'Deposit',
  },
  {
    id: useId(),
    name: 'withdraw',
    title: 'Withdraw',
  },
]);
</script>

<template>
  <nav class="bridge__nav">
    <button
      class="bridge-nav__btn"
      v-for="btn in navList"
      :key="btn.id"
      :class="{ 'btn-active': contentType === btn.name }"
      @click="changeContent(btn.name)"
    >
      {{ btn.title }}
    </button>
  </nav>
</template>

<style scoped>
.bridge__nav {
  display: flex;
  align-items: center;
  gap: 41px;
}

.bridge-nav__btn {
  font-family: var(--font-family);
  font-weight: 300;
  font-size: clamp(13px, 3vw, 18px);
  color: #22212e;
}
.btn-active {
  font-weight: 600;
}
</style>
