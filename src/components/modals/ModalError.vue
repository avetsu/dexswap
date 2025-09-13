<template>
  <div class="modal__error">
    <div class="modal__error-img">
      <img :src="'/img/modal-error.png'" alt="Ошибка" />
    </div>
    <div class="modal__error-content">
      <span class="modal__error-title"> Ошибка </span>
      <p class="modal__error-text">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua. Ut enim ad minim veniam.
      </p>
    </div>
  </div>
</template>

<style scoped>
.modal__error {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  height: 440px;
}

.modal__error-img {
  position: absolute;
  z-index: -1;
}

.modal__error-content {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 17px;
  align-items: center;
}

.modal__error-title {
  font-family: var(--second-family);
  font-weight: 700;
  font-size: clamp(20px, 3vw, 30px);
  color: #fff;
}
.modal__error-text {
  font-family: var(--font-family);
  font-weight: 300;
  font-size: 12px;
  text-align: center;
  color: #fff;
  opacity: 0.5;
  max-width: 327px;
}
</style>
