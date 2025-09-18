import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const usePoolDepositStore = defineStore('PoolDepositStore', () => {
  const max = ref(4.52);
  const firstValue = ref(0);
  const secondValue = ref(0);

  const onFirstInput = (e) => {
    firstValue.value = Number(e.target.value.replace(',', '.'));
  };
  const onSecondInput = (e) => {
    secondValue.value = Number(e.target.value.replace(',', '.'));
  };

  const setMaxFirst = () => {
    firstValue.value = max.value;
  };
  const setMaxSecond = () => {
    secondValue.value = max.value;
  };

  const formDataDeposit = computed(() => ({
    max: firstValue.value,
    max2: secondValue.value,
    type: 'created',
  }));

  const resetDeposit = () => {
    firstValue.value = 0;
    secondValue.value = 0;
  };

  return {
    max,
    firstValue,
    secondValue,
    onFirstInput,
    onSecondInput,
    setMaxFirst,
    setMaxSecond,
    formDataDeposit,
    resetDeposit,
  };
});
