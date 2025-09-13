import { defineStore } from 'pinia';
import { ref, useId, computed } from 'vue';
import { usePoolStepsStore } from './PoolStepsStore';
import { usePoolPricesStore } from './PoolPricesStore';

export const usePoolPairStore = defineStore('PoolPairStore', () => {
  const stepsStore = usePoolStepsStore();
  const priceStore = usePoolPricesStore();

  const pairsFirst = ref([
    {
      id: useId(),
      name: 'LINK',
      address: '0x779877A7B0D9E8603169DdbD7836e478b4624789',
      decimals: 6,
      logoUrl: '',
    },
    { id: useId(), name: 'USDC', address: '', logoUrl: '' },
    { id: useId(), name: 'USDC', address: '', logoUrl: '' },
    { id: useId(), name: 'USDC', address: '', logoUrl: '' },
  ]);

  const pairsSecond = ref([
    {
      id: useId(),
      name: 'PYUSD',
      address: '0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9',
      decimals: 18,
      logoUrl: '',
    },
    { id: useId(), name: 'ETH', address: '', logoUrl: '' },
    { id: useId(), name: 'ETH', address: '', logoUrl: '' },
    { id: useId(), name: 'ETH', address: '', logoUrl: '' },
  ]);

  const isSelectedFirst = ref(false);
  const isSelectedSecond = ref(false);

  const defaultSelectFirst = ref({ id: null, name: 'Choose a token', address: '', logoUrl: '' });
  const defaultSelectSecond = ref({ id: null, name: 'Choose a token', address: '', logoUrl: '' });

  const isSelectingFirst = ref(false);
  const isSelectingSecond = ref(false);

  const changeSelectFirst = (pair) => {
    defaultSelectFirst.value = { ...pair, isActive: true };
    isSelectedFirst.value = true;
    isSelectingFirst.value = false;
    isValidFirst.value = true;
  };

  const changeSelectSecond = (pair) => {
    defaultSelectSecond.value = { ...pair, isActive: false };
    isSelectedSecond.value = true;
    isSelectingSecond.value = false;
    isValidSecond.value = true;
  };

  const commission = ref([
    {
      id: useId(),
      value: 0.05,
      isActive: true,
    },
    {
      id: useId(),
      value: 0.25,
      isActive: false,
    },
    {
      id: useId(),
      value: 1,
      isActive: false,
    },
  ]);

  const selectCommission = (index) => {
    commission.value.forEach((item) => {
      item.isActive = item.id === index;
    });
  };

  const isValidFirst = ref(true);
  const isValidSecond = ref(true);
  const isFilledPair = ref(false);

  const isPairValid = () => {
    isValidFirst.value = defaultSelectFirst.value.name !== 'Choose a token';
    isValidSecond.value = defaultSelectSecond.value.name !== 'Choose a token';

    return isValidFirst.value && isValidSecond.value;
  };

  const selectedPair = computed(() => ({
    pair: [defaultSelectFirst.value, defaultSelectSecond.value],
    names: `${defaultSelectFirst.value.name} / ${defaultSelectSecond.value.name}`,
    logoUrl: '',
    commission: commission.value.find((item) => item.isActive)?.value || 0,
  }));

  function changeStatusPair() {
    defaultSelectFirst.value.isActive = !defaultSelectFirst.value.isActive;
    defaultSelectSecond.value.isActive = !defaultSelectSecond.value.isActive;
  }

  const pairEditClick = () => {
    stepsStore.currentStep = 1;
    priceStore.isFilledPrice = false;
    isFilledPair.value = false;
  };

  const formDataPair = computed(() => ({
    tokens: {
      first: defaultSelectFirst.value.name,
      second: defaultSelectSecond.value.name,
      logoUrl: defaultSelectFirst.value.logoUrl,
    },
    commission: commission.value.find((item) => item.isActive)?.value || 0,
  }));

  function getDataPair() {
    return formDataPair.value;
  }

  function resetPair() {
    defaultSelectFirst.value = { id: null, name: 'Choose a token', address: '', logoUrl: '' };
    defaultSelectSecond.value = { id: null, name: 'Choose a token', address: '', logoUrl: '' };
    isSelectedFirst.value = false;
    isSelectedSecond.value = false;
    commission.value.forEach((item, i) => {
      item.isActive = false;
      if (i === 0) {
        item.isActive = true;
      }
    });
  }

  return {
    pairsFirst,
    pairsSecond,
    isSelectedFirst,
    isSelectedSecond,
    defaultSelectFirst,
    defaultSelectSecond,
    isSelectingFirst,
    isSelectingSecond,
    changeSelectFirst,
    changeSelectSecond,
    pairEditClick,
    commission,
    selectCommission,
    isValidFirst,
    isValidSecond,
    isFilledPair,
    isPairValid,
    selectedPair,
    formDataPair,
    getDataPair,
    resetPair,
    changeStatusPair,
  };
});
