import { GameObjectModel } from "@/engine/core/models/gameobject/GameObjectModel"
import { SpriteComponentModel } from "@/engine/core/models/gameobject/SpriteComponentModel"
import { TextComponentModel } from "@/engine/core/models/gameobject/TextComponentModel"
import { Point } from "pixi.js"
import { textStyle, Window } from "@/workspace/config/GameConfig"

const logo = new GameObjectModel({
    width: 40,
    height: 13,
    position: new Point(50, 20),
    components: [
        new SpriteComponentModel({
            texture: '/assets/sprites/logo.png'
        })
    ]
})

  
  const gameTitle = new GameObjectModel({
    width: 240,
    height: 60,
    position: new Point(Window.width/2, 30),
    components: [
      new TextComponentModel({
        text: "Slot Candy Match 4",
        style: textStyle
      })
    ]
  });

export const header = new GameObjectModel({
    width: Window.width,
    height: Window.headerHeight,
    childrens: [logo, gameTitle]
})