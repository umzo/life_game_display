import { Board } from './board.js';
import { MyCanvas } from './canvas.js';
import { LifeWorld } from './lifeworld.js';

export class Program {
    constructor(width, height) {
        this.board = new Board(width, height);
        var canvas = new MyCanvas( 'mycanvas', width, height);
        this.world = new LifeWorld(this.board, canvas);

        this.dragState = 0;

        canvas.onMouseDown = (x, y,shiftKey) => {
            this.dragState = 1;
        };

        canvas.onMouseMove = (x, y,shiftKey) =>  {
            if (this.dragState >= 1) {
                if (shiftKey)
                    this.board.clear(this.board.toIndex(x, y));
                else
                    this.board.set(this.board.toIndex(x, y));
                this.dragState = 2;
            }
        };

        canvas.onMouseUp = (x, y,shiftKey) =>  {
            if (this.dragState === 1) {
                this.board.reverse(this.board.toIndex(x, y));
            }
            this.dragState = 0;
        };

    }

    run() {
        document.getElementById('startButton')
            .addEventListener('click', () => this.start(), false);
        document.getElementById('stopButton')
            .addEventListener('click', () => this.stop(), false);
        document.getElementById('clearButton')
            .addEventListener('click', () => this.clear(), false);
        document.getElementById('randomButton')
            .addEventListener('click', () => this.random(), false);
    };

    start() {
        this.world.start();
    };

    stop() {
        this.world.stop();
    };

    clear() {
        this.world.stop();
        this.world.clear();
    };

    random() {
        this.world.random();
    };

    initialize() {
        this.readCSV(this.spreadMap);
    };

    // readCSV(callback) {
    //     var req = new XMLHttpRequest(); // HTTPでファイルを読み込むためのXMLHttpRrequestオブジェクトを生成
    //     req.open("get", "./sample.csv", true); // アクセスするファイルを指定
    //     req.send(null); // HTTPリクエストの発行
        
    //     // レスポンスが返ってきたらconvertCSVtoArray()を呼ぶ	
    //     req.onload = function(){
    //         var bitmap = []; // 最終的な二次元配列を入れるための配列
    //         var tmp = req.responseText.split("\n"); // 改行を区切り文字として行を要素とした配列を生成
        
    //         // 各行ごとにカンマで区切った文字列を要素とした二次元配列を生成
    //         for(var i=0;i<tmp.length;++i){
    //             bitmap[i] = tmp[i].split(',');
    //         }
        
    //         callback(bitmap)
    //         // this.convertCSVtoArray(req.responseText); // 渡されるのは読み込んだCSVデータ
    //     }
    // };

    // spreadMap(bitmap){
    //     var board_width = 200;
    //     var board_height = 35;
    //     var program = new Program(board_width, board_height);
    //     program.run()
    //     // var bitmap = [
    //     //     [0, 0, 0, 0, 1, 0],
    //     //     [0, 0, 0, 0, 0, 1],
    //     //     [0, 0, 0, 1, 1, 1]];
    //     for (let i = 0; i < bitmap.length; i++) {
    //         var b_line = bitmap[i] 
    //         for (let j = 0; j < b_line.length; j++) {
    //             if ( b_line[j] == 1 ) {
    //                 this.board.set(this.board.toIndex(j + 1, i + 1))
    //             }
    //         }
    //     }
    // }

    // convertCSVtoArray(str) {
    //     var result = []; // 最終的な二次元配列を入れるための配列
    //     var tmp = str.split("\n"); // 改行を区切り文字として行を要素とした配列を生成
    
    //     // 各行ごとにカンマで区切った文字列を要素とした二次元配列を生成
    //     for(var i=0;i<tmp.length;++i){
    //         result[i] = tmp[i].split(',');
    //     }
    
    //     console.log(result)
    // }

    boardUpdate(i, j){
        this.board.set(this.board.toIndex(j + 1, i + 1))
    }
}

function readCSV(callback) {
    var req = new XMLHttpRequest(); // HTTPでファイルを読み込むためのXMLHttpRrequestオブジェクトを生成
    req.open("get", "./data/sample/sample.csv", true); // アクセスするファイルを指定
    req.send(null); // HTTPリクエストの発行
    
    // レスポンスが返ってきたらconvertCSVtoArray()を呼ぶ	
    req.onload = function(){
        var bitmap = []; // 最終的な二次元配列を入れるための配列
        var tmp = req.responseText.split("\n"); // 改行を区切り文字として行を要素とした配列を生成
    
        // 各行ごとにカンマで区切った文字列を要素とした二次元配列を生成
        for(var i=0;i<tmp.length;++i){
            bitmap[i] = tmp[i].split(',');
        }
    
        callback(bitmap)
        // this.convertCSVtoArray(req.responseText); // 渡されるのは読み込んだCSVデータ
    }
};

function spreadMap(bitmap){
    var program = new Program(1300, 1300);
    program.run()
    // var bitmap = [
    //     [0, 0, 0, 0, 1, 0],
    //     [0, 0, 0, 0, 0, 1],
    //     [0, 0, 0, 1, 1, 1]];
    for (let i = 0; i < bitmap.length; i++) {
        var b_line = bitmap[i] 
        for (let j = 0; j < b_line.length; j++) {
            if ( b_line[j] == 1 ) {
                program.boardUpdate(i, j)
            }
        }
    }
    var ready_time = 2000; // ms
    setTimeout(function() {program.start();}, ready_time)
}


function initialize() {
    readCSV(spreadMap);

}

export function main() {
    window.onload = function() {
        initialize();
        // var program = new Program(200, 35);
        // program.run();
        // program.spreadMap();
        // setTimeout(function() {program.start();}, 2000)

    };
}