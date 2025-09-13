<script setup>
defineProps({
  name: String,
});
</script>

<template>
  <div class="bridge-amount">
    <span class="bridge-amount__title">
      <span class="bridge-amount__title-text">Enter Amount</span>
      <span class="bridge-amount__title-left"></span>
      <span class="bridge-amount__title-left-bottom"></span>
      <span class="bridge-amount__title-left-bottom-angle"></span>
      <span class="bridge-amount__title-right"></span>
      <span class="bridge-amount__title-right-bottom"></span>
      <span class="bridge-amount__title-right-bottom-angle"></span>
    </span>
    <div class="bridge-amount__input-wrapper">
      <input type="text" class="bridge-amount__input" />
      <span class="bridge-amount__input-text">{{ name }}</span>
    </div>
    <div class="bridge-amount__max">
      <span class="bridge-amount__available"> 0 ETH Available </span>
      <span class="bridge-amount__max-text"> Max </span>
    </div>
  </div>
</template>

<style scoped>
.bridge-amount {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 44px;
  position: relative;
}

.bridge-amount__title {
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 12px;
  color: #22212e;
  padding: 10px 20px;
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
.bridge-amount__title-left {
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

.bridge-amount__title-left-bottom {
  width: 30px;
  height: 30px;
  background-color: #fff;
  position: absolute;
  top: 10px;
  left: 0;
  transform: translateX(-50%);
  z-index: 1;
}
.bridge-amount__title-left-bottom-angle {
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
.bridge-amount__title-right-bottom-angle {
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
.bridge-amount__title-right {
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

.bridge-amount__title-right-bottom {
  width: 30px;
  height: 30px;
  background-color: #fff;
  position: absolute;
  top: 10px;
  right: 0;
  transform: translateX(50%);
  z-index: 1;
}

@media (max-width: 375px) {
  .bridge-amount {
    margin-bottom: 54px;
  }
}
.bridge-amount__text {
  font-family: var(--font-family);
  font-weight: 400;
  font-size: clamp(8px, 3vw, 12px);
  color: #fff;
  opacity: 0.5;
  align-self: start;
}
.bridge-amount__input-wrapper {
  position: relative;
  background-color: #fff;
  padding: 14px;
  border-radius: 24px;
}
input {
  outline: none;
  border: none;
}
.bridge-amount__input {
  border-radius: 10px;
  height: 48px;
  background: #eeedf0;
  font-family: var(--font-family);
  font-weight: 400;
  font-size: clamp(10px, 3vw, 15px);
  color: #22212e;
  padding: 15px 25px;
  width: 100%;
}
.bridge-amount__input-text {
  position: absolute;
  right: 25px;
  top: 28px;
  font-family: var(--font-family);
  font-weight: 400;
  font-size: clamp(10px, 3vw, 15px);
  color: #22212e;
}
.bridge-amount__max {
  display: flex;
  align-items: center;
  align-self: end;
  gap: 14px;
}

@media (max-width: 375px) {
  .bridge-amount__max {
    display: none;
  }
}
.bridge-amount__available {
  font-family: var(--font-family);
  font-weight: 300;
  font-size: 15px;
  color: #22212e;
  opacity: 0.5;
}

.bridge-amount__max-text {
  border-radius: 20px;
  background: #9ddf1e;
  padding: 5px 12px;
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 12px;
  color: #22212e;
}
</style>
