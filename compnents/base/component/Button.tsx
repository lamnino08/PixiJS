import { ComponentModel } from "@/models/gameobject/ComponentModel";
import { SpriteComponentModel } from "@/models/gameobject/SpriteComponentModel";
import { Sprite, Graphics } from "@pixi/react";
import * as PIXI from "pixi.js";

export interface ButtonProps {
  text?: string;
  onClick?: () => void;
}

export class ButtonComponentModel extends ComponentModel {

  text: string = "button";

  constructor(props: ButtonProps) {
    super();
    this.text = props.text ?? "button";
    this.onPointerDown = props.onClick;
  }

  start(): void {
    console.log("ButtonStart")
    this.gameObject.getOrAddComponent(
      SpriteComponentModel,
      () => new SpriteComponentModel({})
    );
  }

  addListener(fn: (...args: any[]) => void) {
    this.gameObject.onPointerDown.subscribe(fn);
  }
}
