import { assertFleetsObjectValid } from "./dto";

describe('input validation', () => {
  test('should crash in case of invalid width', () => {
    expect(() => 
      assertFleetsObjectValid({
        anchorageSize: { width: -1, height: 2 },
        fleets: []
      })
    ).toThrow('Oops! Anchorage width is invalid.');
  });

  test('should crash in case of invalid height', () => {
    expect(() => 
      assertFleetsObjectValid({
        anchorageSize: { width: 2, height: -1 },
        fleets: []
      })
    ).toThrow('Oops! Anchorage height is invalid.');
  });
});
