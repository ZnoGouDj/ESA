export const newAnchorage = (width: number, height: number): number[][] => {
  if (width <= 0 || height <= 0) {
    return [];
  }

  width = Math.floor(width);
  height = Math.floor(height);

  const container: number[][] = [];

  for (let i = 0; i < height; i++) {
    container.push(Array(width).fill(0));
  }

  return container;
}