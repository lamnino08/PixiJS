import { GameObjectModel } from "@/engine/core/models/gameobject/GameObjectModel";
import { SpriteComponentModel } from "@/engine/core/models/gameobject/SpriteComponentModel";
import { BoardConfig, SymbolConfig } from "@/workspace/config/GameConfig";
import { Point } from "pixi.js";
import { SymbolType, symbol } from "@/workspace/scripts/symbol/Symbol";

export const createReel = (reelIndex: number): GameObjectModel => {
  const reelSprite = new SpriteComponentModel({
    color: 0x0000ff,
    borderColor: 0x00ff00,
    borderWidth: 2,
  });

  let symbols: GameObjectModel[] = [];

  for (let j = 1; j <= BoardConfig.rowCount; j++) {
    const symbolGameObject = symbol(`${j}` as SymbolType);

    symbolGameObject.position = new Point(
      SymbolConfig.width / 2,
      -((SymbolConfig.height * BoardConfig.rowCount) / 2) +
        j * SymbolConfig.height
    );

    symbols.push(symbolGameObject);
  }

  const reel: GameObjectModel = new GameObjectModel({
    width: SymbolConfig.width,
    height: SymbolConfig.height * BoardConfig.rowCount,
    position: new Point(
      -((SymbolConfig.width * BoardConfig.reelCount) / 2) +
        reelIndex * SymbolConfig.width +
        SymbolConfig.width / 2,
      0
    ),
    components: [reelSprite],
    childrens: symbols,
  });

  return reel;
};
