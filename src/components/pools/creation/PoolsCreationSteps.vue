<script setup>
import { usePoolStepsStore } from '@/stores/PoolStepsStore';

const stepsStore = usePoolStepsStore();
</script>

<template>
  <div class="creation-steps">
    <h3 class="pools__title">New position</h3>
    <ul class="creation-steps__list">
      <li
        class="creation-steps__item"
        :class="{ 'step-active': step.isActive }"
        v-for="step in stepsStore.activeSteps"
        :key="step.id"
      >
        <span class="creation-steps__step">
          {{ step.id }}
        </span>
        <div class="creation-steps__item-content">
          <span class="creation-steps__step-number"> Step {{ step.id }} </span>
          <span class="creation-steps__step-text">
            {{ step.text }}
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.creation-steps {
  display: flex;
  flex-direction: column;
  gap: 39px;
  max-width: 429px;
  width: 100%;
}
@media (max-width: 1000px) {
  .creation-steps {
    max-width: none;
  }
}
.pools__title {
  font-family: var(--font-family);
  font-weight: 600;
  font-size: clamp(20px, 3vw, 30px);
  color: #22212e;
}

.creation-steps__list {

  border-radius: 20px;
  background-color: #fff;
  padding: 30px 25px;
  display: flex;
  flex-direction: column;
  gap: 57px;
}
@media (max-width: 576px) {
  .creation-steps__list {
    border: none;
    background-color: transparent;
    backdrop-filter: none;
    box-shadow: none;
    padding: 0;
    gap: 30px;
  }
}
.creation-steps__item {
  display: flex;
  align-items: center;
  gap: 17px;
}

.creation-steps__step {
  width: 51px;
  height: 51px;
  border-radius: 50%;
  background-color: #eeedf0;
  font-family: var(--font-family);
  font-weight: 400;
  font-size: clamp(11px, 3vw, 20px);
  color: #22212e;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

@media (max-width: 576px) {
  .creation-steps__step {
    width: 29px;
    height: 29px;
    background-color: rgba(34, 33, 46, 0.1);
  }
}


.step-active .creation-steps__step {
  border: 2px solid #9ddf1e;
  background-color: #fff;
}

.creation-steps__item-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.creation-steps__step-number {
  font-family: var(--font-family);
  font-weight: 400;
  font-size: clamp(6px, 3vw, 13px);
  color: #22212e;
  opacity: 0.5;
}

.creation-steps__step-text {
  font-family: var(--font-family);
  font-weight: 400;
  font-size: clamp(8px, 3vw, 16px);
  color: #22212e;
  opacity: 0.5;
  transition: all 0.3s ease;
}
.step-active .creation-steps__step-text {
  opacity: 1;
}

@media (max-width: 1000px) {
  .creation-steps__list {
    flex-direction: row;
    justify-content: space-between;
  }
  .creation-steps__item {
    flex-direction: column;
    align-items: start;
  }
  .creation-steps__item:not(:last-child) .creation-steps__step::after {
    display: none;
  }
}

@media (max-width: 576px) {
  .creation-steps__item:not(:last-child) .creation-steps__step::after {
    display: block;
    top: 50%;
    right: -500%;
    width: 100px;
    height: 0;
    bottom: auto;
  }
}

@media (max-width: 500px){
  .creation-steps__item:not(:last-child) .creation-steps__step::after{
    width: 70px;
    right: -400%;
  }
}
@media (max-width: 400px){
  .creation-steps__item:not(:last-child) .creation-steps__step::after{
    right: -350%;
  }
}
</style>
