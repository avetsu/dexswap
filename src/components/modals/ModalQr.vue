<script setup>
import { ref } from 'vue';
const copiedStatus = ref(false);
const copyWalletToClipboard = () => {
  navigator.clipboard.writeText('0x2...006728');
  copiedStatus.value = true;
  setTimeout(() => {
    copiedStatus.value = false;
  }, 3000);
};
</script>

<template>
  <div class="modal-content__qr">
    <h2 class="modal__title">
      <span class="modal__title-text">Получить токен</span>
      <span class="modal-angle-left-top"></span>
      <span class="modal-angle-left-bottom"></span>
      <span class="modal-angle-left-bottom-bg"></span>
      <span class="modal-angle-right-top"></span>
      <span class="modal-angle-right-bottom"></span>
      <span class="modal-angle-right-bottom-bg"></span>
    </h2>
    <div class="modal-content__qr-name">
      <span class="modal-content__qr-text">Noname</span>
      <div class="modal-content__qr-wallet">
        <span class="modal-content__qr-wallet-text">0x2...006728</span>
        <button class="modal-content__qr-wallet-copy" @click="copyWalletToClipboard">
          <svg
            width="13"
            height="13"
            viewBox="0 0 13 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.65 8.15C2.13746 8.15 1.8812 8.15 1.67905 8.06627C1.40952 7.95462 1.19538 7.74048 1.08373 7.47095C1 7.2688 1 7.01254 1 6.5V2.76C1 2.14394 1 1.83591 1.11989 1.60061C1.22535 1.39363 1.39363 1.22535 1.60061 1.11989C1.83591 1 2.14394 1 2.76 1H6.5C7.01254 1 7.2688 1 7.47095 1.08373C7.74048 1.19538 7.95462 1.40952 8.06627 1.67905C8.15 1.8812 8.15 2.13746 8.15 2.65M6.61 12H10.24C10.8561 12 11.1641 12 11.3994 11.8801C11.6064 11.7746 11.7746 11.6064 11.8801 11.3994C12 11.1641 12 10.8561 12 10.24V6.61C12 5.99394 12 5.68591 11.8801 5.45061C11.7746 5.24363 11.6064 5.07535 11.3994 4.96989C11.1641 4.85 10.8561 4.85 10.24 4.85H6.61C5.99394 4.85 5.68591 4.85 5.45061 4.96989C5.24363 5.07535 5.07535 5.24363 4.96989 5.45061C4.85 5.68591 4.85 5.99394 4.85 6.61V10.24C4.85 10.8561 4.85 11.1641 4.96989 11.3994C5.07535 11.6064 5.24363 11.7746 5.45061 11.8801C5.68591 12 5.99394 12 6.61 12Z"
              stroke="#9DDF1E"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
      <span class="modal-content__copied" v-if="copiedStatus"> Текст скопирован! </span>
    </div>
    <div class="modal-content__qr-img">
      <img :src="'/img/qr.png'" alt="qr" />
    </div>
    <span class="modal-content__qr-bottom-text">
      Вы можете отправлять и получать токены и NFT во всех наших поддерживаемых сетях
    </span>
  </div>
</template>

<style scoped>
.modal-content__qr {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 60px;
}
.modal__title {
  font-family: var(--font-family);
  font-weight: 600;
  font-size: clamp(20px, 5vw, 28px);
  text-align: center;
  color: #22212e;
  max-width: fit-content;
  width: 100%;
  background-color: #eeedf083;
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
  bottom:  clamp(6px, 1vw, 15px);
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
.modal-content__qr-name {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
}
.modal-content__qr-text {
  font-family: var(--third-family);
  font-weight: 700;
  font-size: clamp(10px, 3vw, 12px);
  color: #22212e;
}

.modal-content__qr-wallet {
  display: flex;
  align-items: center;
  gap: 9px;
}
.modal-content__qr-wallet-text {
  font-family: var(--third-family);
  font-weight: 400;
  font-size: clamp(10px, 3vw, 12px);
  color: #22212e;
}
.modal-content__qr-img {
  border-radius: 20px;
  background: #eeedf0;
  padding: 9px 6px;
  margin-bottom: 30px;
}
.modal-content__qr-img img {
  mix-blend-mode: darken;
}
.modal-content__qr-bottom-text {
  font-family: var(--third-family);
  font-weight: 400;
  font-size: clamp(10px, 3vw, 12px);
  text-align: center;
  color: #22212e;
}
.modal-content__copied {
  font-family: var(--third-family);
  font-weight: 400;
  font-size: clamp(10px, 3vw, 12px);
  text-align: center;
  color: #9ddf1e;
}
</style>
