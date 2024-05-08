import { packFleets } from "./lib";

describe('lib', () => {
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
      // Bigger ship is first since it yields better results for packing
      expect(ships[0].position).toStrictEqual({ x: 0, y: 0});
      // Fitting rotated doesn't change dimensions, but instead sets the appropriate flag.
      expect(ships[0].dimensions).toStrictEqual({ width: 1, height: 2})
      expect(ships[0].isRotated).toBe(true);

      expect(ships[1].position).toStrictEqual({ x: 2, y: 0});
    });

    test('should produce multiple anchorages if can\'t fit in one', () => {
      const anchorages = packFleets({
        anchorageSize: { width: 1, height: 1 },
        fleets: [
          {
            shipCount: 2,
            shipDesignation: "Boat",
            singleShipDimensions: { width: 1, height: 1 }
          }
        ]
      });

      expect(anchorages.length).toBe(2);
      expect(anchorages[0].ships.length).toBe(1);
      expect(anchorages[1].ships.length).toBe(1);
    });
  });
});
