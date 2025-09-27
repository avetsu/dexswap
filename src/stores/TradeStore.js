import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTradeStore = defineStore('TradeStore', () => {
  let currentTab = ref('swap');

  const switchTab = (tab) => {
    currentTab.value = tab;
  };

  const tokenA = ref({ amount: 0, address: '', decimals: 0, symbol: '' });
  const tokenB = ref({ amount: 0, address: '', decimals: 0, symbol: '' });
  const tokenToSend = ref({ amount: 0, address: '', decimals: 0, symbol: '' });

  const recipient = ref('');
  const txState = ref(0);
  const rate = ref(0);
  const rateToCurrency = ref(0);
  const feeToCurrency = ref(0);

  return {
    currentTab,
    switchTab,
    tokenA,
    tokenB,
    txState,
    rate,
    rateToCurrency,
    feeToCurrency,
    tokenToSend,
    recipient,
  };
});
