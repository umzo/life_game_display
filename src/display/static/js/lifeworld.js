var random = function(max) {
    return Math.floor(Math.random() * max) + 1 ;
};

export class LifeWorld {
    constructor(board, canvas) {
        this._canvas = canvas;
        this._board = board;

        this.timer = {};

        // 状態が変化した時の処理 Boardオブジェクトが呼び出す
        this._board.onChange = (index, cell) => {
            var loc = this._board.toLocation(index);
            var color = cell.IsAlive ? '#508030' : '#FFFFFF';
            this._canvas.drawPoint(loc.x, loc.y, color);
        };
    }

    //  開始
    start() {
        this.timer = setInterval(() => {
            var count = this._board.survive();
            if (count == 0)
                this.stop();
        }, 50);
    };

    // 停止
    stop() {
        clearInterval(this.timer);
    };

    // クリア
    clear() {
        this._canvas.clearAll();
        this._board.clearAll();
    };

    // ランダムに点を打つ
    random() {
        this.clear();
        var count = random(200) + 100;
        for (var i = 0; i < count; i++) {
            var x = random(this._board.width-1);
            var y = random(this._board.height-1);
            var ix = this._board.toIndex(x, y);
            this._board.reverse(ix);
        }
    };
}