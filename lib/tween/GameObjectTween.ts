import { GameObjectModel } from "@/engine/core/models/gameobject/GameObjectModel";
import { Tween } from "@/lib/tween/Tween";
import { Easing } from "@/lib/tween/Easing";

declare module "@/engine/core/models/gameobject/GameObjectModel" {
  interface GameObjectModel {
    doScale(
      to: number,
      duration: number,
      onComplete?: () => void
    ): Tween;
  }
}

GameObjectModel.prototype.doScale = function (
  this: GameObjectModel,
  to: number,
  duration: number,
  onComplete?: () => void
) {
  const from = this.scale;

  return new Tween(from, to, duration, (val) => {
    this.scale = val;
  })
    .setEasing(Easing.easeOutBounce) // hoặc Easing khác tùy bạn
    .onDone(() => onComplete?.())
    .start();
};
