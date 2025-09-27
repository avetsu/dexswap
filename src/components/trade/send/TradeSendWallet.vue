<script setup>
import { useTradeStore } from '@/stores/TradeStore';
import { storeToRefs } from 'pinia';

const tradeStore = useTradeStore();

const { recipient } = storeToRefs(tradeStore);

function onRecipientInput(e) {
  recipient.value = e.target.value;
}
</script>

<template>
  <form class="card__send-wallet">
    <span class="card__send-wallet-title">
      <span class="card__send-wallet-title-text">Enter your wallet address</span>
      <span class="card__send-wallet-left"></span>
      <span class="card__send-wallet-left-bottom"></span>
      <span class="card__send-wallet-left-bottom-angle"></span>
      <span class="card__send-wallet-right"></span>
      <span class="card__send-wallet-right-bottom"></span>
      <span class="card__send-wallet-right-bottom-angle"></span>
    </span>
    <input
      type="text"
      class="card__send-wallet-input"
      v-model="recipient"
      @input="onRecipientInput"
    />
  </form>
</template>

<style scoped>
.card__send-wallet {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  position: relative;
  padding: 14px;
  background-color: #fff;
  border-radius: 24px;
}
.card__send-wallet-title {
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 12px;
  color: #22212e;
  padding: 10px;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  background-color: #fff;
  max-width: fit-content;
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
}
.card__send-wallet-title-text {
  z-index: 3;
  position: relative;
}
.card__send-wallet-left {
  width: 30px;
  height: 30px;
  background-color: #eeedf0;
  position: absolute;
  border-bottom-right-radius: 24px;
  top: 0px;
  left: -15px;
  transform: translateX(-50%);
  z-index: 2;
}

.card__send-wallet-left-bottom {
  width: 30px;
  height: 30px;
  background-color: #fff;
  position: absolute;
  top: 10px;
  left: 0;
  transform: translateX(-50%);
  z-index: 1;
}
.card__send-wallet-left-bottom-angle {
  width: 30px;
  height: 30px;
  background-color: #fff;
  position: absolute;
  top: -17px;
  left: -19px;
  transform: translateX(-50%);
  border-bottom-right-radius: 24px;
  z-index: 3;
}
.card__send-wallet-right-bottom-angle {
  width: 30px;
  height: 30px;
  background-color: #fff;
  position: absolute;
  top: -17px;
  right: -19px;
  transform: translateX(50%);
  border-bottom-left-radius: 24px;
  z-index: 3;
}
.card__send-wallet-right {
  width: 30px;
  height: 30px;
  background-color: #eeedf0;
  position: absolute;
  border-bottom-left-radius: 24px;
  top: 0px;
  right: -15px;
  transform: translateX(50%);
  z-index: 2;
}

.card__send-wallet-right-bottom {
  width: 30px;
  height: 30px;
  background-color: #fff;
  position: absolute;
  top: 10px;
  right: 0;
  transform: translateX(50%);
  z-index: 1;
}

.card__send-wallet-text {
  font-family: var(--font-family);
  font-weight: 400;
  font-size: clamp(8px, 3vw, 12px);
  color: #fff;
  opacity: 0.5;
}
input {
  border: none;
  outline: none;
}
.card__send-wallet-input {
  border-radius: 10px;
  background: #eeedf0;
  height: 48px;
  padding: 15px 25px;
  font-family: var(--font-family);
  font-weight: 400;
  font-size: clamp(10px, 3vw, 15px);
  color: #22212e;
}
</style>
