import { Anchorage, Position } from "./types";

export const newAnchorage = (width: number, height: number): Anchorage => {
  if (width <= 0 || height <= 0) {
    throw new Error('Oops! Anchorage size is invalid.')
  }

  width = Math.floor(width);
  height = Math.floor(height);

  const container: Anchorage = [];

  for (let i = 0; i < height; i++) {
    container.push(Array(width).fill(0));
  }

  return container;
}

export const findPos = (container: Anchorage): Position | null  => {
  for (let i = 0; i < container.length; i++) {
    const row = container[i];
    const columnIndex = row.indexOf(0);
    if (columnIndex !== -1) {
      return [i, columnIndex];
    }
  }

  return null;
}