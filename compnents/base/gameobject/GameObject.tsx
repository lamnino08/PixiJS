import { useTick, Container } from "@pixi/react";
import { GameObjectModel } from "@/models/gameobject/GameObjectModel";
import React from "react";
import * as PIXI from "pixi.js";

interface GameObjectProps {
  model: GameObjectModel;
}

export const GameObject: React.FC<GameObjectProps> = ({ model }) => {
  const containerRef = React.useRef<PIXI.Container>(null);

  // Map tất cả các property từ model vào container
  const applyModelToContainer = (container: PIXI.Container, model: GameObjectModel) => {
    container.position.set(model.position.x, model.position.y);
    container.rotation = model.rotation;
    container.scale.set(model.scale);
    container.pivot.set(model.pivot.x, model.pivot.y);
    container.skew.set(model.skew.x, model.skew.y);
    container.alpha = model.alpha;
    container.visible = model.visible;
    container.interactive = model.interactive;
  };

  useTick((delta) => {
    model.update(delta);

    if (containerRef.current) {
      applyModelToContainer(containerRef.current, model);
    }
  });

  return (
    <Container ref={containerRef}>
      {Object.values(model.components).map((c, i) =>
        c.render ? <React.Fragment key={i}>{c.render()}</React.Fragment> : null
      )}

      {model.children.map((child, i) => (
        <GameObject key={i} model={child} />
      ))}
    </Container>
  );
};
