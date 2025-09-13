<script setup>
import TradeSendCard from '@/components/trade/send/TradeSendCard.vue';
import TradeSendwallet from '@/components/trade/send/TradeSendWallet.vue';
import UIButton from '@/components/ui/UIButton.vue';
</script>

<template>
  <div class="send-wrapper">
    <TradeSendCard />
    <TradeSendwallet />
    <UIButton>Send</UIButton>
  </div>
</template>

<style scoped>
.send-wrapper {

  display: flex;
  flex-direction: column;
  gap: 17px;
}
</style>
