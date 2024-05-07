import { Anchorage, Position } from "./types";

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