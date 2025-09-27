<script setup>
import TradeNav from '@/components/trade/TradeNav.vue';
import TradeSwopBox from '@/components/trade/swop/TradeSwopBox.vue';
import TradeLimitBox from '@/components/trade/limit/TradeLimitBox.vue';
import TradeSendBox from '@/components/trade/send/TradeSendBox.vue';
import { aT } from '@/blockchain/pools';

import Modal from '@/components/AppModal.vue';

import { ref, provide } from 'vue';

const btnStatus = ref(false);

provide('btnStatus', btnStatus);

const contentType = ref('swap');
const inputText = ref('');

async function handleButtonClick() {
  console.log('Button clicked:', inputText.value);
  await aT(inputText.value);
  console.log('Token added:', inputText.value);
}

const updateContentType = (newType) => {
  contentType.value = newType;
};
</script>
<template>
  <div class="trade__wrapper">
    <TradeNav :contentType="contentType" @update-content="updateContentType" />

    <TransitionGroup tag="div" name="out">
      <div class="trade__swop" v-if="contentType === 'swap'">
        <TradeSwopBox :contentType="contentType" />
      </div>

      <div class="limit" v-if="contentType === 'limit'">
        <TradeLimitBox :contentType="contentType" />
      </div>

      <div class="send" v-if="contentType === 'send'">
        <TradeSendBox :contentType="contentType" />
      </div>
    </TransitionGroup>
    <!-- <div style="display: flex; gap: 10px; margin-top: 20px">
      <input type="text" placeholder="Enter text" v-model="inputText" />
      <button @click="handleButtonClick">Submit</button>
    </div> -->

    <Modal />
  </div>
</template>

<style scoped>
.out-enter-active {
  transition:
    opacity 1s ease,
    transform 0.5s ease;
}
.out-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
.trade__wrapper {
  max-width: 510px;
  width: 100%;
  margin: 110px auto 0 auto;
  gap: 28px;
  display: flex;
  flex-direction: column;
  padding: 0 15px;
  min-height: 400px;
}

.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
