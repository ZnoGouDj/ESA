
import { IAnchorage, PlacedShip, UnplacedShip } from "./models/anchorage";
import { Dimensions, Position, getCoveringPoints, translate, hash, isInBounds } from "./models/geometry";
import { assertFleetsObjectValid, IFleets } from "./models/dto";

/// Packs a set of ships defined in the input object coming from
/// https://esa.instech.no/api/fleets/random
export const packFleets = (fleets: IFleets): IAnchorage[] => {
  assertFleetsObjectValid(fleets);
  const allShips = flattenShips(fleets);
  const anhorageSoFar = newAnchorage(fleets.anchorageSize);

  while (allShips.length) {
    const nextShip = allShips[0];
    const placementResult = tryPlace(anhorageSoFar, nextShip);
    if (placementResult != null) {
      const [position, isRotated] = placementResult;
      appendShip(anhorageSoFar, { position, isRotated, ...nextShip });
      allShips.shift();
    } else {
      break;
    }
  }

  return [ anhorageSoFar ];
};

/// Tries to find the first free point that could fit a given ship.
/// Second element of the tuple is true if the ship had to be rotated before being fit.
/// Returns null if no position on an anchorage could fit the ship.
const tryPlace = (anchorage: IAnchorage, ship: UnplacedShip): [Position, boolean] | null =>
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
const doesFit = (anchorage: IAnchorage, ship: UnplacedShip, position: Position): boolean =>
  getCoveringPoints(ship.dimensions)
    .map(point => translate(position, point))
    .all(point =>
      isInBounds(anchorage.dimensions, point)
      && !anchorage.occupiedCells.has(hash(anchorage.dimensions, point))
    );

/// Appends a placed ship onto an anchorage and marks the "occupied points" in it.
const appendShip = (anchorage: IAnchorage, ship: PlacedShip) => {
  anchorage.ships.push(ship);
  getCoveringPoints(ship.dimensions)
    .map(p => translate(ship.position, p))
    .map(p => hash(anchorage.dimensions, p))
    .forEach(pointHash => anchorage.occupiedCells.add(pointHash));
}

/// Creates a new empty anchorage
const newAnchorage = (dimensions: Dimensions): IAnchorage =>
  ({ ships: [], occupiedCells: new Set([]), dimensions })

/// Flattens inputs IFleets into a collection of unplaced ships
const flattenShips = (fleets: IFleets): UnplacedShip[] => 
  fleets.fleets.flatMap(fleet => 
    Array
      .from({ length: fleet.shipCount })
      .map(_ => ({
        designation: fleet.shipDesignation,
        dimensions: fleet.singleShipDimensions
      }))
    );
