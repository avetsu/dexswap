<script setup>
import TradeCards from '@/components/trade/TradeCards.vue';
import TradeCourse from '@/components/trade/limit/TradeLimitCourse.vue';
import TradeRestriction from '@/components/trade/limit/TradeRestriction.vue';
import UIButton from '@/components/ui/UIButton.vue';
import { ref } from 'vue';


defineProps({
  contentType: String,
});


let id = 0;

const durations = ref([
  {
    id: id++,
    count: '1 day',
    isActive: true,
  },
  {
    id: id++,
    count: '1 week',
    isActive: false,
  },
  {
    id: id++,
    count: '1 month',
    isActive: false,
  },
  {
    id: id++,
    count: '1 year',
    isActive: false,
  },
]);
const changeDuration = (index) => {
  durations.value.forEach((item, i) => {
    item.isActive = i === index;
  });
};
</script>

<template>
  <div class="limit-wrapper">
    <div class="limit-box">
      <TradeCourse />
      <TradeCards class="limit-cards" />
    </div>
    <div class="limit__duration">
      <span class="limit__duration-text"> Expiry </span>
      <div class="limit__duration-btns">
        <button
          :class="{ active: time.isActive === true }"
          class="limit__duration-btn"
          v-for="(time, index) in durations"
          :key="index"
          @click="changeDuration(index)"
        >
          {{ time.count }}
        </button>
      </div>
    </div>
    <UIButton class="limit-btn">Confirm</UIButton>
    <TradeRestriction />
  </div>
</template>

<style scoped>
.limit-wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.limit-box {

  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 16px;
}
.limit-btn {
  margin-top: 12px;
}

.limit__duration {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

@media (max-width: 576px) {
  .limit__duration {
    display: none;
  }
}
.limit__duration-text {
  font-family: var(--font-family);
  font-weight: 250;
  font-size: 18px;
  color: #22212e;
}
.limit__duration-btns {
  display: flex;
  align-items: center;
  gap: 11px;
}
.limit__duration-btn {
  font-family: var(--font-family);
  font-weight: 300;
  font-size: 12px;
  color: #22212e;
  opacity: 0.5;
  border-radius: 20px;
  padding: 5px;
  background: rgba(34, 33, 46, 0.05);
}
.limit__duration-btn.active {
  opacity: 1;
  color: #fff;
  background: #9ddf1e;
}
</style>
