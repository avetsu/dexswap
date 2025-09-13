<script setup>
import { ref } from 'vue';
import TradeSwopCards from '@/components/trade/TradeCards.vue';
import UIButton from '@/components/ui/UIButton.vue';
import TradeDropdown from '@/components/trade/swop/TradeDropdown.vue';
import TradeInProcess from '@/components/trade/swop/TradeInProcess.vue';

const inProgress = ref(false);
const btnStatus = ref(false);
const convert = () => {
  inProgress.value = true;
  btnStatus.value = true;
};


</script>

<template>
  <div class="swop__wrapper">
    <div class="swop__inner">
      <TradeSwopCards />
      <UIButton @click="convert" :progress="inProgress">Swap</UIButton>
    </div>
    <Transition name="fade">
      <TradeDropdown v-if="!btnStatus" />
      <TradeInProcess v-else />
    </Transition>
  </div>
</template>

<style>
.swop__wrapper {
  display: flex;
  flex-direction: column;
  gap: 28px;
}
.swop__inner {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
</style>
