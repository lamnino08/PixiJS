// Sửa đổi file của bạn
import { ComponentModel } from "@/engine/core/models/gameobject/ComponentModel";
import { ReelComponent } from "./ReelComponent";
import { BoardConfig } from "@/workspace/config/GameConfig";
import { symbolPool, SymbolType } from "@/workspace/scripts/symbol/Symbol";
import { Event } from "@/lib/Event";
import { Server, SpinResponseData } from "@/server/Server";

export class BoardManager extends ComponentModel {
    reels: ReelComponent[] = [];

    onDoneSpin = new Event();

    private stoppedReelCount = 0;
    private server: Server;

    start(): void {
        this.reels.forEach(reel => {
            reel.onStopComplete.subscribe(this.handleReelStop);
            const symbols: SymbolType[] = Array.from(
                { length: BoardConfig.rowCount },
                () => symbolPool[Math.floor(Math.random() * symbolPool.length)]
            );
            reel.spawnSymbols(symbols);
        });

        this.server = new Server();
        this.server.response.subscribe(this.handleRespone);
    }

    private handleRespone = (data: SpinResponseData) => {
        this.reels.forEach((reel, reelIndex) => {
            const symbolsForReel: SymbolType[] = [];

            for (let i = 0; i < BoardConfig.rowCount; i++) {
                const matrixIndex = i * BoardConfig.reelCount + reelIndex;
                symbolsForReel.push(data.matrix[matrixIndex] as SymbolType);
            }

            reel.setDatdSymbols(symbolsForReel);
        });

        this.stopSpin();
    }

    startSpin = () => {
        this.reels.forEach((reel, index) => {
            setTimeout(() => {
                reel.startSpin();
            }, index * 300);
        });

        this.server.requestSpinData();
    }

    stopSpin = () => {
        this.reels.forEach((reel, index) => {
            setTimeout(() => {
                reel.stopSpin();
            }, index * 300);
        });
    }

    private handleReelStop = () => {
        this.stoppedReelCount++;
        if (this.stoppedReelCount === this.reels.length) {
            this.onDoneSpin.invoke();
            this.stoppedReelCount = 0;
        }
    }
}
