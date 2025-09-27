<script setup>
import { storeToRefs } from 'pinia';
import { useTradeStore } from '@/stores/TradeStore';

const tradeStore = useTradeStore();

const { txState } = storeToRefs(tradeStore);
</script>

<template>
  <div class="in-process">
    <div class="waiting in-progress-active">
      <div class="waiting-icon in-process-icon">
        <svg
          width="52"
          height="48"
          viewBox="0 0 52 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="spinner"
          v-if="txState === 0"
        >
          <path
            d="M48 24C48 27.7874 47.1036 31.5211 45.3842 34.8958C43.6647 38.2704 41.171 41.1902 38.1068 43.4164"
            stroke="#58FF84"
            stroke-width="8"
            stroke-linecap="round"
          />
        </svg>
        <svg
          width="52"
          height="48"
          viewBox="0 0 52 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          v-else
        >
          <path
            d="M14 24L22 32L38 16"
            stroke="#58FF84"
            stroke-width="8"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <span class="in-progress-text">{{
        txState === 0 ? 'Approval is pending...' : 'Amount approved'
      }}</span>
    </div>
    <div :class="['signature-message', '', { 'in-progress-active': txState >= 1 }]">
      <span class="signature-message-icon in-process-icon">
        <svg
          width="12"
          height="14"
          viewBox="0 0 12 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          v-if="txState === 0"
        >
          <path
            d="M10.4118 7.3V3.88C10.4118 2.87191 10.4118 2.36786 10.2194 1.98282C10.0502 1.64413 9.78027 1.36876 9.44822 1.19619C9.07073 1 8.57656 1 7.58824 1H3.82353C2.8352 1 2.34104 1 1.96355 1.19619C1.6315 1.36876 1.36153 1.64413 1.19234 1.98282C1 2.36786 1 2.87191 1 3.88V10.12C1 11.1281 1 11.6321 1.19234 12.0172C1.36153 12.3559 1.6315 12.6312 1.96355 12.8038C2.34104 13 2.8352 13 3.82353 13H5.70588M6.88235 6.4H3.35294M4.52941 8.8H3.35294M8.05882 4H3.35294M7.17647 11.2L8.35294 12.4L11 9.7"
            stroke="#9CA2AB"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <svg
          width="52"
          height="48"
          viewBox="0 0 52 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="spinner"
          v-else-if="txState === 1"
        >
          <path
            d="M48 24C48 27.7874 47.1036 31.5211 45.3842 34.8958C43.6647 38.2704 41.171 41.1902 38.1068 43.4164"
            stroke="#58FF84"
            stroke-width="8"
            stroke-linecap="round"
          />
        </svg>
        <svg
          width="52"
          height="48"
          viewBox="0 0 52 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          v-else
        >
          <path
            d="M14 24L22 32L38 16"
            stroke="#58FF84"
            stroke-width="8"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
      <span class="in-progress-text"> Message signature</span>
    </div>
    <div :class="['signature-swop', '', { 'in-progress-active': txState >= 2 }]">
      <span class="signature-swop-icon in-process-icon">
        <svg
          width="11"
          height="12"
          viewBox="0 0 11 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          v-if="txState <= 1"
        >
          <path
            d="M1 8.77778H10M10 8.77778L7.75 6.55556M10 8.77778L7.75 11M10 3.22222H1M1 3.22222L3.25 1M1 3.22222L3.25 5.44444"
            stroke="#9CA2AB"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <svg
          width="52"
          height="48"
          viewBox="0 0 52 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="spinner"
          v-else-if="txState === 2"
        >
          <path
            d="M48 24C48 27.7874 47.1036 31.5211 45.3842 34.8958C43.6647 38.2704 41.171 41.1902 38.1068 43.4164"
            stroke="#58FF84"
            stroke-width="8"
            stroke-linecap="round"
          />
        </svg>
        <svg
          width="52"
          height="48"
          viewBox="0 0 52 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          v-else
        >
          <path
            d="M14 24L22 32L38 16"
            stroke="#58FF84"
            stroke-width="8"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
      <span class="in-progress-text"> Sign a swap</span>
    </div>
  </div>
</template>
<style>
.in-process {
  display: flex;
  flex-direction: column;
  gap: 43px;
  margin-left: 19px;
}
.waiting,
.signature-message,
.signature-swop {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 19px;
}
.in-progress-text {
  font-family: var(--font-family);
  font-weight: 275;
  font-size: 16px;
  color: #1b1b1b;
  opacity: 0.5;
}

.in-progress-active .in-progress-text {
  font-weight: 500;
  opacity: 1;
}

.in-process-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 26px;
  height: 26px;
  border: 1px solid #ffffff4f;
  border-radius: 50%;
  background-color: rgba(217, 217, 217, 0.05);
  position: relative;
}

.waiting-icon svg {
  position: absolute;
  width: 29px;
  height: 33px;
  right: -3px;
  bottom: -5px;
}

.spinner {
  animation: loading 1s ease-in-out infinite;
}

.waiting .in-process-icon::before,
.signature-message .in-process-icon::before {
  content: '';
  position: absolute;
  height: 26px;
  width: 0px;
  border: 1px dashed rgba(255, 255, 255, 0.2);
  bottom: -150%;
  display: block;
}

@keyframes loading {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
