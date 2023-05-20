import { floatRound, floatToPercent, formatPrice } from '../math';

describe('test utils/math', () => {
  test('should rounding float num', () => {
    expect(floatRound(0.1667)).toBe(0.17);
    expect(floatRound(0.1667, 3)).toBe(0.167);
    expect(floatRound(0.1667, 4)).toBe(0.1667);
    expect(floatRound(0.1667, 1)).toBe(0.2);
    expect(floatRound(0.1667, 0)).toBe(0);
    expect(floatRound(20)).toBe(20);
    expect(floatRound(24)).toBe(24);
    expect(floatRound(25)).toBe(25);
  });

  test('should be converted to percentage by float', () => {
    expect(floatToPercent(0.1667)).toBe('16.67%');
    expect(floatToPercent(0.1667, 1)).toBe('16.7%');
    expect(floatToPercent(0.1667, 0)).toBe('17%');
    expect(floatToPercent(0.1667, 10)).toBe('16.67%');
  });

  test('should  be converted to price by float', () => {
    expect(formatPrice(0)).toBe('0');
    expect(() => formatPrice(-1)).toThrowError(
      'The amount of money should be greater than or equal to 0!'
    );

    expect(formatPrice(22.324)).toBe('22.324');
    expect(formatPrice(22324)).toBe('22,324');
    expect(formatPrice(22324, true)).toBe('¥22,324');
  });
});
