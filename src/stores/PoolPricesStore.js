import { defineStore } from 'pinia';
import { ref, useId, computed } from 'vue';
import { usePoolStepsStore } from './PoolStepsStore';
export const usePoolPricesStore = defineStore('PoolPricesStore', () => {
  const stepsStore = usePoolStepsStore();

  const wallets = ref([
    {
      id: useId(),
      name: 'BNB',
      isActive: true,
    },
    {
      id: useId(),
      name: 'USDT',
      isActive: false,
    },
  ]);

  const ranges = ref([
    {
      id: useId(),
      name: 'Full range',
      isActive: true,
    },
    {
      id: useId(),
      name: 'Custom range',
      isActive: false,
    },
  ]);

  const currentRange = computed(() => {
    return ranges.value.find((item) => item.isActive === true).name;
  });
  const changeStatusWallet = (index) => {
    wallets.value.forEach((item) => {
      item.isActive = item.id === index;
    });
  };

  const changeStatusRange = (index) => {
    if (minValue.value === 0 && maxValue.value === Infinity) {
      ranges.value.forEach((item) => {
        item.isActive = item.id === index;
      });
    } else {
      minValue.value = '0';
      maxValue.value = '∞';
      ranges.value.forEach((item) => {
        item.isActive = item.id === index;
      });
    }
  };

  const minValue = ref('0');
  const maxValue = ref('∞');
  const isValidFirst = ref(true);
  const isValidSecond = ref(true);

  const onMinInput = (e) => {
    if (ranges.value[0].isActive) {
      ranges.value[0].isActive = false;
      ranges.value[1].isActive = true;
    }
  };
  const onMaxInput = () => {
    if (ranges.value[0].isActive) {
      ranges.value[0].isActive = false;
      ranges.value[1].isActive = true;
    }
  };

  const isRangeValid = () => {
    isValidFirst.value = !isNaN(Number(minValue.value));
    isValidSecond.value = !isNaN(Number(maxValue.value)) || maxValue.value === '∞';

    return isValidFirst.value && isValidSecond.value;
  };

  const computedPrice = computed(() => {
    return {
      min: minValue.value,
      max: maxValue.value,
    };
  });

  const isFilledPrice = ref(false);

  const formDataPrice = computed(() => ({
    wallet: {
      selected: wallets.value.find((item) => item.isActive === true).name,
      notSelected: wallets.value.find((item) => item.isActive === false).name,
    },
    range: ranges.value.find((item) => item.isActive === true).name,
    minValue: minValue.value,
    maxValue: maxValue.value === Infinity ? '∞' : maxValue.value,
  }));

  const priceEditClick = () => {
    stepsStore.currentStep = 2;
    isFilledPrice.value = false;
  };

  const resetPrice = () => {
    minValue.value = 0;
    maxValue.value = '∞';
    ranges.value.forEach((item, i) => {
      item.isActive = false;
      if (i === 0) {
        item.isActive = true;
      }
    });
  };

  return {
    wallets,
    ranges,
    changeStatusWallet,
    changeStatusRange,
    onMinInput,
    onMaxInput,
    priceEditClick,
    currentRange,
    computedPrice,
    isFilledPrice,
    formDataPrice,
    resetPrice,
    minValue,
    maxValue,
    isRangeValid,
  };
});
