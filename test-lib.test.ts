import { newAnchorage, findPos, placeShip } from './lib';
import { Anchorage, Ship } from './types';

describe('newAnchorage', () => {
  test('creates an anchorage object with specified dimensions and grid of zeroes', () => {
    const width = 3;
    const height = 2;
    const anchorage: Anchorage = newAnchorage(width, height);
    expect(anchorage.dimensions).toEqual({ x: width, y: height });
    expect(anchorage.grid.length).toBe(height);
    anchorage.grid.forEach(row => {
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

  test('creates an anchorage object of zeroes with non-integer dimensions', () => {
    const width = 2.5;
    const height = 3.7;
    const anchorage: Anchorage = newAnchorage(width, height);
    expect(anchorage.dimensions).toEqual({ x: Math.floor(width), y: Math.floor(height) });
    expect(anchorage.grid.length).toBe(Math.floor(height));
    anchorage.grid.forEach(row => {
      expect(row.length).toBe(Math.floor(width));
      expect(row.every(val => val === 0)).toBe(true);
    });
  });
});

describe('findPos', () => {
  test('finds [0, 0] position in an empty container', () => {
    const container: Anchorage = {
      dimensions: { x: 3, y: 3 },
      grid: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
    };
    const position = findPos(container);
    expect(position).toEqual({ x: 0, y: 0 });
  });

  test('finds [0, 0] position in a container with a single row of zeroes', () => {
    const container: Anchorage = {
      dimensions: { x: 3, y: 1 },
      grid: [[0, 0, 0]],
    };
    const position = findPos(container);
    expect(position).toEqual({ x: 0, y: 0 });
  });

  test('finds [0, 0] position in a container with a single column of zeroes', () => {
    const container: Anchorage = {
      dimensions: { x: 1, y: 3 },
      grid: [[0], [0], [0]],
    };
    const position = findPos(container);
    expect(position).toEqual({ x: 0, y: 0 });
  });

  test('finds [0, 1] position in a container with a non-zero value before the first zero', () => {
    const container: Anchorage = {
      dimensions: { x: 3, y: 3 },
      grid: [
        [1, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
    };
    const position = findPos(container);
    expect(position).toEqual({ x: 1, y: 0 });
  });

  test('returns null for a container with no zeroes', () => {
    const container: Anchorage = {
      dimensions: { x: 3, y: 3 },
      grid: [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
      ],
    };
    const position = findPos(container);
    expect(position).toBeNull();
  });

  test('finds [1, 2] position in a container with multiple zeroes', () => {
    const container: Anchorage = {
      dimensions: { x: 3, y: 3 },
      grid: [
        [1, 1, 1],
        [1, 1, 0],
        [1, 0, 1],
      ],
    };
    const position = findPos(container);
    expect(position).toEqual({ x: 2, y: 1 });
  });
});

describe('placeShip', () => {
  test('places ship in an empty anchorage', () => {
    const anchorage: Anchorage = {
      dimensions: { x: 3, y: 3 },
      grid: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
    };
    const ship: Ship = { x: 2, y: 2 };
    const position = placeShip(ship, anchorage);
    expect(position).toEqual({ x: 0, y: 0 });
    expect(anchorage.grid).toEqual([
      [1, 1, 0],
      [1, 1, 0],
      [0, 0, 0],
    ]);
  });

  test('places ship in a partially filled anchorage', () => {
    const anchorage: Anchorage = {
      dimensions: { x: 3, y: 3 },
      grid: [
        [1, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
    };
    const ship: Ship = { x: 2, y: 2 };
    const position = placeShip(ship, anchorage);
    expect(position).toEqual({ x: 1, y: 0 });
    expect(anchorage.grid).toEqual([
      [1, 1, 1],
      [0, 1, 1],
      [0, 0, 0],
    ]);
  });
});