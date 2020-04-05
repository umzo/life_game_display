export class MyCanvas {
    constructor(id, width, height) {
        this.cellsize = 4;
        this.canvas = document.getElementById(id);
        this.ctx = this.canvas.getContext('2d');
        if (width) {
            this.ctx.canvas.width = width * this.cellsize;
        }
        if (height) {
            this.ctx.canvas.height = height * this.cellsize;
        }
        this.width = this.ctx.canvas.width;
        this.height =  this.ctx.canvas.height;
        this.clearAll();

        this.onClick = function(x, y) {};
        this.onMouseDown = function(x, y) {};
        this.onMouseMove = function(x, y) {};
        this.onMouseUp = function(x, y) {};

        this.canvas.onclick = (e) => {
            var pt = this.getPoint(e)
            this.onClick(pt.x, pt.y);
        };

        this.canvas.onmousedown = (e) => {
            var pt = this.getPoint(e)
            this.onMouseDown(pt.x, pt.y, e.shiftKey);
        };

        this.canvas.onmousemove = (e) => {
            var pt = this.getPoint(e)
            this.onMouseMove(pt.x, pt.y, e.shiftKey);
        };

        this.canvas.onmouseup = (e) => {
            var pt = this.getPoint(e)
            this.onMouseUp(pt.x, pt.y, e.shiftKey);
        };
    }

    getPoint(e) {
        var rect = e.target.getBoundingClientRect();
        var x = e.clientX - Math.floor(rect.left);
        var y = e.clientY - Math.floor(rect.top);
        x = Math.floor(x / this.cellsize);
        y = Math.floor(y / this.cellsize);
        return { x: x, y: y };
    }
    // // 点を打つ
    drawPoint(x, y, color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x*this.cellsize+1, y*this.cellsize+1, this.cellsize-1, this.cellsize-1);
    }

    // // 縦罫線
    // drawVRuleLine(x) {
    //     this.ctx.strokeStyle = '#aaaaaa';
    //     this.ctx.lineWidth = 0.1;
    //     this.ctx.beginPath();
    //     this.ctx.moveTo(x+0.5, 0);
    //     this.ctx.lineTo(x+0.5, this.height);
    //     this.ctx.closePath();
    //     this.ctx.stroke();
    // }

    // // 横罫線
    // drawHRuleLine(y) {
    //     this.ctx.strokeStyle = '#aaa';
    //     this.ctx.lineWidth = 0.1;
    //     this.ctx.beginPath();
    //     this.ctx.moveTo(0, y+0.5);
    //     this.ctx.lineTo(this.width, y+0.5);
    //     this.ctx.closePath();
    //     this.ctx.stroke();
    // }

    // 指定場所の色を取得
    getColor(x, y) {
        var pixel  = this.ctx.getImageData(x*this.cellsize, y*this.cellsize, 1, 1);
        var data = pixel.data;
        return Canvas.toRgbaStr(data[0], data[1], data[2], data[3]);
    }

    // 指定位置をクリア
    clearPoint(x, y) {
        this.ctx.clearRect(x*this.cellsize, y*this.cellsize, this.cellsize, this.cellsize);
    }

    // すべてをクリア
    clearAll() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        // for (var x = 0; x < this.width; x += this.cellsize) {
        //     this.drawVRuleLine(x);
        // }
        // for (var y = 0; y < this.height; y += this.cellsize) {
        //     this.drawHRuleLine(y);
        // }
    }

    // ひとつのセルをその状態によって描画
    drawPiece(loc, piece) {
        var cell = piece;
        if (cell.IsAlive) {
            this.DrawLife(loc, '#666666');
        } else {
            this.clearPoint(loc.x, loc.y);
        }
    }

    // 四角形を生成する
    drawLife(loc, color) {
        this.drawPoint(loc.x, loc.y, color);
    }

    static  toRgbaStr(r, g, b, a){
        return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
    };
}