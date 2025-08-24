import { ComponentModel } from "@/engine/core/models/gameobject/ComponentModel";
import { GameObjectModel } from "@/engine/core/models/gameobject/GameObjectModel";
import { SpriteComponentModel } from "@/engine/core/models/gameobject/SpriteComponentModel";
import { SymbolConfig } from "@/workspace/config/GameConfig";

export type SymbolType = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'K';

export const symbolPool: SymbolType[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'K'];

export const getSymbolTextureUrl = (symbol: SymbolType): string => {
    return `assets/sprites/symbol_${symbol}.png`;
};

export const getSymbolBlurTextureUrl = (symbol: SymbolType): string => {
    return `assets/sprites/symbol_${symbol}_blur.png`;
};

export const symbol = (texture: SymbolType) => {
    const symbol = new Symbol(texture)

    new GameObjectModel({
        width: SymbolConfig.width,
        height: SymbolConfig.height,
        components: [symbol]
    })

    return symbol;
}

export class Symbol extends ComponentModel {
    sprite: SpriteComponentModel;

    private _symbolType: SymbolType;

    constructor(symbol: SymbolType) {
        super();
        this._symbolType = symbol;
    }

    start(): void {
        this.sprite = this.gameObject.getOrAddComponent(SpriteComponentModel)
        this.sprite.texture = getSymbolTextureUrl(this._symbolType);
    }

    setNewSybolType = (symbol: SymbolType) => {
        this._symbolType = symbol;
        this.sprite.texture = getSymbolBlurTextureUrl(symbol);
    }

    toBlur(): void {
        this.sprite.texture = getSymbolBlurTextureUrl(this._symbolType);
    }

    toUnBlur(): void {
        this.sprite.texture = getSymbolTextureUrl(this._symbolType);
    }
}
