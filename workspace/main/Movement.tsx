import { ComponentModel } from "@/engine/core/models/gameobject/ComponentModel";

// Component làm GameObject di chuyển
export class MoveComponent extends ComponentModel {
  vx: number;
  vy: number;

  constructor(vx = 0, vy = 0) {
    super();
    this.vx = vx;
    this.vy = vy;
  }

  update(delta: number) {
    this.gameObject.position.x += this.vx * delta;
    this.gameObject.position.y += this.vy * delta;
  }
}
