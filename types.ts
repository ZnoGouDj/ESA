type Vector2d = { x: number, y: number };

export type Position = Vector2d;
export type Dimensions = Vector2d;

export type Anchorage = {
  dimensions: Dimensions;
  grid: number[][];
};