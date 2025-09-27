export const FeeAmount = Object.freeze({
  LOWEST: 100,
  LOW: 500,
  MEDIUM: 2500,
  HIGH: 10000,
});

export const TICK_SPACINGS = {
  [FeeAmount.LOWEST]: 1,
  [FeeAmount.LOW]: 10,
  [FeeAmount.MEDIUM]: 60,
  3000: 60,
  [FeeAmount.HIGH]: 200,
};

export const Q96 = 2n ** 96n;
