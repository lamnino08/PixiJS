import { AssetManager } from "@/engine/core/loader/AssetLoader";

export const loadAssets = async () => {
    await AssetManager.loadAssets({
        logo: "assets/sprites/logo.png",

        symbol_0: "assets/sprites/symbol_0.png",
        symbol_0_blur: "assets/sprites/symbol_0_blur.png",

        symbol_1: "assets/sprites/symbol_1.png",
        symbol_1_blur: "assets/sprites/symbol_1_blur.png",

        symbol_2: "assets/sprites/symbol_2.png",
        symbol_2_blur: "assets/sprites/symbol_2_blur.png",

        symbol_3: "assets/sprites/symbol_3.png",
        symbol_3_blur: "assets/sprites/symbol_3_blur.png",

        symbol_4: "assets/sprites/symbol_4.png",
        symbol_4_blur: "assets/sprites/symbol_4_blur.png",

        symbol_5: "assets/sprites/symbol_5.png",
        symbol_5_blur: "assets/sprites/symbol_5_blur.png",

        symbol_6: "assets/sprites/symbol_6.png",
        symbol_6_blur: "assets/sprites/symbol_6_blur.png",

        symbol_7: "assets/sprites/symbol_7.png",
        symbol_7_blur: "assets/sprites/symbol_7_blur.png",

        symbol_8: "assets/sprites/symbol_8.png",
        symbol_8_blur: "assets/sprites/symbol_8_blur.png",

        symbol_9: "assets/sprites/symbol_9.png",
        symbol_9_blur: "assets/sprites/symbol_9_blur.png",

        symbol_K: "assets/sprites/symbol_K.png",
        symbol_K_blur: "assets/sprites/symbol_K_blur.png",
    });
}