import { newAnchorage } from './lib';

describe('newAnchorage', () => {
  test('creates a container of zeroes with specified dimensions', () => {
    const width = 3;
    const height = 2;
    const container = newAnchorage(width, height);
    expect(container.length).toBe(height);
    container.forEach(row => {
      expect(row.length).toBe(width);
      expect(row.every(val => val === 0)).toBe(true);
    });
  });
});
