// /models/gameobject/SpriteComponentModel.Tween.ts
import { SpriteComponentModel } from "@/engine/core/models/gameobject/SpriteComponentModel";
import { Tween } from "@/lib/tween/Tween";
import { Easing } from "@/lib/tween/Easing";

// Helper: convert color
function hexToRgb(hex: number) {
  return {
    r: (hex >> 16) & 0xff,
    g: (hex >> 8) & 0xff,
    b: hex & 0xff,
  };
}
function rgbToHex(r: number, g: number, b: number) {
  return (r << 16) | (g << 8) | b;
}

declare module "@/engine/core/models/gameobject/SpriteComponentModel" {
  interface SpriteComponentModel {
    doAlpha(
      to: number,
      duration: number,
      onComplete?: () => void
    ): Tween;

    doColor(
      to: number,
      duration: number,
      onComplete?: () => void
    ): Tween;
  }
}

// ---- Implementation ----
SpriteComponentModel.prototype.doAlpha = function (
  this: SpriteComponentModel,
  to: number,
  duration: number,
  onComplete?: () => void
) {
  const from = this.gameObject.alpha;

  return new Tween(from, to, duration, (val) => {
    this.gameObject.alpha = val;
  })
    .setEasing(Easing.easeOutQuad)
    .onDone(() => onComplete?.())
    .start();
};

SpriteComponentModel.prototype.doColor = function (
  this: SpriteComponentModel,
  to: number,
  duration: number,
  onComplete?: () => void
) {
  const from = (this as any).tint ?? 0xffffff;
  const fromRGB = hexToRgb(from);
  const toRGB = hexToRgb(to);

  return new Tween(0, 1, duration, (t) => {
    const r = Math.round(fromRGB.r + (toRGB.r - fromRGB.r) * t);
    const g = Math.round(fromRGB.g + (toRGB.g - fromRGB.g) * t);
    const b = Math.round(fromRGB.b + (toRGB.b - fromRGB.b) * t);
    (this as any).tint = rgbToHex(r, g, b);
  })
    .setEasing(Easing.easeOutQuad)
    .onDone(() => onComplete?.())
    .start();
};
