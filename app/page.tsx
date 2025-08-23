import dynamic from "next/dynamic";

const PixiApp = dynamic(() => import("@/game/PixiApp"), {
  ssr: false,
});

export default function IndexPage() {
  return (
    <div>
      <PixiApp />
    </div>
  );
}
