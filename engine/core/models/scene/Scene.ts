import { GameObjectModel } from "@/engine/core/models/gameobject/GameObjectModel";

export class SceneModel {
    name: string;
    gameObjects: GameObjectModel[];

    constructor(name: string, gameObjects: GameObjectModel[] = []) {
        this.name = name;
        this.gameObjects = gameObjects;
    }

    destroy() {
        this.gameObjects.forEach(obj => obj.destroy());
        this.gameObjects = [];
    }
}
