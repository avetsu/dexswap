<script setup>
import PoolsCreate from '@/components/pools/default/PoolsCreate.vue';
import PoolsLiquidity from '@/components/pools/default/PoolsLiquidity.vue';
import PoolsBestTVL from '@/components/pools/default/PoolsBestTVL.vue';
import PoolsBestTVLFilled from '@/components/pools/default/PoolsBestTVLFilled.vue';

import { ref, onMounted, onUnmounted } from 'vue';
import { usePoolStore } from '@/stores/PoolStore';
import { storeToRefs } from 'pinia';

const poolStore = usePoolStore();

const {finalData} = storeToRefs(poolStore)

let id = 1;

const poolsList = ref([
  {
    id: id++,
    logoUrl: '',
    names: {
      first: 'USDC',
      second: 'ETH',
    },
    percent: 0.05,
    tvl: 203.6,
    apr: 32.923,
    volume: 367.78,
  },
  {
    id: id++,
    logoUrl: '',
    names: {
      first: 'USDC',
      second: 'ETH',
    },
    percent: 0.05,
    tvl: 203.6,
    apr: 32.923,
    volume: 367.78,
  },
  {
    id: id++,
    logoUrl: '',
    names: {
      first: 'USDC',
      second: 'ETH',
    },
    percent: 0.05,
    tvl: 203.6,
    apr: 32.923,
    volume: 367.78,
  },
  {
    id: id++,
    logoUrl: '',
    names: {
      first: 'USDC',
      second: 'ETH',
    },
    percent: 0.05,
    tvl: 203.6,
    apr: 32.923,
    volume: 367.78,
  },
  {
    id: id++,
    logoUrl: '',
    names: {
      first: 'USDC',
      second: 'ETH',
    },
    percent: 0.05,
    tvl: 203.6,
    apr: 32.923,
    volume: 367.78,
  },
]);

const isMobile = ref(false);

const checkWidth = () => {
  window.innerWidth < 768 ? (isMobile.value = true) : (isMobile.value = false);
};

checkWidth();

onMounted(() => {
  window.addEventListener('resize', checkWidth);
});
onUnmounted(() => {
  window.removeEventListener('resize', checkWidth);
});
</script>

<template>
  <div class="pool-wrapper" v-if="finalData.length === 0">
    <div class="pool-content">
      <PoolsCreate :resultData="finalData" />
      <PoolsLiquidity v-if="!isMobile" />
    </div>

    <PoolsBestTVL :pools="poolsList" v-if="finalData.length === 0" />
    <PoolsLiquidity v-if="isMobile" />
  </div>

  <div class="pool-filled-wrapper" v-if="finalData.length !== 0">
    <PoolsCreate :resultData="finalData" />
    <div class="pool-filled__content">
      <PoolsBestTVLFilled :poolList="poolsList" />
      <PoolsLiquidity />
    </div>
  </div>
</template>

<style scoped>
.pool-wrapper {
  max-width: 1325px;
  padding: 0 15px;
  margin: 80px auto 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

@media (max-width: 768px) {
  .pool-wrapper {
    display: flex;
    flex-direction: column;
    gap: 41px;
    padding: 0 12px;
    margin: 25px auto 0 auto;
  }
}
.pool-content {
  display: flex;
  justify-content: space-between;
  gap: 30px;
}

.pool-filled-wrapper {
  max-width: 1325px;
  padding: 0 15px;
  margin: 80px auto 0 auto;
  width: 100%;
  display: flex;
  gap: 30px;
  justify-content: space-between;
}

.pool-filled__content {
  display: flex;
  flex-direction: column;
  gap: 41px;
  max-width: 429px;
  width: 100%;
}
@media (max-width: 900px) {
  .pool-filled-wrapper {
    flex-direction: column;
    margin: 25px auto 0 auto;
  }
  .pool-filled__content {
    max-width: none;
  }
}
</style>
