
import { IAnchorage, PlacedShip, UnplacedShip } from "./models/anchorage";
import { Position } from "./models/common";
import { IFleets } from "./models/dto";

/// Packs a set of ships defined in the input object coming from
/// https://esa.instech.no/api/fleets/random
export const packFleets = (fleets: IFleets): IAnchorage[] => {
  assertFleetsObjectValid(fleets);
  const allShips = flattenShips(fleets);
  let anhorageSoFar: IAnchorage = { ships: [], dimensions: fleets.anchorageSize };
  while (allShips.length) {
    const nextShip = allShips[0];
    const nextPosition = tryPlace(anhorageSoFar, nextShip);


    if (nextPosition != null) {
      const nextPlacedShip: PlacedShip = {
        position: nextPosition,
        ...nextShip,
      };
      anhorageSoFar.ships.push(nextPlacedShip);
      allShips.shift();
    } else {
      break;
    }
  }

  return [ anhorageSoFar ];
};

const tryPlace = (anchorage: IAnchorage, _: UnplacedShip): Position | null => {
  for (let position of getAllPositions(anchorage)) {
    if (anchorage.ships.find(s => s.position.x == position.x && s.position.y == position.y) === undefined) {
      return position;
    }
  }

  return null;
}

function* getAllPositions(anchorage: IAnchorage): Generator<Position, void, Position> {
  for (let x = 0; x < anchorage.dimensions.width; x++) {
    for (let y = 0; y < anchorage.dimensions.height; y++) {
      yield { x, y };
    }
  }
}

const flattenShips = (fleets: IFleets): UnplacedShip[] => 
  fleets.fleets.flatMap(fleet => 
    Array
      .from({ length: fleet.shipCount })
      .map(_ => ({
        designation: fleet.shipDesignation,
        dimensions: fleet.singleShipDimensions
      }))
    );

const assertFleetsObjectValid = (fleets: IFleets) => {
  if (fleets.anchorageSize.height <= 0) {
    throw Error("Oops! Anchorage height is invalid.");
  }
  
  if (fleets.anchorageSize.width <= 0) {
    throw Error("Oops! Anchorage width is invalid.");
  }
}