import { Event } from "@/lib/Event";

export interface Combine {
    symbol: string;
    positions: number[];
    score: number;
}

export interface SpinResponseData {
    matrix: string[];
    combines: Combine[];
}

const spinDataMockupDemo = [
    ["3", "3", "3", "3", "5", "1", "5", "2", "5", "5", "1", "8", "2", "2", "5", "8", "2", "2", "3", "2", "1", "3", "5", "8", "4"],
    ["5", "7", "6", "1", "5", "1", "2", "1", "1", "5", "4", "2", "5", "1", "8", "7", "2", "8", "3", "2", "1", "3", "5", "8", "4"],
    ["6", "5", "7", "6", "5", "3", "1", "1", "2", "5", "K", "4", "2", "5", "8", "7", "2", "8", "3", "2", "1", "3", "5", "8", "4"],
    ["6", "5", "7", "6", "5", "6", "2", "6", "K", "5", "5", "8", "K", "5", "8", "1", "8", "2", "7", "8", "2", "8", "8", "5", "8"],
    ["1", "K", "6", "5", "7", "K", "6", "1", "6", "2", "8", "6", "2", "5", "8", "4", "1", "2", "7", "8", "8", "K", "2", "5", "8"],
    ["8", "3", "1", "5", "7", "3", "2", "1", "6", "2", "5", "1", "8", "5", "8", "7", "4", "1", "7", "8", "2", "6", "8", "5", "8"],
    ["8", "3", "1", "5", "7", "3", "K", "1", "K", "2", "5", "1", "8", "5", "8", "7", "K", "1", "K", "8", "2", "6", "8", "5", "8"],
    ["1", "8", "8", "3", "7", "5", "2", "1", "3", "2", "2", "6", "4", "5", "8", "4", "3", "4", "5", "7", "3", "1", "2", "6", "8"],
    ["6", "8", "6", "3", "6", "5", "6", "1", "6", "2", "6", "6", "6", "5", "6", "4", "6", "4", "6", "7", "6", "1", "6", "6", "6"],
    ["6", "8", "6", "3", "6", "2", "5", "1", "6", "2", "8", "8", "4", "5", "6", "2", "6", "4", "4", "7", "7", "8", "4", "6", "1"],
    ["6", "8", "6", "3", "6", "2", "5", "1", "6", "2", "3", "8", "8", "5", "6", "8", "7", "2", "6", "7", "1", "7", "8", "6", "1"],
    ["6", "8", "6", "8", "6", "5", "5", "8", "6", "5", "8", "8", "8", "5", "6", "8", "7", "5", "6", "7", "8", "7", "8", "6", "8"],
    ["6", "8", "6", "8", "6", "5", "5", "5", "6", "5", "8", "8", "8", "5", "6", "8", "7", "5", "6", "7", "8", "7", "8", "6", "8"],
    ["6", "8", "6", "8", "6", "5", "5", "5", "6", "5", "5", "6", "7", "5", "6", "8", "7", "5", "6", "7", "8", "7", "8", "6", "8"],
    ["6", "8", "6", "8", "6", "5", "8", "5", "6", "5", "8", "6", "7", "5", "6", "8", "7", "5", "6", "7", "8", "7", "8", "6", "8"],
]

export class Server {
    public response = new Event<SpinResponseData>()

    private readonly _symbols = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    private readonly _wildcardSymbol = "K";
    private readonly _matrixSize = 25;
    private readonly _boardWidth = 5;
    private readonly _ratioWildCard = 0.1;
    private readonly _delay = 2000;

    public requestSpinData(): void {
        window.setTimeout(() => {
            const matrix = this._generateRandomMatrix();
            const combine = this._findCombinations(matrix);

            const data: SpinResponseData = {
                matrix: matrix,
                combines: combine
            };

            this.response.invoke(data);
        }, this._delay);
    }

    private _generateRandomMatrix = (): string[] => {
        // Random if you like
        // const matrix: string[] = [];
        // for (let i = 0; i < this._matrixSize; i++) {
        //     const isWildcard = Math.random() < this._ratioWildCard;
        //     const symbol = isWildcard ? this._wildcardSymbol : this._symbols[Math.floor(Math.random() * this._symbols.length)];
        //     matrix.push(symbol);
        // }
        // return matrix;
        return spinDataMockupDemo[this._randomRange(0, spinDataMockupDemo.length - 1, true)]
    }

    private _findCombinations(matrix: string[]): Combine[] {
        const combines: Combine[] = [];
        const visited = new Set<number>();

        for (let i = 0; i < this._matrixSize; i++) {
            if (!visited.has(i) && matrix[i] !== this._wildcardSymbol) {
                const targetSymbol = matrix[i];
                const cluster: number[] = [];
                const queue: number[] = [i];
                visited.add(i);

                let regularCandyCount = 0;
                let wildcardCount = 0;

                while (queue.length > 0) {
                    const currentPos = queue.shift()!;
                    const currentSymbol = matrix[currentPos];

                    if (currentSymbol === targetSymbol) {
                        regularCandyCount++;
                    } else if (currentSymbol === this._wildcardSymbol) {
                        wildcardCount++;
                    }

                    cluster.push(currentPos);

                    const row = Math.floor(currentPos / this._boardWidth);
                    const col = currentPos % this._boardWidth;

                    const neighbors = [
                        { r: row - 1, c: col },
                        { r: row + 1, c: col },
                        { r: row, c: col - 1 },
                        { r: row, c: col + 1 },
                    ];

                    for (const neighbor of neighbors) {
                        if (neighbor.r >= 0 && neighbor.r < this._boardWidth && neighbor.c >= 0 && neighbor.c < this._boardWidth) {
                            const neighborPos = neighbor.r * this._boardWidth + neighbor.c;
                            if (!visited.has(neighborPos)) {
                                const neighborSymbol = matrix[neighborPos];
                                if (neighborSymbol === targetSymbol || neighborSymbol === this._wildcardSymbol) {
                                    visited.add(neighborPos);
                                    queue.push(neighborPos);
                                }
                            }
                        }
                    }
                }

                if (regularCandyCount >= 4) {
                    const score = cluster.length * 2.5;
                    const combine: Combine = {
                        symbol: targetSymbol,
                        positions: cluster,
                        score: score
                    };
                    combines.push(combine);
                }
            }
        }
        return combines;
    }

    private _randomRange(min: number, max: number, int: boolean = false) {
        const delta = max - min;
        const rnd = Math.random();
        let result = min + rnd * delta;

        if (int) {
            result = Math.round(result);
        }

        return result;
    }
}
