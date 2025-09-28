<script setup>
import { ethers } from 'ethers';
import { ref, useId, onMounted } from 'vue';
import tokensJson from '@/blockchain/tokens.json';
import { multihopQuote, poolExists } from '@/blockchain/pools';

const emit = defineEmits(['close', 'selectToken']);
const selectToken = (token) => {
  emit('selectToken', token);
  emit('close');
};
const getDollarValue = async (token) => {
  let dollarvalue = 0;
  if (token.address !== '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238') {
    let op = await multihopQuote(token.address, '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238', '1');
    dollarvalue = op;
  } else {
    dollarvalue = 1;
  }
  return dollarvalue;
};
const tokens = ref([]);

onMounted(async () => {
  const enriched = await Promise.all(
    tokensJson.map(async (token) => {
      if (token.address === '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238') {
        return {
          ...token,
          id: useId(),
          dollars: 1,
          usdt: 1,
        };
      }
      const exists = await poolExists(
        token.address,
        '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238',
        500,
      );

      if (!exists) return null;
      const dollarvalue = Math.floor((await getDollarValue(token)) * 100) / 100;
      return {
        ...token,
        id: useId(),
        dollars: dollarvalue,
        usdt: dollarvalue,
      };
    }),
  );

  tokens.value = enriched.filter(Boolean);
});
</script>

<template>
  <div class="modal-content__tokens">
    <h2 class="modal__title">
      <span class="modal__title-text">Select a token</span>
      <span class="modal-angle-left-top"></span>
      <span class="modal-angle-left-bottom"></span>
      <span class="modal-angle-left-bottom-bg"></span>
      <span class="modal-angle-right-top"></span>
      <span class="modal-angle-right-bottom"></span>
      <span class="modal-angle-right-bottom-bg"></span>
    </h2>

    <form class="modal__search">
      <label for="modalSearch">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 19L14.65 14.65M17 9C17 13.4183 13.4183 17 9 17C4.58172 17 1 13.4183 1 9C1 4.58172 4.58172 1 9 1C13.4183 1 17 4.58172 17 9Z"
            stroke="#22212E"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </label>

      <input
        type="text"
        name="modalSearch"
        class="modal__search-input"
        placeholder="Search by name or paste address"
      />
    </form>

    <ul class="modal__tokens-list">
      <li
        class="modal__token-item"
        v-for="token in tokens"
        :key="token.id"
        :id="token.id"
        @click="selectToken(token)"
      >
        <img :src="token.logoURI" alt="" class="modal__token-logo" width="50" height="50" />

        <div class="modal__token-info">
          <span class="modal__token-name">
            {{ token.name }}
          </span>

          <span class="modal__token-value">
            {{ token.usdt.toLocaleString('en-US').replace(',', ' ') }} USDT
          </span>
        </div>

        <span class="modal__token-dollars">
          $ {{ token.dollars.toLocaleString('en-US').replace(',', ' ') }}
        </span>

        <button class="modal__pin-btn" v-if="token.isPinned">
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.65685 14.3906L1 20.0475M9.97454 5.41611L8.41365 6.97699C8.28633 7.10432 8.22267 7.16798 8.15014 7.21856C8.08576 7.26347 8.01631 7.30063 7.94324 7.32929C7.86092 7.36158 7.77264 7.37924 7.59607 7.41455L3.93161 8.14744C2.9793 8.3379 2.50315 8.43314 2.28039 8.68419C2.08632 8.9029 1.9977 9.19559 2.03786 9.48522C2.08395 9.81767 2.42731 10.161 3.11402 10.8477L10.1998 17.9335C10.8865 18.6202 11.2298 18.9636 11.5623 19.0096C11.8519 19.0498 12.1446 18.9612 12.3633 18.7671C12.6144 18.5444 12.7096 18.0682 12.9001 17.1159L13.633 13.4514C13.6683 13.2749 13.6859 13.1866 13.7182 13.1043C13.7469 13.0312 13.784 12.9617 13.8289 12.8974C13.8795 12.8248 13.9432 12.7612 14.0705 12.6338L15.6314 11.073C15.7128 10.9916 15.7535 10.9509 15.7982 10.9153C15.838 10.8837 15.8801 10.8552 15.9242 10.8301C15.9738 10.8017 16.0267 10.779 16.1325 10.7337L18.6269 9.66469C19.3546 9.35282 19.7184 9.19688 19.8837 8.9449C20.0282 8.72454 20.0799 8.45604 20.0276 8.19777C19.9677 7.90243 19.6878 7.62251 19.128 7.06269L13.9848 1.91955C13.425 1.35972 13.1451 1.07981 12.8497 1.01994C12.5915 0.967582 12.323 1.01929 12.1026 1.16382C11.8506 1.3291 11.6947 1.69295 11.3828 2.42065L10.3138 4.91501C10.2685 5.02082 10.2458 5.07373 10.2174 5.12334C10.1923 5.16742 10.1638 5.20951 10.1322 5.24926C10.0967 5.294 10.0559 5.3347 9.97454 5.41611Z"
              stroke="#22212E"
              stroke-opacity="0.4"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.modal-content__tokens {
  display: flex;
  flex-direction: column;
  padding-top: 50px;
}

.modal__title {
  font-family: var(--font-family);
  font-weight: 600;
  font-size: clamp(20px, 2vw, 28px);
  text-align: center;
  color: #22212e;
  max-width: fit-content;
  width: 100%;
  background-color: #eeedf0;
  backdrop-filter: blur(20px);
  padding: 0 30px 5px 30px;
  display: block;
  position: absolute;
  left: 50%;
  top: 0px;
  white-space: nowrap;
  transform: translateX(-50%);
  z-index: 1;
}
.modal__title-text {
  position: relative;
  z-index: 5;
}
.modal-angle-left-top {
  position: absolute;
  height: 21px;
  width: 21px;
  background-color: #fff;
  border-top-right-radius: 36px;
  left: 0;
  bottom: clamp(6px, 1vw, 15px);
  z-index: 1;
}
.modal-angle-left-bottom {
  position: absolute;
  height: 21px;
  width: 21px;
  background-color: #eeedf0;
  border-bottom-left-radius: 25px;
  left: 21px;
  bottom: 0;
  z-index: 3;
}
.modal-angle-left-bottom-bg {
  position: absolute;
  height: 21px;
  width: 40px;
  background-color: #fff;
  left: -1px;
  bottom: -6px;
  z-index: 2;
}
.modal-angle-right-top {
  position: absolute;
  height: 21px;
  width: 21px;
  background-color: #fff;
  border-top-left-radius: 36px;
  right: 0;
  bottom: clamp(6px, 1vw, 15px);
  z-index: 1;
}
.modal-angle-right-bottom {
  position: absolute;
  height: 21px;
  width: 21px;
  background-color: #eeedf0;
  border-bottom-right-radius: 25px;
  right: 21px;
  bottom: 0;
  z-index: 3;
}
.modal-angle-right-bottom-bg {
  position: absolute;
  height: 21px;
  width: 40px;
  background-color: #fff;
  right: -1px;
  bottom: -6px;
  z-index: 2;
}

.modal__search {
  max-width: 442px;
  width: 100%;
  position: relative;
  margin-bottom: 45px;
}
.modal__pin-btn {
  position: absolute;
  top: 13px;
  right: 12px;
}
.modal__search-input {
  width: 100%;
  border: 1px solid #eeedf0;
  border-radius: 10px;
  background: #eeedf0;
  height: 55px;
  padding: 20px 52px;
  font-family: var(--second-family);
  font-weight: 400;
  font-size: 14px;
  color: #22212e;
}

.modal__search-input::placeholder {
  opacity: 0.3;
}

label {
  position: absolute;
  left: 18px;
  top: 19px;
  z-index: 2;
  pointer-events: none;
}

.modal__tokens-list {
  display: flex;
  flex-direction: column;
  gap: 23px;
  width: 100%;
  height: 342px;
  overflow-y: auto;
  padding-right: 8px;
}

.modal__tokens-list::-webkit-scrollbar {
  width: 7px;
}

.modal__tokens-list::-webkit-scrollbar-thumb {
  border-radius: 40px;
  background: #9ddf1e;
}

.modal__tokens-list::-webkit-scrollbar-track {
  background: #66666641;
  border-radius: 40px;
}

.modal__token-item {
  display: flex;
  align-items: center;
  gap: 20px;
  background: rgba(217, 217, 217, 0.05);
  transition: background 0.3s ease;
  border-radius: 23px;
  overflow: hidden;
  padding-right: 51px;
  flex-shrink: 0;
  position: relative;
}

.modal__token-item:hover {
  background: rgba(217, 217, 217, 0.2);
}

.modal__token-info {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.modal__token-name {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: clamp(16px, 3vw, 22px);
  color: #22212e;
}

.modal__token-value {
  font-family: var(--second-family);
  font-weight: 400;
  font-size: clamp(10px, 3vw, 14px);
  color: #22212e;
  opacity: 0.3;
}

.modal__token-dollars {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: clamp(13px, 3vw, 18px);
  color: #22212e;
  margin-left: auto;
}
</style>
