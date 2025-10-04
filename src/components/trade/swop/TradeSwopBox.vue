<script setup>
import { ref } from 'vue';
import { ethers } from 'ethers';
import TradeSwopCards from '@/components/trade/TradeCards.vue';
import UIButton from '@/components/ui/UIButton.vue';
import TradeDropdown from '@/components/trade/swop/TradeDropdown.vue';
import TradeInProcess from '@/components/trade/swop/TradeInProcess.vue';
import {
  multihopSwap,
  SWAP_ROUTER02_ADDRESS,
  approveTokens,
  WrapETH,
  UnwrapETH,
} from '@/blockchain/pools';
import { useTradeStore } from '@/stores/TradeStore';
import { storeToRefs } from 'pinia';

const tradeStore = useTradeStore();

const { tokenA, tokenB, txState, refresh } = storeToRefs(tradeStore);

const inProgress = ref(false);
const btnStatus = ref(false);
const tx_approve = ref(null);
const tx_swap = ref(null);
const convert = async () => {
  txState.value = 0;
  inProgress.value = true;
  btnStatus.value = true;
  console.log('tokenB', tokenB.value.symbol);
  if (tokenA.value.symbol === 'ETH') {
    console.log('wrap', Number(tokenA.value.amount) + 1);
    try {
      await WrapETH(tokenA.value.address, tokenA.value.amount);
    } catch (error) {
      console.error('Error during wrap:', error);
      txState.value = 9;
      inProgress.value = false;
      btnStatus.value = false;
      return;
    }
    console.log(
      'aa',
      tokenA.value.address,
      tokenA.value.symbol,
      SWAP_ROUTER02_ADDRESS,
      ethers.utils.parseUnits(tokenA.value.amount, tokenA.value.decimals),
    );
    try {
      tx_approve.value = await approveTokens(
        tokenA.value.address,
        SWAP_ROUTER02_ADDRESS,
        ethers.utils.parseUnits(tokenA.value.amount, tokenA.value.decimals),
      );
    } catch (error) {
      console.error('Error during approve:', error);
      txState.value = 9;
      inProgress.value = false;
      btnStatus.value = false;
      return;
    }
    txState.value = 1;
    txState.value = 2;
    try {
      tx_swap.value = await multihopSwap(
        tokenA.value.address,
        tokenB.value.address,
        tokenA.value.amount,
      );
    } catch (error) {
      txState.value = 10;
      inProgress.value = false;
      btnStatus.value = false;
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 2000));
    txState.value = 0;
    inProgress.value = false;
    btnStatus.value = false;
    return;
  }

  if (tokenB.value.symbol === 'ETH') {
    console.log(
      'aa',
      tokenA.value.address,
      tokenA.value.symbol,
      SWAP_ROUTER02_ADDRESS,
      ethers.utils.parseUnits(tokenA.value.amount, tokenA.value.decimals),
    );
    try {
      tx_approve.value = await approveTokens(
        tokenA.value.address,
        SWAP_ROUTER02_ADDRESS,
        ethers.utils.parseUnits(tokenA.value.amount, tokenA.value.decimals),
      );
    } catch (error) {
      console.error('Error during approve:', error);
      txState.value = 9;
      inProgress.value = false;
      btnStatus.value = false;
      return;
    }
    txState.value = 1;
    txState.value = 2;
    try {
      tx_swap.value = await multihopSwap(
        tokenA.value.address,
        tokenB.value.address,
        tokenA.value.amount,
      );
    } catch (error) {
      txState.value = 10;
      inProgress.value = false;
      btnStatus.value = false;
      return;
    }
    console.log('unwrap', Number(tokenA.value.amount) + 1);
    try {
      await UnwrapETH(tokenB.value.address, tokenB.value.amount);
    } catch (error) {
      console.error('Error during wrap:', error);
      txState.value = 9;
      inProgress.value = false;
      btnStatus.value = false;
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 2000));
    txState.value = 0;
    inProgress.value = false;
    btnStatus.value = false;
    return;
  }

  try {
    console.log(
      'a',
      tokenA.value.address,
      tokenA.value.symbol,
      SWAP_ROUTER02_ADDRESS,
      ethers.utils.parseUnits(tokenA.value.amount, tokenA.value.decimals),
    );
    tx_approve.value = await approveTokens(
      tokenA.value.address,
      SWAP_ROUTER02_ADDRESS,
      ethers.utils.parseUnits(tokenA.value.amount, tokenA.value.decimals),
    );
  } catch (error) {
    console.error('Error during approve:', error);
    txState.value = 9;
    inProgress.value = false;
    btnStatus.value = false;
    return;
  }
  txState.value = 1;
  txState.value = 2;
  console.log('swop', tokenA.value.address, tokenB.value.address, tokenA.value.amount);
  try {
    tx_swap.value = await multihopSwap(
      tokenA.value.address,
      tokenB.value.address,
      tokenA.value.amount,
    );
  } catch (error) {
    txState.value = 10;
    inProgress.value = false;
    btnStatus.value = false;
    return;
  }
  await new Promise((resolve) => setTimeout(resolve, 2000));
  txState.value = 0;
  inProgress.value = false;
  btnStatus.value = false;
  return;
};
const convertWrapper = async () => {
  await convert();
  refresh.value = true;
  console.log('refresh', refresh.value);
};
</script>

<template>
  <div class="swop__wrapper">
    <div class="swop__inner">
      <TradeSwopCards />
      <UIButton
        @click="convertWrapper"
        :progress="inProgress"
        :condition="tokenA.amount == 0 || tokenB.amount == 0"
        >Swap</UIButton
      >
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
