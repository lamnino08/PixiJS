import { useTick, Container } from "@pixi/react";
import React from "react";
import { GameObjectModel } from "@/engine/core/models/gameobject/GameObjectModel";
import { GameObject } from "@/engine/core/gameobject/GameObject";
import { SceneModel } from "@/engine/core/models/scene/Scene";

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
