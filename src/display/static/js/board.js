import { Cell } from './cell.js';

// Cellを管理する
export class Board {
    // コンストラクタ
    constructor(w, h) {
        this.width = w;
        this.height = h;
        this.map = new Array((this.width) * (this.height));
        this.clearAll();
        this.onChange = {};
    }


    // Location から _coinのIndexを求める
    toIndex(x, y) {
        return x + y * (this.width);
    };

    // IndexからLocationを求める
    toLocation(index) {
        return { x: index % (this.width),  y: Math.floor(index / (this.width)) };
    };

    // 盤上のすべての位置(index)を列挙する
    getAllIndexes() {
        var list = [];
        for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
                list.push(this.toIndex(x, y));
            }
        }
        return list;
    };

    // 全てのPieceをクリアする
    clearAll() {
        this.getAllIndexes().forEach(ix => {
            this.map[ix] = new Cell();
        });
    };

    // 反転する
    reverse(index) {
        var cell = this.map[index];
        cell.toggle();
        this.onChange(index, cell);
    };

    // 生成する
    set(index) {
        var cell = this.map[index];
        cell.IsAlive = true;
        this.onChange(index, cell);
    };

    // 消滅させる
    clear(index) {
        var cell = this.map[index];
        cell.IsAlive = false;
        this.onChange(index, cell);
    };

    // 位置の補正 はみ出たらぐるっと回る
    corectIndex(x, y) {
        x = (x < 0) ? this.width - 1 : x;
        y = (y < 0) ? this.height - 1 : y;
        x = (x >= this.width) ? 0 : x;
        y = (y >= this.height) ? 0 : y;
        return this.toIndex(x,y);
        // { this.ToIndex(x % (this.width + 1), y % (this.height + 1));
    };

    // 周りの生存者の数を数える
    countAround(index) {
        var loc = this.toLocation(index);
        var arounds = [
            { x: loc.x-1, y: loc.y-1 },
            { x: loc.x-1, y: loc.y },
            { x: loc.x-1, y: loc.y+1 },
            { x: loc.x, y: loc.y-1 },
            { x: loc.x, y: loc.y+1 },
            { x: loc.x+1, y: loc.y-1 },
            { x: loc.x+1, y: loc.y },
            { x: loc.x+1, y: loc.y+1 },
        ];
        return arounds
            .map(loc => this.corectIndex(loc.x, loc.y))
            .filter(ix => this.map[ix].IsAlive)
            .length;
    };

    // 生死を決める
    survive() {
        var count = 0;
        this.getAllIndexes().forEach(ix => {
            var cell = this.map[ix];
            if (cell.survive(this.countAround(ix)))
                count++;
        });
        if (count > 0) {
            this.getAllIndexes().forEach(ix => {
                var cell = this.map[ix];
                if (cell.nextStage()) {
                    this.onChange(ix, cell);
                }
            });
        }
        return count;
    };
}