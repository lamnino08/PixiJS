// Sửa đổi file của bạn
import { ComponentModel } from "@/engine/core/models/gameobject/ComponentModel";
import { ReelComponent } from "./ReelComponent";
import { BoardConfig } from "@/workspace/config/GameConfig";
import { symbolPool, SymbolType } from "@/workspace/scripts/symbol/Symbol";

export class BoardManager extends ComponentModel {
    reels: ReelComponent[] = [];

    start(): void {
        this.reels.forEach(reel => {
            const symbols: SymbolType[] = Array.from(
                { length: BoardConfig.rowCount },
                () => symbolPool[Math.floor(Math.random() * symbolPool.length)]
            );
            reel.spawnSymbols(symbols);
        });
    }

    startSpin = () => {
        this.reels.forEach((reel, index) => {
            setTimeout(() => {
                reel.startSpin();
            }, index * 300);
        });
        
        setTimeout(() => {
            this.stopSpin();
        }, 3000);
    }

    stopSpin = () => {
        this.reels.forEach((reel, index) => {
            setTimeout(() => {
                reel.stopSpin();
            }, index * 300);
        });
    }
}
