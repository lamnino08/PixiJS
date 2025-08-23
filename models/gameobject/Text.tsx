import { ComponentModel } from "@/models/gameobject/ComponentModel";
import { Text } from "@pixi/react";
import { ReactNode } from "react";
import * as PIXI from "pixi.js";

export interface TextConstructorProps {
    text: string;
    style?: PIXI.TextStyle;
}

export class TextComponentModel extends ComponentModel {
    text: string;
    style?: PIXI.TextStyle;
    rotation: number;
    scale: number;

    constructor(data: TextConstructorProps) {
        super();
        this.text = data.text;
        this.style = data.style ?? new PIXI.TextStyle({ fill: "white", fontSize: 24});
    }

    render(): ReactNode {
        return (
            <Text
                text={this.text}
                style={this.style}
                scale={this.gameObject.scale}
            />
        );
    }
}
