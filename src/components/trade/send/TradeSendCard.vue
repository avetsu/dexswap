<script setup>
import { ethers } from 'ethers';
import UIButtonModal from '@/components/ui/UIButtonModal.vue';
import AppModal from '@/components/AppModal.vue';
import ModalTokens from '@/components/modals/ModalTokens.vue';
import { getTokenBalance, getQuote } from '@/blockchain/pools';
import { toReadableAmountWithDecimals, toFixedFloor } from '@/blockchain/functions';
import { ref, provide, onMounted } from 'vue';
import { useTradeStore } from '@/stores/TradeStore';
import { storeToRefs } from 'pinia';

const tradeStore = useTradeStore();

const { tokenToSend } = storeToRefs(tradeStore);

const isModalOpen = ref(false);

const openModal = () => (isModalOpen.value = true);
const closeModal = () => (isModalOpen.value = false);

provide('openModal', openModal);

const openModalFor = ref(null);
const tokenBalance = ref(0);
const tokenBalanceToCurrency = ref(0);
const currency = ref({ address: '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238', decimals: 6 });

const selectedToken = ref({
  name: 'USDT',
  logo: '/icons/tether-small.svg',
  address: '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238',
  decimals: 6,
});

onMounted(async () => {
  await getBalance();
  tokenToSend.value.address = selectedToken.value.address;
  tokenToSend.value.symbol = selectedToken.value.name;
  tokenToSend.value.decimals = selectedToken.value.decimals;
});

async function getBalance() {
  tokenBalance.value = toReadableAmountWithDecimals(
    await getTokenBalance(selectedToken.value.address),
    selectedToken.value.decimals,
  );
  if (selectedToken.value.address === currency.value.address) {
    tokenBalanceToCurrency.value = tokenBalance.value;
  } else {
    let op = await getQuote(
      selectedToken.value.address,
      currency.value.address,
      500,
      ethers.utils.parseUnits(tokenBalance.value.toString(), selectedToken.value.decimals),
      0,
    );
    tokenBalanceToCurrency.value = parseFloat(
      ethers.utils.formatUnits(op.amountOut, currency.value.decimals),
    );
  }
}

const selectToken = async (token) => {
  selectedToken.value = {
    name: token.title,
    logo: token.logo,
    address: token.address,
    decimals: token.decimals,
  };
  openModalFor.value = null;
  tokenToSend.value = selectedToken.value;
  tokenToSend.value.amount = 0;

  await getBalance();
};

function onTokenInput(e) {
  let filtered = e.target.value.replace(',', '.');
  filtered = filtered.replace(/[^0-9.]/g, '');
  if (/^0[0-9]+/.test(filtered)) {
    filtered = filtered.replace(/^0+/, '');
  }
  if (filtered === '' || filtered === '0') {
    tokenToSend.value.amount = '0';
    return;
  }
  const parts = filtered.split('.');
  if (parts.length > 2) {
    filtered = parts[0] + '.' + parts.slice(1).join('');
  }
  tokenToSend.value.amount = filtered;
}
</script>

<template>
  <AppModal :isOpen="isModalOpen" @close="closeModal">
    <ModalTokens @selectToken="selectToken" @close="closeModal" />
  </AppModal>
  <div class="send__card">
    <span class="send__card-top-name">
      SEND
      <span class="send-angle-left-top"></span>
      <span class="send-angle-left-bottom"></span>
      <span class="send-angle-left-bottom-bg"></span>
      <span class="send-angle-right-top"></span>
      <span class="send-angle-right-bottom"></span>
      <span class="send-angle-right-bottom-bg"></span>
    </span>
    <div class="send__card-content">
      <div class="send__card-value">
        <span class="send__card-value-name">You are sending</span>
        <input
          type="text"
          class="send__card-value-count"
          name="deposit-input-a"
          value="0"
          v-model="tokenToSend.amount"
          @input="onTokenInput"
        />
      </div>
      <div class="send__card-balance">
        <span class="send__card-balance-name"> Your balance </span>
        <div class="send__card-balance-counts">
          <span class="send__card-balance-wallet">
            <svg
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 6.43196V2.93261C14 2.10087 14 1.685 13.8248 1.42943C13.6717 1.20614 13.4346 1.05445 13.1678 1.00904C12.8623 0.957056 12.4847 1.13133 11.7295 1.47988L2.85901 5.57395C2.18551 5.8848 1.84875 6.04022 1.60211 6.28127C1.38406 6.49438 1.21762 6.75451 1.1155 7.04179C1 7.36675 1 7.73764 1 8.47942V13.432M14.5 12.932H14.51M1 9.63196L1 16.232C1 17.3521 1 17.9121 1.21799 18.3399C1.40973 18.7163 1.71569 19.0222 2.09202 19.214C2.51984 19.432 3.07989 19.432 4.2 19.432H15.8C16.9201 19.432 17.4802 19.432 17.908 19.214C18.2843 19.0222 18.5903 18.7163 18.782 18.3399C19 17.9121 19 17.3521 19 16.232V9.63196C19 8.51185 19 7.9518 18.782 7.52398C18.5903 7.14765 18.2843 6.84169 17.908 6.64995C17.4802 6.43196 16.9201 6.43196 15.8 6.43196L4.2 6.43196C3.0799 6.43196 2.51984 6.43196 2.09202 6.64994C1.7157 6.84169 1.40973 7.14765 1.21799 7.52398C1 7.9518 1 8.51185 1 9.63196ZM15 12.932C15 13.2081 14.7761 13.432 14.5 13.432C14.2239 13.432 14 13.2081 14 12.932C14 12.6558 14.2239 12.432 14.5 12.432C14.7761 12.432 15 12.6558 15 12.932Z"
                stroke="#22212E"
                stroke-opacity="0.6"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span class="send__card-balance-value"
              >{{ Math.floor(tokenBalance)
              }}<span
                >.{{
                  (tokenBalance.toString().split('.')[1] || '').slice(0, 10).replace(/0+$/, '') ||
                  '0'
                }}</span
              ></span
            >
          </span>
          <span class="send__card-balance-dollar"
            >${{ Math.floor(tokenBalanceToCurrency)
            }}<span
              >.{{ toFixedFloor(tokenBalanceToCurrency, 2).toString().split('.')[1] || '0' }}</span
            >
          </span>
        </div>
      </div>
    </div>
    <UIButtonModal
      class="send__card-btn"
      :url="selectedToken.logo"
      :text="selectedToken.name"
      @click="openModal"
    />
    <div class="send__card-cut">
      <span class="send__card-cut-left"></span>
      <span class="send__card-cut-left-bottom"></span>
      <span class="send__card-cut-right"></span>
      <span class="send__card-cut-right-bottom"></span>
    </div>
  </div>
</template>

<style scoped>
.send__card {
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-radius: 24px;
  background-color: #fff;
  padding: 14px 25px 40px 25px;
  position: relative;
}
.send__card-cut {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  max-width: fit-content;
  padding: 10px 90px;
  height: 30px;
  background-color: #eeedf0;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  z-index: 1;
}
.send__card-cut-left {
  position: absolute;
  width: 30px;
  height: 30px;
  background-color: #ffffff;
  left: -27px;
  bottom: 0;
  border-bottom-right-radius: 24px;
}
.send__card-cut-right {
  position: absolute;
  width: 30px;
  height: 30px;
  background-color: #ffffff;
  right: -27px;
  bottom: 0;
  border-bottom-left-radius: 24px;
}

.send__card-content {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.send__card-value {
  display: flex;
  flex-direction: column;
}
.send__card-value-name {
  margin-bottom: 10px;
}
.send__card-value-name,
.send__card-balance-name {
  font-family: var(--font-family);
  font-weight: 400;
  font-size: clamp(8px, 3vw, 12px);
  color: #22212e;
  opacity: 0.5;
  z-index: 4;
}
.send__card-value-count {
  width: clamp(29px, 19vw, 151px);
  border: none;
  font-family: var(--font-family);
  font-weight: 400;
  font-size: clamp(29px, 3vw, 40px);
  color: #22212e;
  align-items: start;
}
.send__card-balance {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.send__card-balance-counts {
  display: flex;
  gap: 23px;
  align-items: end;
}

.send__card-balance-wallet {
  display: flex;
  gap: 5px;
  align-items: end;
}
.send__card-balance-value {
  font-family: var(--font-family);
  font-weight: 400;
  font-size: clamp(16px, 3vw, 23px);
  text-align: right;
  color: rgba(34, 33, 46, 0.3);
  transform: translateY(1px);
}
.send__card-balance-value span {
  font-size: clamp(8px, 3vw, 11px);
}
.send__card-balance-dollar {
  font-family: var(--font-family);
  font-weight: 400;
  font-size: clamp(11px, 3vw, 15px);
  color: rgba(34, 33, 46, 0.3);
}
.send__card-balance-dollar span {
  font-size: clamp(5px, 3vw, 7px);
}

.send-angle-left-top {
  position: absolute;
  height: 21px;
  width: 21px;
  background-color: #fff;
  border-top-right-radius: 36px;
  left: 0;
  bottom: 0;
  z-index: 1;
}
.send-angle-left-bottom {
  position: absolute;
  height: 21px;
  width: 21px;
  background-color: #eeedf0;
  border-bottom-left-radius: 25px;
  left: 15px;
  bottom: 0;
  z-index: 3;
}
.send-angle-left-bottom-bg {
  position: absolute;
  height: 21px;
  width: 21px;
  background-color: #fff;
  left: 15px;
  bottom: -16px;
  z-index: 2;
}
.send-angle-right-top {
  position: absolute;
  height: 21px;
  width: 21px;
  background-color: #fff;
  border-top-left-radius: 36px;
  right: 0;
  bottom: 0;
  z-index: 1;
}
.send-angle-right-bottom {
  position: absolute;
  height: 21px;
  width: 21px;
  background-color: #eeedf0;
  border-bottom-right-radius: 25px;
  right: 15px;
  bottom: 0;
  z-index: 3;
}
.send-angle-right-bottom-bg {
  position: absolute;
  height: 21px;
  width: 21px;
  background-color: #fff;
  right: 15px;
  bottom: -16px;
  z-index: 2;
}
.send__card-top-name {
  font-family: var(--font-family);
  font-weight: 600;
  font-size: 18px;
  text-transform: uppercase;
  text-align: center;
  color: rgba(34, 33, 46, 0.2);
  max-width: fit-content;
  width: 100%;
  background-color: #eeedf0;
  padding: 5px clamp(50px, 4vw, 70px);
  display: block;
  position: absolute;
  left: 50%;
  top: -10px;
  transform: translateX(-50%);
  z-index: 1;
}
.send__card-btn {
  margin-top: 24px;
}
</style>
