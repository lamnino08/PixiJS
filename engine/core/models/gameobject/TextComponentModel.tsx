import { ComponentModel } from "@/engine/core/models/gameobject/ComponentModel";
import { Text, Graphics } from "@pixi/react";
import { ReactNode } from "react";
import * as PIXI from "pixi.js";

export interface TextConstructorProps {
  text: string;
  style?: PIXI.TextStyle | Partial<PIXI.ITextStyle>;

  x?: number;
  y?: number;
  rotation?: number;
  scaleX?: number;
  scaleY?: number;
  alpha?: number;

  // Interaction
  interactive?: boolean;
  buttonMode?: boolean;
  hoverColor?: number | string;
}

export class TextComponentModel extends ComponentModel {
  text: string;
  style: PIXI.TextStyle;

  x: number;
  y: number;
  rotation: number;
  scaleX: number;
  scaleY: number;
  alpha: number;

  interactive: boolean;
  buttonMode: boolean;
  hoverColor?: number | string;

  private originalFill: any;

  constructor(data: TextConstructorProps) {
    super();
    this.text = data.text;

    if (data.style instanceof PIXI.TextStyle) {
      this.style = data.style;
    } else {
      this.style = new PIXI.TextStyle({
        fill: "white",
        fontSize: 24,
        fontFamily: "Arial",
        align: "center",
        ...data.style,
      });
    }

    this.originalFill = this.style.fill;

    this.x = data.x ?? 0;
    this.y = data.y ?? 0;
    this.rotation = data.rotation ?? 0;
    this.scaleX = data.scaleX ?? 1;
    this.scaleY = data.scaleY ?? 1;
    this.alpha = data.alpha ?? 1;

    this.interactive = data.interactive ?? true;
    this.buttonMode = data.buttonMode ?? false;
    this.hoverColor = data.hoverColor;
  }

  render(): ReactNode {
    const textNode = (
      <Text
        text={this.text}
        style={this.style}
        anchor={0.5}
        x={this.x}
        y={this.y}
        rotation={this.rotation}
        scale={{
          x: this.scaleX,
          y: this.scaleY,
        }}
        alpha={this.alpha}
        interactive={this.interactive}
        pointerover={() => {
          this.gameObject.onHoverEnter.invoke();
          if (this.hoverColor) {
            this.style.fill = this.hoverColor as any;
          }
        }}
        pointerout={() => {
          this.gameObject.onHoverExit.invoke();
          if (this.hoverColor) {
            this.style.fill = this.originalFill;
          }
        }}
        pointerdown={() => this.gameObject.onPointerDown.invoke()}
        pointerup={() => this.gameObject.onPointerUp.invoke()}
        pointertap={() => this.gameObject.onPointerTap.invoke()}
      />
    );

    return textNode;
  }
}
