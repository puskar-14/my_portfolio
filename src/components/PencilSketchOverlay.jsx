import React from 'react';

export function PencilSketchOverlay() {
  return (
    <div 
      className="pointer-events-none fixed inset-0 z-20 opacity-30 select-none mix-blend-multiply"
      aria-hidden="true"
    >
      {/* SVG Fine Grain Filter for Pencil Texture */}
      <svg className="w-full h-full">
        <filter id="paper-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.15 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#paper-noise)" />
      </svg>
    </div>
  );
}
