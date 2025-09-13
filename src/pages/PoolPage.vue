<script setup>
import PoolsDefault from '@/components/pools/default/PoolsDefault.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const isCreatePage = computed(() => route.path === '/pool/create');
</script>

<template>
  <PoolsDefault v-if="!isCreatePage" />
  <RouterView />
 
</template>

<style scoped>

</style>
