import { SceneModel } from "@/engine/core/models/scene/Scene";
import { header } from "@/workspace/scene/header";
import { Board, button } from "@/workspace/scene/middle/Board";

export const scene = new SceneModel("DemoScene", [
    header,
    Board,
    button
]
);
