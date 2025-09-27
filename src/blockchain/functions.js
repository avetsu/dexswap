import JSBI from 'jsbi';
import { Q96 } from './constants';

export function priceToTick(price, tickSpacing) {
  if (price === '∞') {
    price = Infinity;
  }
  let tick = Math.log(price) / Math.log(1.0001);
  tick = Math.max(-887272 + tickSpacing, Math.min(887272, tick));
  return nearestUsableTick(tick, tickSpacing);
}

export function nearestUsableTick(tick, tickSpacing) {
  return Math.floor(tick / tickSpacing) * tickSpacing;
}

export function trimDecimals(num, decimals) {
  const factor = Math.pow(10, decimals);
  return Math.trunc(num * factor) / factor;
}

export function fromReadableAmount(amount, decimals) {
  console.log('rawamountAmount:', amount);
  console.log('decimals:', decimals);
  const extraDigits = Math.pow(10, countDecimals(amount));
  const adjustedAmount = amount * extraDigits;
  return JSBI.divide(
    JSBI.multiply(
      JSBI.BigInt(adjustedAmount),
      JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(decimals)),
    ),
    JSBI.BigInt(extraDigits),
  );
}

export function toReadableAmount(rawAmount, decimals) {
  return JSBI.divide(
    JSBI.BigInt(rawAmount),
    JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(decimals)),
  ).toString();
}

export function toReadableAmountWithDecimals(rawAmount, decimals) {
  return Number(rawAmount) / 10 ** decimals;
}

function countDecimals(x) {
  if (x == null) return 0;
  if (Math.floor(x) === x) return 0;
  const parts = x.toString().split('.');
  return parts.length > 1 ? parts[1].length : 0;
}

export function getSqrtPriceX96(price) {
  return BigInt(Math.floor(Math.sqrt(price) * 2 ** 96));
}

export function getPrice(sqrtPriceX96) {
  return (Number(sqrtPriceX96) / Number(Q96)) ** Number(2n);
}

export function toFixedFloor(num, decimals = 2) {
  const factor = Math.pow(10, decimals);
  return (Math.floor(parseFloat(num) * factor) / factor).toFixed(decimals);
}
