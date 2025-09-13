import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
export const usePoolStepsStore = defineStore('PoolStepsStore', () => {
  const currentStep = ref(1);

  let id = 1;

  const steps = ref([
    {
      id: id++,
      text: 'Select a token pair and fees',
      isActive: true,
    },
    {
      id: id++,
      text: 'Set the price range',
      isActive: false,
    },
    {
      id: id++,
      text: 'Select the deposit amount',
      isActive: false,
    },
  ]);
  const activeSteps = computed(() => {
    return steps.value.map((step, index) => ({
      ...step,
      isActive: index + 1 === currentStep.value,
    }));
  });

  return { currentStep, steps, activeSteps };
});
