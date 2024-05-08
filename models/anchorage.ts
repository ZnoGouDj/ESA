import { Dimensions, Position } from "./geometry";

export type UnplacedShip = {
    designation: string;
    dimensions: Dimensions;
};

export type PlacedShip = UnplacedShip & { position: Position, isRotated: boolean };

export type Anchorage = {
    dimensions: Dimensions,
    occupiedCells: Set<number>,
    ships: PlacedShip[]
}
