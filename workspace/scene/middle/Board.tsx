import { GameObjectModel } from "@/engine/core/models/gameobject/GameObjectModel";
import { SpriteComponentModel } from "@/engine/core/models/gameobject/SpriteComponentModel";
import { BoardConfig, SymbolConfig, Window } from "@/workspace/config/GameConfig";
import { Point } from "pixi.js";
import { BoardManager } from "@/workspace/scripts/board/BoardManager";
import { ReelComponent } from "@/workspace/scripts/board/ReelComponent";
import { MaskComponentModel } from "@/engine/core/models/gameobject/MaskComponentModel";
import { ButtonComponentModel } from "@/engine/core/component/ButtonComponent";
import { HoverFeedbackComponent } from "@/workspace/main/HoverFeedback";

export const buttonComponent = new ButtonComponentModel()
export const button = new GameObjectModel({
  width: 150,
  height: 55,
  position: new Point(Window.width / 2, Window.height - 50),
  components: [
      new HoverFeedbackComponent(),
      buttonComponent
  ]
})
const boardBorderWidth = 4;

const boardSprite = new SpriteComponentModel({
  color: 0xff0000,
  radius: 8,
  borderColor: 0x00ff00,
  borderWidth: boardBorderWidth,
});

const boardManager = new BoardManager();
buttonComponent.onClick.subscribe(boardManager.startSpin)

const reels = () => {
  const reelGameobjects: GameObjectModel[] = [];

  for (let i = 0; i < BoardConfig.reelCount; i++) {
    const reelSprite = new SpriteComponentModel({
      color: 0x0000ff,
      borderColor: 0x00ff00,
      borderWidth: 2,
    });

    const reelComponent = new ReelComponent();

    const reelGameobject = new GameObjectModel({
      width: SymbolConfig.width+4,
      height: SymbolConfig.height * BoardConfig.rowCount + boardBorderWidth,
      position: new Point(
        -((SymbolConfig.width * BoardConfig.reelCount) / 2) + i * SymbolConfig.width + SymbolConfig.width / 2,
        0
      ),
      components: [reelSprite, reelComponent],
    });

    reelGameobjects.push(reelGameobject);
    boardManager.reels.push(reelComponent);

  }
  return reelGameobjects;
}

const mask = new MaskComponentModel({ radius: 8 });

export const Board = new GameObjectModel({
  width: SymbolConfig.width * BoardConfig.reelCount,
  height: SymbolConfig.height * BoardConfig.rowCount,
  position: new Point(
    Window.width / 2,
    Window.headerHeight + (SymbolConfig.height * BoardConfig.rowCount) / 2
  ),
  components: [boardSprite, boardManager, mask],
  childrens: reels()
});
