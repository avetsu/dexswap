<template>
  <div class="liquid-wrapper">
    <h3 class="liquid__title">Learn more about providing liquidity</h3>
    <ul class="liquid__list">
      <li class="liquid__item">
        <div class="liquid__item-img">
          <img :src="'icons/liquid-prot.svg'" alt="" />
        </div>
        <div class="liquid__item-content">
          <span class="liquid__item-text"> Providing of liquidity
in different protocols </span>
        </div>
      </li>
      <li class="liquid__item">
        <div class="liquid__item-img">
          <img :src="'icons/liquid-hook.svg'" alt="" />
        </div>
        <div class="liquid__item-content">
          <span class="liquid__item-text"> FAQ </span>
        </div>
      </li>
    </ul>
    <a href="#" class="liquid__link-more">
      More detailed
      <svg
        width="18"
        height="14"
        viewBox="0 0 18 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 7H17M17 7L11 1M17 7L11 13"
          stroke="#9DDF1E"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </a>
  </div>
</template>

<style scoped>
.liquid-wrapper {
  display: flex;
  flex-direction: column;
  gap: 21px;
  max-width: 429px;
}
@media (max-width: 768px) {
  .liquid-wrapper {
    max-width: none;
  }
}
.liquid__title {
  font-family: var(--font-family);
  font-weight: 600;
  font-size: clamp(15px, 3vw, 20px);
  color: #22212e;
}
.liquid__list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.liquid__item {
  border-radius: 10px;
  overflow: hidden;
  background: #fff;
  display: flex;
  height: 65px;
  gap: 23px;
}
.liquid__item-img {
  max-width: 73px;
  width: 100%;
  background: #d9d9d9;
  display: flex;
  align-items: center;
  justify-content: center;
}
.liquid__item:last-child .liquid__item-img {
  background: #9ddf1e;
}
.liquid__item-content {
  display: flex;
  align-items: center;
}
.liquid__item-text {
  font-family: var(--font-family);
  font-weight: 450;
  font-size: 15px;
  color: #22212e;
}
.liquid__link-more {
  align-self: end;
  display: flex;
  align-items: center;
  gap: 14px;
  font-family: var(--font-family);
  font-weight: 400;
  font-size: clamp(14px, 3vw, 18px);
  color: #22212e;
}

.liquid__link-more:hover svg {
  animation: arrowMove 0.3s alternate;
}

@keyframes arrowMove {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-10px);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
