import { newAnchorage, findPos } from './lib';

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

  test('throws an error with zero width and height', () => {
    const width = 0;
    const height = 0;
    expect(() => newAnchorage(width, height)).toThrow('Oops! Anchorage size is invalid.');
  });

  test('throws an error with negative width and height', () => {
    const width = -3;
    const height = -2;
    expect(() => newAnchorage(width, height)).toThrow('Oops! Anchorage size is invalid.');
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

describe('findPos', () => {
  test('finds [0, 0] position in an empty container', () => {
    const container = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    const position = findPos(container);
    expect(position.toBe([0, 0]));
  })
})