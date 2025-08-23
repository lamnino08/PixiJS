'use client'

import { Stage } from "@pixi/react";
import { SceneView } from "@/engine/core/scene/Scene";
import { GameObjectModel } from "@/engine/core/models/gameobject/GameObjectModel";
import { SceneModel } from "@/engine/core/models/scene/Scene";
import { SpriteComponentModel } from "@/engine/core/models/gameobject/SpriteComponentModel";
import { MoveComponent } from "@/game/main/Movement";
import { TextComponentModel } from "@/engine/core/models/gameobject/Text";
import * as PIXI from "pixi.js";
import { ButtonComponentModel } from "@/engine/core/component/ButtonComponent";
import { HoverFeedbackComponent } from "@/game/main/HoverFeedback";


export default function PixiApp() {
  const bunnySprite = new SpriteComponentModel({
    texture: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png",
  });

  const movement = new MoveComponent(1, 1);

  const textComponent = new TextComponentModel({
    text: "I'm child of Bunny 🐰",
  });

  const BunnyText = new GameObjectModel({
    components: [textComponent],
  });

  const Bunny = new GameObjectModel({
    components: [bunnySprite, movement],
    position: new PIXI.Point(0, 0),
    children: [BunnyText]
  });

  const buttonComponent = new ButtonComponentModel({
    onClick: () => console.log("Click")
  });

  const hoverFeedback = new HoverFeedbackComponent();
  const button = new GameObjectModel({
    components: [buttonComponent, hoverFeedback],
    position: new PIXI.Point(200, 200),
  });

  const scene = new SceneModel("DemoScene", [Bunny, button]);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#100000',
      }}
    >
      <Stage width={500} height={500} options={{ backgroundColor: 0x1099bb }}>
        <SceneView scene={scene} />
      </Stage>
    </div>
  );
}
