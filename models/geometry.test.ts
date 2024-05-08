import { isInBounds } from "./geometry";

describe('geometry', () => {
  test('Negative points are always out of bounds', () => {
    expect(isInBounds({ width: 1, height: 1 }, { x: -1, y: 0 })).toBe(false);
    expect(isInBounds({ width: 1, height: 1 }, { x: 0, y: -1 })).toBe(false);
  });

  test('1x1 grid can only fit one point', () => {
    expect(isInBounds({ width: 1, height: 1 }, { x: 0, y: 0 })).toBe(true);
    expect(isInBounds({ width: 1, height: 1 }, { x: 1, y: 0 })).toBe(false);
    expect(isInBounds({ width: 1, height: 1 }, { x: 0, y: 1 })).toBe(false);
    expect(isInBounds({ width: 1, height: 1 }, { x: 1, y: 1 })).toBe(false);
  })
});
