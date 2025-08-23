import { ReactNode } from "react";
import { GameObjectModel } from "@/models/gameobject/GameObjectModel";

export abstract class ComponentModel {
  gameObject!: GameObjectModel;

  start?(): void; // run after add to Gameobjec
  update?(delta: number): void; // run follow ticker
  onDestroy?(): void;

  render?(): ReactNode; // use PixiJs to render React Component

  onHoverEnter?(): void;
  onHoverExit?(): void;
  onPointerDown?(): void;
  onPointerUp?(): void;
  onPointerUpOutside?(): void;
  onPointerTap?(): void;
}
