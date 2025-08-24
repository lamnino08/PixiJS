import { ComponentModel } from "@/engine/core/models/gameobject/ComponentModel";
import { BoardConfig, SymbolConfig } from "@/workspace/config/GameConfig";
import { SymbolType, symbol } from "@/workspace/scripts/symbol/Symbol";
import { Point } from "pixi.js";
import { Symbol } from "@/workspace/scripts/symbol/Symbol";
import "@/lib/tween/GameObjectTween";
import { Easing } from "@/lib/tween/Easing";
import { Event } from "@/lib/Event";
import { reverse } from "dns";


export class ReelComponent extends ComponentModel {
    private symbols: Symbol[] = [];
    private spinning = false;
    private isStopping = false;
    private speed = 0;
    private readonly MAX_SPEED = 10;
    private readonly ACCELERATION = 0.03;
    private DECELERATION = 0.003;

    public onStopComplete = new Event();

    private _combineIndexs: number[] = [];

    spawnSymbols(symbols: SymbolType[]) {
        const reelSymbols = [...symbols, ...symbols];
        this.symbols = reelSymbols.map((sym, i) => {
            const symObj = symbol(sym);

            const index = i < BoardConfig.rowCount ? (i - 1.5) : ((i - 1.5) - (BoardConfig.rowCount) * 2)
            symObj.gameObject.position = new Point(
                SymbolConfig.width / 2,
                index * SymbolConfig.height
            );

            this.gameObject.addChild(symObj.gameObject);
            return symObj;
        });
    }

    setServerData(symbols: SymbolType[], combineIndexs: number[]) {
        for (let i = 0; i < BoardConfig.rowCount; i++) {
            this.symbols[i].setNewSybolType(symbols[i]);
        }

        for (let i = 0; i < BoardConfig.rowCount; i++) {
            this.symbols[i + BoardConfig.rowCount].setNewSybolType(symbols[i]);
        }

        this._combineIndexs = combineIndexs;
    }

    startSpin() {
        this.spinning = true;
        this.isStopping = false;
        this.speed = 0;

        this.symbols.forEach((s) => {
            s.toBlur();
        });

        this.symbols.forEach((s, i) => {
            s.gameObject.scale = 1;
            const index = i < BoardConfig.rowCount ? (i - 1.5) : ((i - 1.5) - (BoardConfig.rowCount) * 2)
            s.gameObject.position = new Point(
                SymbolConfig.width / 2,
                index * SymbolConfig.height
            );
        })
    }

    stopSpin() {
        const finalY = (0 - 1.5) * SymbolConfig.height;
        const currentY = this.symbols[0].gameObject.position.y;

        const reelHeight = this.symbols.length * SymbolConfig.height;

        let distanceToStop = (finalY - currentY) % reelHeight;
        if (distanceToStop < 0) {
            distanceToStop += reelHeight;
        }

        const extraLaps = 2;
        distanceToStop += extraLaps * reelHeight;
        this.DECELERATION = (this.speed * this.speed) / (2 * distanceToStop);

        this.isStopping = true;
        this.symbols.forEach((s) => {
            s.toUnBlur();
        });
    }

    update(delta: number) {
        if (this.isStopping) {
            this.speed = Math.max(0, this.speed - this.DECELERATION * delta);

            if (this.speed === 0) {
                this.isStopping = false;
                this.spinning = false;
                this.alignSymbols();
                this.onStopComplete.invoke();
                return;
            }
        } else if (this.spinning) {
            this.speed = Math.min(this.speed + this.ACCELERATION * delta, this.MAX_SPEED);
        } else {
            return;
        }

        for (const symObj of this.symbols) {
            symObj.gameObject.position.y += this.speed * delta;

            if (symObj.gameObject.position.y >= (this.symbols.length / 2) * SymbolConfig.height) {
                symObj.gameObject.position.y -= this.symbols.length * SymbolConfig.height;
            }
        }
    }

    bounceSymbol = () => {
        setTimeout(() => {
            this._combineIndexs.forEach((index) => {
                this.symbols[index].scaleUpThenShrink(500);
            });
            setTimeout(() => {
                this.fallSymbols();
                this._combineIndexs = [];
            }, 500)
        }, 500);
    }

    // Sửa đổi phương thức chính để gọi các hàm nhỏ hơn
    private fallSymbols() {
        if (this._combineIndexs.length === 0) return;

        const symbolsToFall = this.getSymbolsToFall();
        this.animateSymbolFall(symbolsToFall);

        const reorderedSymbols = this.reorderSymbols(symbolsToFall);
        this.symbols = reorderedSymbols;
    }

    // Hàm mới để lấy danh sách các symbol cần rơi
    private getSymbolsToFall(): Symbol[] {
        const maxIndex = Math.max(...this._combineIndexs);
        return this.symbols.filter((s, i) => {
            const isNotWinning = !this._combineIndexs.includes(i);
            const isAboveWinningLine = i < maxIndex;
            const isFromTopPart = i >= BoardConfig.rowCount;
            return isNotWinning && (isAboveWinningLine || isFromTopPart);
        });
    }

    // Hàm mới để xử lý animation rơi
    private animateSymbolFall(symbolsToFall: Symbol[]): void {
        const step = this._combineIndexs.length;
        symbolsToFall.forEach((s) => {
            const i = this.symbols.indexOf(s);
            const stepFall = i > BoardConfig.rowCount ? step : step - this._combineIndexs.filter(cInx => i > cInx).length;
            s.gameObject.doMoveY?.(s.gameObject.position.y + SymbolConfig.height * stepFall, 500, undefined, Easing.easeInCubic);
        });
    }

    // Hàm mới để sắp xếp lại mảng symbols
    private reorderSymbols(symbolsToFall: Symbol[]): Symbol[] {
        const step = this._combineIndexs.length;
        const maxIndex = Math.max(...this._combineIndexs);

        const winningSymbols = this.symbols.filter((s, i) => this._combineIndexs.includes(i));
        const nonWinningSymbols = this.symbols.filter((s, i) => !this._combineIndexs.includes(i) && i < BoardConfig.rowCount && i > maxIndex);

        const firstSymbols = symbolsToFall.slice().reverse().slice(0, step);
        const last = symbolsToFall.slice()
            .reverse()
            .filter((s, i) => i >= step && this.symbols.indexOf(s) >= BoardConfig.rowCount);
        const next = symbolsToFall.filter(s => this.symbols.indexOf(s) < BoardConfig.rowCount);

        return [...firstSymbols.reverse(), ...next, ...nonWinningSymbols, ...winningSymbols, ...last.reverse()];
    }

    private alignSymbols() {
        const reelHeight = this.symbols.length * SymbolConfig.height;

        this.symbols.forEach((s, i) => {
            const index = i < BoardConfig.rowCount ? (i - 1.5) : ((i - 1.5) - (BoardConfig.rowCount) * 2)
            const finalY = index * SymbolConfig.height
            const currentY = s.gameObject.position.y;
            const numLaps = Math.round(currentY / reelHeight);
            const targetY = numLaps * reelHeight + finalY;

            if (i < BoardConfig.rowCount + 1) {
                s.gameObject.doMoveY?.(targetY, 800, undefined, Easing.easeOutCubic);
            } else {
                s.gameObject.position.y = targetY;
            }
            s.toUnBlur();
        });
    }
}
