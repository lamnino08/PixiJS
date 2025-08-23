import { GameObjectModel } from "@/engine/core/models/gameobject/GameObjectModel";
import { SpriteComponentModel } from "@/engine/core/models/gameobject/SpriteComponentModel";
import { BoardConfig, SymbolConfig, Window } from "@/workspace/config/GameConfig"
import { Point } from "pixi.js";

const sprite = new SpriteComponentModel({
    color: 0xff0000,
    radius: 8
})

export const Board = new GameObjectModel({
    width: SymbolConfig.width * BoardConfig.reelCount,
    height: SymbolConfig.height * BoardConfig.rowCount,
    position: new Point(Window.width/2, Window.headerHeight + SymbolConfig.height * BoardConfig.rowCount/2),
    components: [sprite]
})