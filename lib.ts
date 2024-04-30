import { Anchorage } from "./types";

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

export const findPos = (container) => {
  return null;
}