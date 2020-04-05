export class Cell {
    constructor() {
        this.IsAlive  = false;
        this._nextStatus = false;
    }


    // 生死を反転する
    toggle() {
        this.IsAlive = !this.IsAlive;
    };

    // trueならば生、falseならば死
    judge(count) {
        if (this.IsAlive)
            return (count === 2 || count === 3);
        else
            return (count === 3);
    };

    // 次の世代の状態を決める。変化があるとtrueが返る。
    survive(around) {
        this._nextStatus = this.judge(around);
        return this._nextStatus !== this.IsAlive;
    };

    // 次の状態にする
    nextStage() {
        var old = this.IsAlive;
        this.IsAlive = this._nextStatus;
        return this.IsAlive !== old;
    };
}