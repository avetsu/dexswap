<script setup>
defineProps({
  progress: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <button :class="progress ? 'btn-in-process' : ''">
    <template v-if="!progress">
      <slot />
    </template>
    <span v-else> In process... </span>
  </button>
</template>

<style scoped>
button {
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  width: 100%;
  background: #9ddf1e;
  font-family: var(--font-family);
  font-weight: 600;
  font-size: 14px;
  text-align: center;
  color: #fff;
  padding: 17px 0;
  transition: all 0.3s ease;
}
button:hover {
  opacity: 0.7;
}


.btn-in-process {
  background: linear-gradient(360deg, #1c1c23 0%, #24242a 100%);
  border: 1px solid rgba(255, 255, 255, 0.219);
  color: #fff;
  opacity: 0.5;
  pointer-events: none;
}
</style>
