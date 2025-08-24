import { ComponentModel } from "@/engine/core/models/gameobject/ComponentModel";
import { Graphics as PixiGraphics } from "@pixi/react";
import { Graphics } from "pixi.js";
import { ReactNode } from "react";

export interface MaskProps {
    radius?: number;
}

export class MaskComponentModel extends ComponentModel {
    radius: number;
    maskGraphics: Graphics | null = null;

    constructor(props: MaskProps = {}) {
        super();
        this.radius = props.radius ?? 0;
    }

    private drawMask = (g: Graphics) => {
        this.maskGraphics = g;

        g.clear();
        g.beginFill(0xffffff);
        if (this.radius > 0) {
            g.drawRoundedRect(
                -this.gameObject.width / 2,
                -this.gameObject.height / 2,
                this.gameObject.width,
                this.gameObject.height,
                this.radius
            );
        } else {
            g.drawRect(
                -this.gameObject.width / 2,
                -this.gameObject.height / 2,
                this.gameObject.width,
                this.gameObject.height
            );
        }
        g.endFill();
    }

    render(): ReactNode {
        return <PixiGraphics draw={this.drawMask} />;
    }
}
