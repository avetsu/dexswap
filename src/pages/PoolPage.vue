<script setup>
import PoolsDefault from '@/components/pools/default/PoolsDefault.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const isCreatePage = computed(() => route.path === '/pool/create');
const isNFTPage = computed(() => route.path === '/pool/nft');

const isOtherPage = computed(() => isNFTPage.value || isCreatePage.value);
</script>

<template>
  <PoolsDefault v-if="!isOtherPage" />
  <RouterView />
</template>

<style scoped></style>
