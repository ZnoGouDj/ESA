import { Anchorage, Position, Ship } from "./types";

export const newAnchorage = (width: number, height: number): Anchorage => {
  if (width <= 0 || height <= 0) {
    throw new Error('Oops! Anchorage size is invalid.');
  }

  width = Math.floor(width);
  height = Math.floor(height);

  const grid: number[][] = [];

  for (let i = 0; i < height; i++) {
    grid.push(Array(width).fill(0));
  }

  const anchorage: Anchorage = {
    dimensions: { x: width, y: height },
    grid: grid,
  };

  return anchorage;
};

export const findPos = (container: Anchorage): Position | null => {
  const { grid } = container;

  for (let i = 0; i < grid.length; i++) {
    const row = grid[i];
    const columnIndex = row.indexOf(0);
    if (columnIndex !== -1) {
      return { x: columnIndex, y: i };
    }
  }

  return null;
};

export const placeShip = (ship: Ship, anchorage: Anchorage): Position | null => {
  const { dimensions, grid } = anchorage;
  const { x: shipWidth, y: shipHeight } = ship;

  for (let i = 0; i <= dimensions.y - shipHeight; i++) {
    for (let j = 0; j <= dimensions.x - shipWidth; j++) {
      let isSpotEmpty = true;

      // try to place the ship horizontally
      for (let y = i; y < i + shipHeight; y++) {
        for (let x = j; x < j + shipWidth; x++) {
          if (grid[y][x] !== 0) {
            isSpotEmpty = false;
            break;
          }
        }
        if (!isSpotEmpty) break;
      }

      if (isSpotEmpty) {
        for (let y = i; y < i + shipHeight; y++) {
          for (let x = j; x < j + shipWidth; x++) {
            grid[y][x] = 1;
          }
        }
        return { x: j, y: i };
      }

      // try to place the ship vertically
      isSpotEmpty = true;
      for (let x = j; x < j + shipWidth; x++) {
        for (let y = i; y < i + shipHeight; y++) {
          if (grid[y][x] !== 0) {
            isSpotEmpty = false;
            break;
          }
        }
        if (!isSpotEmpty) break;
      }

      if (isSpotEmpty) {
        for (let x = j; x < j + shipWidth; x++) {
          for (let y = i; y < i + shipHeight; y++) {
            grid[y][x] = 1;
          }
        }
        return { x: j, y: i };
      }
    }
  }

  return null;
};