import { ComponentModel } from "@/engine/core/models/gameobject/ComponentModel";
import { Graphics, Sprite } from "@pixi/react";
import { ReactNode } from "react";

export interface SpriteConstructorProps {
    texture?: string;
    anchor?: number | [number, number];
    color?: number;
    radius?: number;

    borderColor?: number;
    borderWidth?: number;

    alpha?: number;

    shadowColor?: number;
    shadowBlur?: number;
    shadowOffsetX?: number;
    shadowOffsetY?: number;

    x?: number;
    y?: number;
    rotation?: number;
    scaleX?: number;
    scaleY?: number;

    buttonMode?: boolean;
    hoverColor?: number;
}

export class SpriteComponentModel extends ComponentModel {
    texture?: string;
    anchor: number | [number, number];
    color: number;
    radius: number;

    borderColor: number;
    borderWidth: number;

    alpha: number;

    shadowColor?: number;
    shadowBlur: number;
    shadowOffsetX: number;
    shadowOffsetY: number;

    x: number;
    y: number;
    rotation: number;
    scaleX: number;
    scaleY: number;

    buttonMode: boolean;
    hoverColor?: number;

    constructor(data: SpriteConstructorProps = {}) {
        super();
        this.texture = data.texture;
        this.anchor = data.anchor ?? 0.5;
        this.color = data.color ?? 0xffffff;
        this.radius = data.radius ?? 0;

        this.borderColor = data.borderColor ?? 0x000000;
        this.borderWidth = data.borderWidth ?? 0;

        this.alpha = data.alpha ?? 1;

        this.shadowColor = data.shadowColor;
        this.shadowBlur = data.shadowBlur ?? 0;
        this.shadowOffsetX = data.shadowOffsetX ?? 0;
        this.shadowOffsetY = data.shadowOffsetY ?? 0;

        this.x = data.x ?? 0;
        this.y = data.y ?? 0;
        this.rotation = data.rotation ?? 0;
        this.scaleX = data.scaleX ?? 1;
        this.scaleY = data.scaleY ?? 1;

        this.buttonMode = data.buttonMode ?? false;
        this.hoverColor = data.hoverColor;
    }

    render(): ReactNode {
        const commonProps = {
            interactive: true,
            buttonMode: this.buttonMode,
            alpha: this.alpha,
            rotation: this.rotation,
            scale: { x: this.scaleX, y: this.scaleY },
            x: this.x - this.gameObject.width / 2,
            y: this.y - this.gameObject.height / 2,

            pointerover: () => {
                this.gameObject.onHoverEnter.invoke();
                if (this.hoverColor) this.color = this.hoverColor;
            },
            pointerout: () => this.gameObject.onHoverExit.invoke(),
            pointerdown: () => this.gameObject.onPointerDown.invoke(),
            pointerup: () => this.gameObject.onPointerUp.invoke(),
            pointerupoutside: () => this.gameObject.onPointerUpOutside.invoke(),
            pointertap: () => this.gameObject.onPointerTap.invoke(),
        };

        if (this.texture) {
            return (
                <Sprite
                    image={this.texture}
                    width={this.gameObject.width}
                    height={this.gameObject.height}
                    anchor={this.anchor}
                    tint={this.color}
                    {...commonProps}
                />
            );
        }

        return (
            <Graphics
                draw={(g) => {
                    g.clear();
                    if (this.borderWidth > 0) {
                        g.lineStyle(this.borderWidth, this.borderColor);
                    }
                    g.beginFill(this.color);

                    if (this.radius > 0) {
                        g.drawRoundedRect(0, 0, this.gameObject.width, this.gameObject.height, this.radius);
                    } else {
                        g.drawRect(0, 0, this.gameObject.width, this.gameObject.height);
                    }
                    g.endFill();
                }}
                {...commonProps}
            />
        );
    }
}
