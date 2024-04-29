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

  test('creates a container of zeroes with zero width and height', () => {
    const width = 0;
    const height = 0;
    const container = newAnchorage(width, height);
    expect(container.length).toBe(height);
  });

  test('returns empty array with negative width and height', () => {
    const width = -3;
    const height = -2;
    const container = newAnchorage(width, height);
    expect(container.length).toBe(0);
  });

  test('creates a container of zeroes with large dimensions', () => {
    const width = 1000;
    const height = 1000;
    const container = newAnchorage(width, height);
    expect(container.length).toBe(height);
    container.forEach(row => {
      expect(row.length).toBe(width);
      expect(row.every(val => val === 0)).toBe(true);
    });
  });

  test('returns empty array with large negative dimensions', () => {
    const width = -1000;
    const height = -1000;
    const container = newAnchorage(width, height);
    expect(container.length).toBe(0);
  });

  test('creates a container of zeroes with non-integer dimensions', () => {
    const width = 2.5;
    const height = 3.7;
    const container = newAnchorage(width, height);
    expect(container.length).toBe(Math.floor(height));
    container.forEach(row => {
      expect(row.length).toBe(Math.floor(width));
      expect(row.every(val => val === 0)).toBe(true);
    });
  });
});
