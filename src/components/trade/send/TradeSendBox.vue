<script setup>
import { ethers } from 'ethers';
import TradeSendCard from '@/components/trade/send/TradeSendCard.vue';
import TradeSendwallet from '@/components/trade/send/TradeSendWallet.vue';
import UIButton from '@/components/ui/UIButton.vue';
import { transferTokens } from '@/blockchain/pools';
import { useTradeStore } from '@/stores/TradeStore';
import { storeToRefs } from 'pinia';

const tradeStore = useTradeStore();

const { tokenToSend, recipient } = storeToRefs(tradeStore);

const sendTokens = () => {
  transferTokens(
    tokenToSend.value.address,
    recipient.value,
    ethers.utils.parseUnits(tokenToSend.value.amount.toString(), tokenToSend.value.decimals),
  );
};
</script>

<template>
  <div class="send-wrapper">
    <TradeSendCard />
    <TradeSendwallet />
    <UIButton @click="sendTokens" :condition="tokenToSend.amount == 0 || recipient == 0"
      >Send</UIButton
    >
  </div>
</template>

<style scoped>
.send-wrapper {
  display: flex;
  flex-direction: column;
  gap: 17px;
}
</style>
