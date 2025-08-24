import { useTick, Container } from "@pixi/react";
import { GameObjectModel } from "@/engine/core/models/gameobject/GameObjectModel";
import React from "react";
import * as PIXI from "pixi.js";
import { MaskComponentModel } from "../models/gameobject/MaskComponentModel";

interface GameObjectProps {
  model: GameObjectModel;
}

export const GameObject: React.FC<GameObjectProps> = ({ model }) => {
  const containerRef = React.useRef<PIXI.Container>(null);
  const [children, setChildren] = React.useState<GameObjectModel[]>(model.children);
  const [_, forceUpdate] = React.useReducer((x) => x + 1, 0);

  const maskComponent = model.getComponent(MaskComponentModel);

  React.useEffect(() => {
    const sub = model.onChildrenChanged.subscribe((newChildren) => {
      setChildren([...newChildren]);
    });
    const sub1 = Object.values(model.components).map(c => c.onReRender.subscribe(() => {
      console.log("rerender")
      forceUpdate();
    }));
    return () => { 
      sub.unsubscribe();
    }
  }, [model]);

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
      if (maskComponent?.maskGraphics) {
        containerRef.current.mask = maskComponent.maskGraphics;
      } else {
        containerRef.current.mask = null;
      }
    }
  });

  return (
    <Container ref={containerRef}>
      {Object.values(model.components).map((c, i) =>
        c.render ? <React.Fragment key={i}>{c.render()}</React.Fragment> : null
      )}

      {children.map((child, i) => (
        <GameObject key={i} model={child} />
      ))}
    </Container>
  );
};

