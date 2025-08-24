import { ReactNode } from "react";
import { GameObjectModel } from "@/engine/core/models/gameobject/GameObjectModel";
import { Event } from "@/lib/Event";

export abstract class ComponentModel {
  gameObject!: GameObjectModel;

  start?(): void; // run after add to Gameobjec
  update?(delta: number): void; // run follow ticker
  onDestroy?(): void;

  onReRender = new Event();

  render?(): ReactNode; // use PixiJs to render React Component

  getComponent<T extends ComponentModel>(ctor: new (...args: any[]) => T): T | undefined {
    return this.gameObject.getComponent<T>(ctor);
  }

  onHoverEnter?(): void;
  onHoverExit?(): void;
  onPointerDown?(): void;
  onPointerUp?(): void;
  onPointerUpOutside?(): void;
  onPointerTap?(): void;
}
