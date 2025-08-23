import { GameObjectModel } from "@/models/gameobject/GameObjectModel";
import { tween } from "@/lib/tween/Tween";

declare module "@/models/gameobject/GameObject" {
  interface GameObjectModel {
    doScale(to: number, duration: number, onComplete?: () => void): void;
  }
}

GameObjectModel.prototype.doScale = function (
  this: GameObjectModel,
  to: number,
  duration: number,
  onComplete?: () => void
) {
  const from = this.scale;
  tween(from, to, duration, (val) => {
    this.scale = val;
  }, onComplete);
};
