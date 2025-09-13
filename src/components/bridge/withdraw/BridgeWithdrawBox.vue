<script setup>
import BridgeCards from '@/components/bridge/BridgeCards.vue';
import BridgeAmount from '@/components/bridge/BridgeAmount.vue';
import BridgeTransferTime from '@/components/bridge/BridgeTransferTime.vue';
import UIButton from '@/components/ui/UIButton.vue';
import { ref } from 'vue';

const cardsData = ref({
  fromName: 'Cyber',
  toName: 'Ethereum',
  logoUrlFrom: '',
  logoUrlTo: '',
});

const transferData = ref({
  time: '~7 days',
  geas: '0.000072 ETH',
});
</script>

<template>
  <div class="bridge-withdraw">
    <BridgeCards
      :fromName="cardsData.fromName"
      :toName="cardsData.toName"
      :logoUrlFrom="cardsData.logoUrlFrom"
      :logoUrlTo="cardsData.logoUrlTo"
    />
    <BridgeAmount :name="cardsData.fromName" />
    <BridgeTransferTime :time="transferData.time" :geas="transferData.geas" />
    <UIButton> Withdraw </UIButton>
  </div>
</template>

<style scoped>
.bridge-withdraw {
  display: flex;
  flex-direction: column;
}
</style>
