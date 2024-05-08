import { Anchorage, PlacedShip } from "./anchorage"
import { Dimensions, Position } from "./geometry"

interface IFleet {
  singleShipDimensions: Dimensions,
  shipCount: number,
  shipDesignation: string
}

export interface IFleets {
  anchorageSize: Dimensions,
  fleets: IFleet[]
}

export const assertFleetsObjectValid = (fleets: IFleets) => {
  if (fleets.anchorageSize.height <= 0) {
    throw Error("Oops! Anchorage height is invalid.");
  }
  
  if (fleets.anchorageSize.width <= 0) {
    throw Error("Oops! Anchorage width is invalid.");
  }
}
