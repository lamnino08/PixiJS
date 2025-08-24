import { SceneModel } from "@/engine/core/models/scene/Scene";
import { header } from "@/workspace/scene/header";
import { Board, button, scoreGameObject } from "@/workspace/scene/Board";

export const scene = new SceneModel("DemoScene", [
    header,
    scoreGameObject,
    Board,
    button
]
);
