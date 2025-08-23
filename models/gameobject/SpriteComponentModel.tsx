import { ComponentModel } from "@/models/gameobject/ComponentModel";
import { Graphics, Sprite } from "@pixi/react";
import { ReactNode } from "react";

export interface SpriteConstructorProps {
    texture?: string;
    anchor?: number | [number, number];
}

export class SpriteComponentModel extends ComponentModel {
    texture?: string;
    anchor: number | [number, number];

    constructor(data: SpriteConstructorProps = {}) {
        super();
        this.texture = data.texture;
        this.anchor = data.anchor ?? 0.5;
    }

    render(): ReactNode {
        if (this.texture) {
            return (
                <Sprite
                    image={this.texture}
                    width={this.gameObject.width}
                    height={this.gameObject.height}
                    anchor={this.anchor}
                    interactive={true}
                    pointerover={() => { this.gameObject.onHoverEnter.invoke(); console.log("ok"); }}
                    pointerout={() => this.gameObject.onHoverExit.invoke()}
                    scale={this.gameObject.scale}
                />
            );
        }
    
        return (
            <Graphics
                interactive={true}
                pointerover={() => this.gameObject.onHoverEnter.invoke()}
                pointerout={() => this.gameObject.onHoverExit.invoke()}
                draw={(g) => {
                    g.clear();
                    g.beginFill(0xffffff);
                    g.drawRect(0, 0, this.gameObject.width, this.gameObject.height);
                    g.endFill();
                }}
            />
        );
    }     
}
