
import { Anchorage, PlacedShip, UnplacedShip } from "./models/anchorage";
import { Dimensions, Position, getCoveringPoints, translate, hash, isInBounds, getArea } from "./models/geometry";
import { assertFleetsObjectValid, IFleets } from "./models/dto";

/// Packs a set of ships defined in the input object coming from
/// https://esa.instech.no/api/fleets/random
export const packFleets = (fleets: IFleets): Anchorage[] => {
  assertFleetsObjectValid(fleets);
  const allShips = flattenAndSortShips(fleets);
  const anchorages = [newAnchorage(fleets.anchorageSize)];

  let nextShipIndex = 0;
  while (allShips.length > 0) {
    const nextShip = allShips[nextShipIndex];
    const currentAnchorage = anchorages[anchorages.length - 1];
    const placementResult = tryPlace(currentAnchorage, nextShip);

    if (placementResult != null) {
      const [position, isRotated] = placementResult;
      appendShip(currentAnchorage, { position, isRotated, ...nextShip });
      allShips.splice(nextShipIndex, 1);
      continue;
    }

    // Proceed to next ship in case we failed to pack the current one.
    nextShipIndex++;

    // Can't place any more ships. Go onto next anchorage and continue.
    if (nextShipIndex == allShips.length) {
      nextShipIndex = 0;
      anchorages.push(newAnchorage(fleets.anchorageSize));
    }
  }

  return anchorages;
};

/// Tries to find the first free point that could fit a given ship.
/// Second element of the tuple is true if the ship had to be rotated before being fit.
/// Returns null if no position on an anchorage could fit the ship.
const tryPlace = (anchorage: Anchorage, ship: UnplacedShip): [Position, boolean] | null =>
  getCoveringPoints(anchorage.dimensions)
    .map<[Position, boolean] | null>(candidatePoint => {
      if (doesFit(anchorage, ship, candidatePoint))
        return [candidatePoint, false];
      else if (doesFit(anchorage, rotate(ship), candidatePoint))
        return [candidatePoint, true];
      else 
        return null;
    })
    .filter(it => it !== null)
    .head()

const rotate = (ship: UnplacedShip): UnplacedShip => 
  ({...ship, dimensions: { width: ship.dimensions.height, height: ship.dimensions.width }});

/// Does a given ship fit at a given position on a given anchorage
const doesFit = (anchorage: Anchorage, ship: UnplacedShip, position: Position): boolean =>
  getCoveringPoints(ship.dimensions)
    .map(point => translate(position, point))
    .all(point =>
      isInBounds(anchorage.dimensions, point)
      && !anchorage.occupiedCells.has(hash(anchorage.dimensions, point))
    );

/// Appends a placed ship onto an anchorage and marks the "occupied points" in it.
const appendShip = (anchorage: Anchorage, ship: PlacedShip) => {
  anchorage.ships.push(ship);
  getCoveringPoints((ship.isRotated ? rotate(ship) : ship).dimensions)
    .map(p => translate(ship.position, p))
    .map(p => hash(anchorage.dimensions, p))
    .forEach(pointHash => anchorage.occupiedCells.add(pointHash));
}

/// Creates a new empty anchorage
const newAnchorage = (dimensions: Dimensions): Anchorage =>
  ({ ships: [], occupiedCells: new Set([]), dimensions })

/// Flattens inputs IFleets into a collection of unplaced ships
const flattenAndSortShips = (fleets: IFleets): UnplacedShip[] => 
  fleets.fleets.flatMap(fleet => 
    Array
      .from({ length: fleet.shipCount })
      .map(_ => ({
        designation: fleet.shipDesignation,
        dimensions: fleet.singleShipDimensions
      }))
    )
    .sort((left, right) => getArea(right.dimensions) - getArea(left.dimensions));
