import { TextStyle } from "pixi.js";

export const Window = {
    width: 650,
    height: 780,
    headerHeight: 60,
    scoreHeight: 60,
}

export const SymbolConfig = {
    width: 100,
    height: 110
}

export const BoardConfig = {
    reelCount: 5,
    rowCount: 5
}

export const textStyle = new TextStyle({
    fontFamily: "Arial",
    fontSize: 24,
    fontWeight: "bold",
    fill: ["#ffffff", "#ffcc00"], // gradient từ trắng sang vàng
    stroke: "#000000",
    strokeThickness: 3,
    dropShadow: true,
    dropShadowColor: "#000000",
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 3,
});
