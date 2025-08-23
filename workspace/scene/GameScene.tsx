import { SceneModel } from "@/engine/core/models/scene/Scene";
import { symbol } from "@/workspace/symbol/Symbol";
import { header } from "@/workspace/scene/header";
import { Board } from "@/workspace/scene/middle/container";


export const scene = new SceneModel("DemoScene", [
    header,
    Board,
    symbol('1').gameObject]
);