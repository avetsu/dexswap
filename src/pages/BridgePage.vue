<script setup>
import BridgeNav from '@/components/bridge/BridgeNav.vue';
import BridgeDepositBox from '@/components/bridge/deposit/BridgeDepositBox.vue';
import BridgeWithdrawBox from '@/components/bridge/withdraw/BridgeWithdrawBox.vue';
import { ref, provide } from 'vue';

const btnStatus = ref(false);

provide('btnStatus', btnStatus);

const contentType = ref('deposit');

const updateContentType = (newType) => {
  contentType.value = newType;
};
</script>

<template>
  <div class="bridge-wrapper">
    <BridgeNav :contentType="contentType" @update-content="updateContentType" />
    <TransitionGroup tag="div" name="out" class="bridge-content" mode="in-out">
      <BridgeDepositBox v-if="contentType === 'deposit'" />
      <BridgeWithdrawBox v-if="contentType === 'withdraw'" />
    </TransitionGroup>
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
.bridge-wrapper {
  max-width: 510px;
  width: 100%;
  margin: 110px auto 0 auto;
  gap: 28px;
  display: flex;
  flex-direction: column;
  padding: 0 15px;
  min-height: 400px;
}



</style>
