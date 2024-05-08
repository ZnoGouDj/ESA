import { IFleets } from "./models/dto";
import { packFleets } from "./lib";
import minimalSample from "./sample.minimal.json";

describe('packFleets', () => {
  test('requires an input object in the same shape as the api output', () => {
    const input = minimalSample as IFleets;
    packFleets(input);
  });

  describe('input validation', () => {
    test('should crash in case of invalid width', () => {
      expect(() => 
        packFleets({
          anchorageSize: { width: -1, height: 2 },
          fleets: []
        })
      ).toThrow('Oops! Anchorage width is invalid.');
    });

    test('should crash in case of invalid height', () => {
      expect(() => 
        packFleets({
          anchorageSize: { width: 2, height: -1 },
          fleets: []
        })
      ).toThrow('Oops! Anchorage height is invalid.');
    });
  });

  describe('ship packing', () => {
    test('can place single ship smaller than anchorage size', () => {
      const anchorages = packFleets({
        anchorageSize: { width: 2, height: 1 },
        fleets: [
          {
            shipCount: 1,
            shipDesignation: "Boat",
            singleShipDimensions: { width: 1, height: 1 }
          }
        ]
      });

      expect(anchorages.length).toBe(1);
      expect(anchorages[0].ships.length).toBe(1);
    });

    test('can place multiple ships in the same anchorage with correct positions', () => {
      const anchorages = packFleets({
        anchorageSize: { width: 2, height: 1 },
        fleets: [
          {
            shipCount: 2,
            shipDesignation: "Boat",
            singleShipDimensions: { width: 1, height: 1 }
          }
        ]
      });
      
      expect(anchorages.length).toBe(1);
      const ships = anchorages[0].ships;
      expect(ships.length).toBe(2);
      expect(ships[0].position).toStrictEqual({ x: 0, y: 0});
      expect(ships[1].position).toStrictEqual({ x: 1, y: 0});
    });

    test('can place multiple ships of non-unit size', () => {
      const anchorages = packFleets({
        anchorageSize: { width: 2, height: 2 },
        fleets: [
          {
            shipCount: 2,
            shipDesignation: "Boat",
            singleShipDimensions: { width: 2, height: 1 }
          }
        ]
      });
  
      expect(anchorages.length).toBe(1);
      const ships = anchorages[0].ships;
      expect(ships.length).toBe(2);
      expect(ships[0].position).toStrictEqual({ x: 0, y: 0});
      expect(ships[1].position).toStrictEqual({ x: 0, y: 1});
    });

    test('can place multiple ships of different size, one of which must be rotated', () => {
      const anchorages = packFleets({
        anchorageSize: { width: 3, height: 1 },
        fleets: [
          {
            shipCount: 1,
            shipDesignation: "Boat",
            singleShipDimensions: { width: 1, height: 1 }
          },
          {
            shipCount: 1,
            shipDesignation: "Long Boat",
            singleShipDimensions: { width: 1, height: 2 }
          }
        ]
      });
  
      expect(anchorages.length).toBe(1);
      const ships = anchorages[0].ships;

      expect(ships.length).toBe(2);
      expect(ships[0].position).toStrictEqual({ x: 0, y: 0});
      expect(ships[1].position).toStrictEqual({ x: 1, y: 0});
      // Fitting rotated doesn't change dimensions, but instead sets the appropriate flag.
      expect(ships[1].dimensions).toStrictEqual({ width: 1, height: 2})
      expect(ships[1].isRotated).toBe(true);
    });
  });
});
