import { ComponentModel } from "@/engine/core/models/gameobject/ComponentModel";
import { BoardConfig, SymbolConfig } from "@/workspace/config/GameConfig";
import { SymbolType, symbol } from "@/workspace/scripts/symbol/Symbol";
import { Point } from "pixi.js";
import { Symbol } from "@/workspace/scripts/symbol/Symbol";
import "@/lib/tween/GameObjectTween";
import { Easing } from "@/lib/tween/Easing";
import { Event } from "@/lib/Event";


export class ReelComponent extends ComponentModel {
    private symbols: Symbol[] = [];
    private spinning = false;
    private isStopping = false;
    private speed = 0;
    private readonly MAX_SPEED = 10;
    private readonly ACCELERATION = 0.03;
    private DECELERATION = 0.003;

    public onStopComplete = new Event();

    spawnSymbols(symbols: SymbolType[]) {
        const reelSymbols = [...symbols, ...symbols];
        this.symbols = reelSymbols.map((sym, i) => {
            const symObj = symbol(sym);

            symObj.gameObject.position = new Point(
                SymbolConfig.width / 2,
                (i - 1.5) * SymbolConfig.height
            );

            this.gameObject.addChild(symObj.gameObject);
            return symObj;
        });
    }

    setDatdSymbols(symbols: SymbolType[]) {
        console.log(symbols);
        for (let i = 0; i < BoardConfig.rowCount; i++) {
            this.symbols[i].setNewSybolType(symbols[i]);
        }

        for (let i = 0; i < BoardConfig.rowCount; i++) {
            this.symbols[i + BoardConfig.rowCount].setNewSybolType(symbols[i]);
        }
    }
    

    startSpin() {
        this.spinning = true;
        this.isStopping = false;
        this.speed = 0;

        this.symbols.forEach((s) => {
            s.toBlur();
        });
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

    private alignSymbols() {
        const reelHeight = this.symbols.length * SymbolConfig.height;

        this.symbols.forEach((s, i) => {
            const finalY = (i - 1.5) * SymbolConfig.height;
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