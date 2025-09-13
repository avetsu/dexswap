<script setup>
import UIButton from '../ui/UIButton.vue';
</script>
<template>
  <div class="modal__agree">
    <span class="modal__agree-text"> Вы действительно подтверждаете действие? </span>
    <div class="modal__agree-btns">
      <UIButton class="modal__agree-yes"> Да </UIButton>
      <UIButton class="modal__agree-no"> Нет </UIButton>
    </div>
  </div>
</template>

<style scoped>
.modal__agree {
  height: 440px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 29px;
}
.modal__agree-text {
  font-family: var(--second-family);
  font-weight: 700;
  font-size: clamp(20px, 3vw, 25px);
  text-align: center;
  color: #fff;
  max-width: 325px;
  margin-top: auto;
}
.modal__agree-btns {
  display: flex;
  flex-direction: column;
  gap: 17px;
  width: 100%;
}
.modal__agree-no {
  border: 1px solid #ffffff38;
  background: transparent;
  color: #fff;
}
</style>
