import { ChainableGenerator, wrap } from "../util/generator";

export type Dimensions = {
    width: number,
    height: number
};

export type Position = {
    x: number,
    y: number
};

function* getCoveringPointsInternal(dimensions: Dimensions): Generator<Position, any, any> {
  for (let y = 0; y < dimensions.height; y++) {
    for (let x = 0; x < dimensions.width; x++) {
        yield { x, y };
    }
  }
}

export const getCoveringPoints = (dimensions: Dimensions): ChainableGenerator<Position> =>
  wrap(getCoveringPointsInternal(dimensions));

export const translate = (point: Position, by: Position): Position =>
  ({ x: point.x + by.x, y: point.y + by.y });

export const hash = (bounds: Dimensions, point: Position): number =>
  point.y * bounds.width + point.x;

export const isInBounds = (bounds: Dimensions, point: Position): boolean =>
  point.x >= 0 && point.x < bounds.width && point.y >= 0 && point.y < bounds.height;

export const getArea = (bounds: Dimensions): number =>
  bounds.height * bounds.width;
