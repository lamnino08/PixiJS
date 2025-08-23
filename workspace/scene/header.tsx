import { GameObjectModel } from "@/engine/core/models/gameobject/GameObjectModel"
import { SpriteComponentModel } from "@/engine/core/models/gameobject/SpriteComponentModel"
import { TextComponentModel } from "@/engine/core/models/gameobject/TextComponentModel"
import { Point, TextStyle } from "pixi.js"
import { Window } from "@/workspace/config/GameConfig"

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
const style = new TextStyle({
    fontFamily: "Arial",
    fontSize: 24,
    fontWeight: "bold",
    fill: ["#ffffff", "#ffcc00"], // gradient từ trắng sang vàng
    stroke: "#000000",
    strokeThickness: 3,
    dropShadow: true,
    dropShadowColor: "#000000",
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 3,
  });
  
  const gameTitle = new GameObjectModel({
    width: 240,
    height: 60,
    position: new Point(Window.width/2, 30),
    components: [
      new TextComponentModel({
        text: "Slot Candy Match 4",
        style
      })
    ]
  });

export const header = new GameObjectModel({
    width: Window.width,
    height: Window.headerHeight,
    childrens: [logo, gameTitle]
})