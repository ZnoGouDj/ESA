import { Dimensions, Position } from "./common";

export type UnplacedShip = {
    designation: string;
    dimensions: Dimensions;
};

export type PlacedShip = UnplacedShip & { position: Position };

export interface IAnchorage {
    dimensions: Dimensions,
    ships: PlacedShip[]
}