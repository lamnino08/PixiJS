import { Assets, SCALE_MODES, Texture } from "pixi.js";

export class AssetManager {
  private static textures: Map<string, Texture> = new Map();

  private constructor() {} 

  static async loadAssets(assets: Record<string, string>) {
    const keys = Object.keys(assets);
    for (const key of keys) {
      const tex = await Assets.load<Texture>(assets[key]);
      tex.baseTexture.scaleMode = SCALE_MODES.NEAREST;
      this.textures.set(key, tex);
    }
  }

  static getTexture(name: string): Texture {
    const tex = this.textures.get(name);
    if (!tex) {
      throw new Error(`Texture "${name}" chưa được load!`);
    }
    return tex;
  }
}
