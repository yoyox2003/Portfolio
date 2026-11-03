import assert from "node:assert/strict";
import { createThermalField, getThermalFieldBounds } from "../src/lib/thermalField.ts";

// Exercise the actual renderer without requiring a browser or a canvas package.
let pixels;
globalThis.document = {
  createElement: () => {
    const surface = { width: 0, height: 0 };
    const context = {
      createImageData: (width, height) => ({ data: new Uint8ClampedArray(width * height * 4) }),
      putImageData: (image) => {
        pixels = image.data.slice();
      },
    };
    surface.getContext = () => context;
    return surface;
  },
};

const idle = createThermalField(420, 560, 32);
idle(34, 40, 0);
const firstFrame = pixels;
idle(34, 40, 1);
assert.deepEqual(pixels, firstFrame, "The idle loop should close without a jump");
idle(34, 40, 0, 1);
assert.ok(pixels.some((value, index) => value !== firstFrame[index]), "Charging should change the heat field");

const countGlowingDots = () => {
  let glowing = 0;
  for (let row = 0; row < 16; row++) {
    for (let column = 0; column < 12; column++) {
      const pixel = (Math.round((40 + row * 32) / 2) * 210 + Math.round((34 + column * 32) / 2)) * 4;
      if (pixels[pixel] >= 190 && pixels[pixel + 3] >= 220) glowing++;
    }
  }
  return glowing;
};
for (const phase of [0, 0.25, 0.5, 0.75]) {
  const counts = [0, 0.5, 1].map((charge) => {
    idle(34, 40, phase, charge);
    return countGlowingDots();
  });
  assert.ok(counts[1] >= counts[0] && counts[2] > counts[0] && counts[2] >= counts[1], "Revving should progressively light more dots at the same animation phase");
}

// Both idle and charged glows must reach transparency before the buffer edge.
const bounds = getThermalFieldBounds(34, 40, 32);
const padded = createThermalField(bounds.width, bounds.height, 32);
for (const phase of [0, 0.25, 0.5, 0.75]) {
  for (const charge of [0, 1]) {
    const surface = padded(34 - bounds.x, 40 - bounds.y, phase, charge);
    for (let y = 0; y < surface.height; y++) {
      for (let x = 0; x < surface.width; x++) {
        if (x === 0 || y === 0 || x === surface.width - 1 || y === surface.height - 1) {
          assert.equal(pixels[(y * surface.width + x) * 4 + 3], 0, "Glow must not be clipped at the buffer edge");
        }
      }
    }
  }
}

console.log("Thermal checks passed: idle loop, charge density, and transparent glow edges.");
