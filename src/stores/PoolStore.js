import { defineStore } from 'pinia';
import { ref, useId } from 'vue';

import { usePoolPairStore } from './PoolPairStore';
import { usePoolPricesStore } from './PoolPricesStore';
import { usePoolDepositStore } from './PoolDepositStore';
import { usePoolStepsStore } from './PoolStepsStore';
export const usePoolStore = defineStore('PoolStore', () => {
  const pairStore = usePoolPairStore();
  const priceStore = usePoolPricesStore();
  const depositStore = usePoolDepositStore();
  const stepsStore = usePoolStepsStore();
  const isCreating = ref(false);
  const finalData = ref([]);

  const handleContinueClick = () => {
    const isPairValid = pairStore.isPairValid();
    const isRangeValid = priceStore.isRangeValid();
    if (!isPairValid) {
      return;
    }
    if (!isRangeValid) {
      return;
    }

    if (stepsStore.currentStep === 1) {
      pairStore.isFilledPair = true;

      stepsStore.currentStep++;
    } else if (stepsStore.currentStep === 2) {
      priceStore.isFilledPrice = true;

      stepsStore.currentStep++;
    } else if (stepsStore.currentStep === 3) {
      // finalData.value.push({
      //   id: useId(),
      //   pairData: { ...pairStore.formDataPair },
      //   priceData: { ...priceStore.formDataPrice },
      //   depositData: { ...depositStore.formDataDeposit },
      //   type: 'created',
      // });
      // stepsStore.currentStep = 1;
      // isCreating.value = false;
      // priceStore.isFilledPrice = false;
      // pairStore.isFilledPair = false;
      // resetAll();
    }
  };

  const resetAll = () => {
    pairStore.resetPair();
    priceStore.resetPrice();
    depositStore.resetDeposit();
  };

  return { handleContinueClick, finalData, isCreating, resetAll };
});
