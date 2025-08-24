"use client";

import { useEffect, useState } from "react";
import { Stage } from "@pixi/react";
import { SceneView } from "@/engine/core/scene/Scene";
import { loadAssets } from "@/workspace/manager/assetLoader";
import { scene } from "@/workspace/scene/GameScene";
import { Window } from "@/workspace/config/GameConfig";

export default function PixiApp() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function load() {
      await loadAssets();
      setLoaded(true);
    }
    load();
  }, []);



  if (!loaded) {
    return <div style={{ color: "white" }}>Loading assets...</div>;
  }

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#100000",
      }}
    >
      <Stage width={Window.width} height={Window.height} options={{ backgroundColor: 0x100030 }}>
        <SceneView scene={scene} />
      </Stage>
    </div>
  );
}
