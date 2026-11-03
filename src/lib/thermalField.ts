// One quadrant per stage, mirrored across both axes. Digits describe dot heat (0–9).
const stages = [
  ["001422", "002566", "247999", "013433", "000199", "100199", "010199", "000199"],
  ["110144", "232366", "459999", "279322", "294100", "293000", "194100", "094100"],
  ["992100", "985210", "122355", "995299", "999312", "199210", "199210", "199210"],
  ["014100", "025200", "026210", "013421", "002562", "125632", "157232", "142122"],
].map((stage) => stage.flatMap((row) => [...row].map(Number)));

type ColorStop = { heat: number; rgba: [number, number, number, number] };
const stops: ColorStop[] = [
  { heat: 0, rgba: [66, 27, 37, 0] },
  { heat: 0.04, rgba: [66, 27, 37, 50] },
  { heat: 0.16, rgba: [66, 27, 37, 155] },
  { heat: 0.27, rgba: [104, 96, 120, 205] },
  { heat: 0.43, rgba: [143, 174, 176, 230] },
  { heat: 0.61, rgba: [201, 199, 156, 245] },
  { heat: 0.78, rgba: [239, 80, 26, 255] },
  { heat: 1, rgba: [217, 44, 13, 255] },
];

// Color is applied after heat merges, so overlaps stay saturated instead of turning white.
const palette = new Uint8ClampedArray(256 * 4);
for (let index = 0; index < 256; index++) {
  const heat = index / 255;
  const end = stops.findIndex((stop) => stop.heat >= heat);
  const from = stops[Math.max(0, end - 1)];
  const to = stops[end];
  const mix = to.heat === from.heat ? 0 : (heat - from.heat) / (to.heat - from.heat);
  for (let channel = 0; channel < 4; channel++) {
    palette[index * 4 + channel] =
      from.rgba[channel] + (to.rgba[channel] - from.rgba[channel]) * mix;
  }
}

export function createThermalField(width: number, height: number, spacing: number) {
  const surface = document.createElement("canvas");
  surface.width = Math.max(1, Math.round(width / 2));
  surface.height = Math.max(1, Math.round(height / 2));
  const context = surface.getContext("2d");
  if (!context) return null;

  const { width: columns, height: rows } = surface;
  const scaleX = columns / width;
  const scaleY = rows / height;
  const heat = new Float32Array(columns * rows);
  const pixels = context.createImageData(columns, rows);
  const radius = Math.ceil(spacing * 1.4 * Math.max(scaleX, scaleY));
  const diameter = radius * 2 + 1;
  const kernel = new Float32Array(diameter * diameter);

  for (let y = -radius; y <= radius; y++) {
    for (let x = -radius; x <= radius; x++) {
      const distance = (x / (spacing * scaleX)) ** 2 + (y / (spacing * scaleY)) ** 2;
      // A broad field joins neighbors; the narrower peak retains individual dot centers.
      kernel[(y + radius) * diameter + x + radius] =
        0.85 * Math.exp(-distance / (2 * 0.5 ** 2)) + 0.5 * Math.exp(-distance / (2 * 0.17 ** 2));
    }
  }

  return (firstX: number, firstY: number, phase: number) => {
    heat.fill(0);

    for (let row = 0; row < 16; row++) {
      for (let column = 0; column < 12; column++) {
        const mirroredRow = Math.min(row, 15 - row);
        const mirroredColumn = Math.min(column, 11 - column);
        const index = mirroredRow * 6 + mirroredColumn;
        // A small spatial delay lets heat flow across the grid without breaking symmetry.
        const offset = mirroredRow * 0.006 + mirroredColumn * 0.004;
        const progress = (((phase - offset) % 1 + 1) % 1) * stages.length;
        const stage = Math.floor(progress);
        const t = progress - stage;
        const previous = stages[(stage + stages.length - 1) % stages.length][index];
        const from = stages[stage][index];
        const to = stages[(stage + 1) % stages.length][index];
        const next = stages[(stage + 2) % stages.length][index];
        // Periodic Catmull–Rom interpolation carries velocity through each stage
        // and the loop boundary, instead of easing every dot to a stop together.
        const value = 0.5 * (
          2 * from +
          (to - previous) * t +
          (2 * previous - 5 * from + 4 * to - next) * t * t +
          (-previous + 3 * from - 3 * to + next) * t * t * t
        );
        const intensity = Math.max(0, value) / 9;
        if (intensity === 0) continue;
        const centerX = Math.round((firstX + column * spacing) * scaleX);
        const centerY = Math.round((firstY + row * spacing) * scaleY);
        for (
          let y = Math.max(0, centerY - radius);
          y <= Math.min(rows - 1, centerY + radius);
          y++
        ) {
          for (
            let x = Math.max(0, centerX - radius);
            x <= Math.min(columns - 1, centerX + radius);
            x++
          ) {
            heat[y * columns + x] +=
              intensity * kernel[(y - centerY + radius) * diameter + x - centerX + radius];
          }
        }
      }
    }

    for (let index = 0; index < heat.length; index++) {
      const color = Math.min(255, Math.round(heat[index] * 255)) * 4;
      const pixel = index * 4;
      pixels.data[pixel] = palette[color];
      pixels.data[pixel + 1] = palette[color + 1];
      pixels.data[pixel + 2] = palette[color + 2];
      pixels.data[pixel + 3] = palette[color + 3];
    }
    context.putImageData(pixels, 0, 0);
    return surface;
  };
}
