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
