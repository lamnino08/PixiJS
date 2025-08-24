// Sửa đổi file của bạn
import { ComponentModel } from "@/engine/core/models/gameobject/ComponentModel";
import { ReelComponent } from "./ReelComponent";
import { BoardConfig, Window } from "@/workspace/config/GameConfig";
import { symbolPool, SymbolType } from "@/workspace/scripts/symbol/Symbol";
import { Event } from "@/lib/Event";
import { Server, SpinResponseData } from "@/server/Server";
import { ButtonComponentModel } from "@/engine/core/component/ButtonComponent";
import { HoverFeedbackComponent } from "../component/HoverFeedback";
import { TextComponentModel } from "@/engine/core/models/gameobject/TextComponentModel";

export class BoardManager extends ComponentModel {
    reels: ReelComponent[] = [];

    startSpinButton: ButtonComponentModel;
    scoreText: TextComponentModel;

    onDoneSpin = new Event();
    onWinPoint = new Event<Number>();

    private stoppedReelCount = 0;
    private server: Server;
    private _isSpinning = false;
    private _score = 0;

    start(): void {
        this.reels.forEach(reel => {
            reel.onStopComplete.subscribe(this.handleReelStop);
            const symbols: SymbolType[] = Array.from(
                { length: BoardConfig.rowCount },
                () => symbolPool[Math.floor(Math.random() * symbolPool.length)]
            );
            reel.spawnSymbols(symbols);
            this.onDoneSpin.subscribe(reel.bounceSymbol);
        });

        this.server = new Server();
        this.server.response.subscribe(this.handleRespone);

        this.startSpinButton.onClick.subscribe(this.startSpin);
        this.onWinPoint.subscribe((sore: number) => {
            this._score += sore;
            this.scoreText.text = `Score: ${this._score}`
        })
        this.scoreText.text = `Score: ${this._score}`
    }

    private handleRespone = (data: SpinResponseData) => {
        this.reels.forEach((reel, reelIndex) => {
            const symbolsForReel: SymbolType[] = [];

            for (let i = 0; i < BoardConfig.rowCount; i++) {
                const matrixIndex = reelIndex * BoardConfig.reelCount + i;
                symbolsForReel.push(data.matrix[matrixIndex] as SymbolType);
            }

            let indexs: number[] = []
            data.combines.forEach(combine => {
                combine.positions.forEach(pos => {
                    if (Math.floor(pos / BoardConfig.rowCount) === reelIndex) {
                        indexs.push(pos % BoardConfig.rowCount);
                    }
                })

            });
            reel.setServerData(symbolsForReel, indexs);
        });
        data.combines.forEach(combine => {
            this.onWinPoint.invoke(combine.score);
        })
        this.stopSpin();
    }

    startSpin = () => {
        if (this._isSpinning) return;

        //button
        this.startSpinButton.getComponent(HoverFeedbackComponent)?.enable(false);
        this.startSpinButton.setDisabled(true);

        //spin
        this._isSpinning = true;
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
            this.startSpinButton.getComponent(HoverFeedbackComponent)?.enable(true);
            this.startSpinButton.setDisabled(false);
            this.stoppedReelCount = 0;
            this._isSpinning = false;
            this.onDoneSpin.invoke();
        }
    }
}
