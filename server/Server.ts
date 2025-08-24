import { Event } from "@/lib/Event";

export interface Combine {
    symbol: string;
    positions: number[];
    score: number;
}

export interface SpinResponseData {
    matrix: string[];
    combine: string[];
}

export class Server {
    public response = new Event<SpinResponseData>()

    private readonly _symbols = ["1", "2", "3", "4", "5", "6", "7", "8"];
    private readonly _wildcardSymbol = "K";
    private readonly _matrixSize = 25;
    private readonly _boardWidth = 5;
    private readonly _ratioWildCard = 0.1;

    public requestSpinData(): void {
        const delay = 2000;
        window.setTimeout(() => {
            const matrix = this._generateRandomMatrix();
            const combine = this._findCombinations(matrix);

            const data : SpinResponseData = {
                matrix: matrix,
                combine: combine
            };

            this.response.invoke(data);
        }, 2000);
    }

    private _generateRandomMatrix = () : string[] => {
        // const matrix: string[] = [];
        // for (let i = 0; i < this._matrixSize; i++) {
        //     const isWildcard = Math.random() < this._ratioWildCard;
        //     const symbol = isWildcard ? this._wildcardSymbol : this._symbols[Math.floor(Math.random() * this._symbols.length)];
        //     matrix.push(symbol);
        // }
        // return matrix;
        return ["6","8","6","3","6","5","6","1","6","2","6","6","6","5","6","4","6","4","6","7","6","1","6","6","6"]
    }

    private _findCombinations(matrix: string[]): string[] {
        const combines: string[] = [];
        const visited = new Set<number>();

        for (let i = 0; i < this._matrixSize; i++) {
            if (!visited.has(i) && matrix[i] !== this._wildcardSymbol) {
                const targetSymbol = matrix[i];
                const cluster: number[] = [];
                const wildcardsInCluster: number[] = [];
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
                    const score = (cluster.length * 2.5).toFixed(2);
                    combines.push(`${targetSymbol};${cluster.join(",")};${score}`);
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
