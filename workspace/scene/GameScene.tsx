import { SceneModel } from "@/engine/core/models/scene/Scene";
import { symbol } from "@/workspace/scripts/symbol/Symbol";
import { header } from "@/workspace/scene/header";
import { Board } from "@/workspace/scene/middle/Board";

export const scene = new SceneModel("DemoScene", [
    header,
    Board,
]
);
