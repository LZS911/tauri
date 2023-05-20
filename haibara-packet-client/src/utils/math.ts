export const floatRound = (num: number, bit = 2): number => {
  return Math.round(num * Math.pow(10, bit)) / Math.pow(10, bit);
};

export const floatToPercent = (num: number, bit = 2): string => {
  return `${floatRound(num * 100, bit)}%`;
};

export const formatPrice = (num: number, symbol = false): string => {
  if (num < 0) {
    throw new Error(
      'The amount of money should be greater than or equal to 0!'
    );
  }
  return `${symbol ? '¥' : ''}${num
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
};
