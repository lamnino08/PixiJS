import { useTick, Container } from "@pixi/react";
import React from "react";
import { GameObjectModel } from "@/models/gameobject/GameObjectModel";
import { GameObject } from "@/compnents/base/gameobject/GameObject";
import { SceneModel } from "@/models/scene/Scene";

interface SceneViewProps {
    scene: { gameObjects: GameObjectModel[]; update: (delta: number) => void };
}

export const SceneView: React.FC<{ scene: SceneModel }> = ({ scene }) => {
    useTick((delta) => {
        scene.gameObjects.forEach((obj) => obj.update(delta));
    });

    return (
        <Container>
            {scene.gameObjects.map((obj, i) => (
                <GameObject key={i} model={obj} />
            ))}
        </Container>
    );
};
