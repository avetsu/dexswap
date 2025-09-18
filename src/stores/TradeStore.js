import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTradeStore = defineStore('TradeStore', () => {
  let currentTab = ref('swap');

  const switchTab = (tab) => {
    currentTab.value = tab;
  };

  const tokenA = ref('0.00');
  const tokenB = ref('0.00');

  return {
    currentTab,
    switchTab,
    tokenA,
    tokenB,
  };
});
