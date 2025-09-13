<script setup>
defineProps({
  fromName: String,
  toName: String,
  logoUrlFrom: String,
  logoUrlTo: String,
});
</script>

<template>
  <ul class="bridge__cards">
    <li class="bridge__cards-title">
        DEPOSIT
        <span class="card-angle-left-top"></span>
        <span class="card-angle-left-bottom"></span>
        <span class="card-angle-left-bottom-bg"></span>
        <span class="card-angle-right-top"></span>
        <span class="card-angle-right-bottom"></span>
        <span class="card-angle-right-bottom-bg"></span>
    </li>
    <li class="bridge__cards-item">
      <span class="bridge__cards-img">
        <img :src="logoUrlFrom" alt="" />
      </span>
      <div class="bridge__cards-content">
        <span class="bridge__cards-text">From</span>
        <span class="bridge__cards-name">{{ fromName }}</span>
      </div>
    </li>
    <li class="bridge__cards-arrow">
      <svg
        width="18"
        height="14"
        viewBox="0 0 18 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 7L17 7M17 7L11 1M17 7L11 13"
          stroke="#9DDF1E"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <span class="arrow-top-left"></span>
      <span class="arrow-top-left-bg"></span>
      <span class="arrow-top-right"></span>
      <span class="arrow-top-right-bg"></span>
      <span class="arrow-bottom-right"></span>
      <span class="arrow-bottom-right-bg"></span>
      <span class="arrow-bottom-left"></span>
      <span class="arrow-bottom-left-bg"></span>
    </li>
    <li class="bridge__cards-item">
      <span class="bridge__cards-img">
        <img :src="logoUrlFrom" alt="" />
      </span>
      <div class="bridge__cards-content">
        <span class="bridge__cards-text">To</span>
        <span class="bridge__cards-name">{{ toName }}</span>
      </div>
    </li>
    <li class="bridgs__cards-cut">
      <span class="bridgs__cards-cut-left"></span>
      <span class="bridgs__cards-cut-left-bottom"></span>
      <span class="bridgs__cards-cut-right"></span>
      <span class="bridgs__cards-cut-right-bottom"></span>
    </li>
  </ul>
</template>

<style scoped>
.bridge__cards {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  margin-bottom: 17px;
  background-color: #fff;
  padding: 50px 14px 60px 14px;
  border-radius: 20px;
  position: relative;
}
.bridgs__cards-cut{
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  max-width: fit-content;
  padding: 10px 65px;
  height: 30px;
  background-color: #eeedf0;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  z-index: 1;
}
.bridgs__cards-left{
  position: absolute;
  width: 30px;
  height: 30px;
  background-color: #ffffff;
  left: -27px;
  bottom: 0;
  border-bottom-right-radius: 24px;
}
.bridgs__cards-right{
  position: absolute;
  width: 30px;
  height: 30px;
  background-color: #ffffff;
  right: -27px;
  bottom: 0;
  border-bottom-left-radius: 24px;
}

.card-angle-left-top {
  position: absolute;
  height: 21px;
  width: 21px;
  background-color: #fff;
  border-top-right-radius: 36px;
  left: 0;
  bottom: 0;
  z-index: 1;
}
.card-angle-left-bottom {
  position: absolute;
  height: 21px;
  width: 21px;
  background-color: #eeedf0;
  border-bottom-left-radius: 25px;
  left: 15px;
  bottom: 0;
  z-index: 3;
}
.card-angle-left-bottom-bg {
  position: absolute;
  height: 21px;
  width: 21px;
  background-color: #fff;
  left: 15px;
  bottom: -16px;
  z-index: 2;
}
.card-angle-right-top {
  position: absolute;
  height: 21px;
  width: 21px;
  background-color: #fff;
  border-top-left-radius: 36px;
  right: 0;
  bottom: 0;
  z-index: 1;
}
.card-angle-right-bottom {
  position: absolute;
  height: 21px;
  width: 21px;
  background-color: #eeedf0;
  border-bottom-right-radius: 25px;
  right: 15px;
  bottom: 0;
  z-index: 3;
}
.card-angle-right-bottom-bg {
  position: absolute;
  height: 21px;
  width: 21px;
  background-color: #fff;
  right: 15px;
  bottom: -16px;
  z-index: 2;
}
.bridge__cards-title {
  font-family: var(--font-family);
  font-weight: 600;
  font-size: 18px;
  text-transform: uppercase;
  text-align: center;
  color: rgba(34, 33, 46, 0.2);
  max-width: fit-content;
  width: 100%;
  background-color: #eeedf0;
  padding: 5px clamp(50px, 9vw, 70px);
  display: block;
  position: absolute;
  left: 50%;
  top: -10px;
  transform: translateX(-50%);
  z-index: 1;
}

.bridge__cards-item {
  display: flex;
  align-items: center;
  gap: 19px;
  padding: 16px 14px;
  border-radius: 20px;
  background: #eeedf0;
  width: 100%;
}

.bridge__cards-img {
  width: 40px;
  height: 40px;
  background-color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bridge__cards-content {
  display: flex;
  flex-direction: column;
}

.bridge__cards-text {
  font-family: var(--font-family);
  font-weight: 400;
  font-size: clamp(8px, 3vw, 12px);
  color: #22212e;
  opacity: 0.5;
}
.bridge__cards-name {
  font-family: var(--font-family);
  font-weight: 400;
  font-size: clamp(13px, 3vw, 18px);
  color: #22212e;
}

.bridge__cards-arrow {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  border: 1px solid #ffffff38;
  border-radius: 50%;
  background-color: #fff;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}
.arrow-top-left {
  position: absolute;
    width: 10px;
    height: 10px;
    border-bottom-right-radius: 10px;
    background-color: #eeedf0;
    left: -1px;
    top: -8px;
    transform: rotate(338deg);
    z-index: 2;
}

.arrow-top-left-bg{
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: #fff;
  z-index: 1;
  left: 4px;
  top: -7px;
}
.arrow-top-right {
  position: absolute;
    width: 10px;
    height: 10px;
    border-bottom-left-radius: 10px;
    background-color: #eeedf0;
    right: -1px;
    top: -8px;
    transform: rotate(-338deg);
    z-index: 2;
}

.arrow-top-right-bg{
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: #fff;
  z-index: 1;
  right: 4px;
  top: -7px;
}
.arrow-bottom-right {
  position: absolute;
    width: 10px;
    height: 10px;
    border-top-left-radius: 10px;
    background-color: #eeedf0;
    right: -1px;
    bottom: -8px;
    transform: rotate(338deg);
    z-index: 2;
}

.arrow-bottom-right-bg{
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: #fff;
  z-index: 1;
  right: 4px;
  bottom: -7px;
}
.arrow-bottom-left {
  position: absolute;
    width: 10px;
    height: 10px;
    border-top-right-radius: 10px;
    background-color: #eeedf0;
    left: -1px;
    bottom: -8px;
    transform: rotate(-338deg);
    z-index: 2;
}

.arrow-bottom-left-bg{
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: #fff;
  z-index: 1;
  left: 4px;
  bottom: -7px;
}
</style>
