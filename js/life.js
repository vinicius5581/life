class Life {
  constructor() {
    this.Board;
    this.xsize = 3;
    this.ysize = 3;
    this.dead = 0;
    this.alive = 1;
    this.Neighbors = this.Neighbors.bind(this);
    this.Kill = this.Kill.bind(this);
    this.MakeLive = this.MakeLive.bind(this);
    this.NextStep = this.NextStep.bind(this);
  }

  Neighbors(Board, x, y) {
    var n = 0;
    for (var dx = -1; dx <= 1; ++dx) {
      for (var dy = -1; dy <= 1; ++dy) {
        var ax = x + dx;
        var ay = y + dy;
        if (ax >= 0 && ax < this.xsize && ay >= 0 && ay < this.ysize) {
          // console.log(`ax: ${ax} ay: ${ay} - alive: ${Board[ax][ay]}`);
          if (!(ax === x && ay === y)) {
            if (Board[ax][ay] === this.alive) {
              n++;
            }
          }
        }
      }
    }
    console.log(
      `== Neighbors x: ${x} y: ${y} Board: ${Board} this.Board: ${
        this.Board
      } - n: ${n} alive: ${Board[x][y]}`
    );
    return n;
  }

  Kill(Board, x, y) {
    if (Board[x][y] === this.alive) {
      Board[x][y] = this.dead;
    }
  }

  MakeLive(Board, x, y) {
    if (Board[x][y] === this.dead) {
      Board[x][y] = this.alive;
    }
  }

  NextStep() {
    console.log("::: Next Step");
    var boardSnapshot = this.Board.slice();
    console.log("boardSnapshot", boardSnapshot);
    for (var x = 0; x < this.xsize; x++) {
      for (var y = 0; y < this.ysize; y++) {
        var n = this.Neighbors(boardSnapshot, x, y);
        if (n === 3) {
          // console.log("makeLive");
          this.MakeLive(this.Board, x, y);
        }
        if (n < 2 || n > 3) {
          // console.log("kill");
          this.Kill(this.Board, x, y);
        }
      }
    }
    this.DrawBoard();
  }

  DrawBoard() {
    var Text = "";
    for (let y = 0; y < this.ysize; ++y) {
      for (let x = 0; x < this.xsize; ++x)
        Text += this.Board[x][y] == this.alive ? "o" : "_";
      Text += "<br/>";
    }
    document.getElementById("board").innerHTML = Text;
  }

  Main() {
    // *** Change this variable to choose a different baord setup from below
    var BoardSetup = "blinker";

    this.Board = new Array(this.xsize);
    for (var x = 0; x < this.xsize; ++x) {
      this.Board[x] = new Array(this.ysize);
      for (var y = 0; y < this.ysize; ++y) {
        this.Board[x][y] = 0;
      }
    }

    if (BoardSetup == "blinker") {
      this.Board[1][0] = 1;
      this.Board[1][1] = 1;
      this.Board[1][2] = 1;
    } else if (BoardSetup == "glider") {
      this.Board[2][0] = 1;
      this.Board[2][1] = 1;
      this.Board[2][2] = 1;
      this.Board[1][2] = 1;
      this.Board[0][1] = 1;
    } else if (BoardSetup == "flower") {
      this.Board[4][6] = 1;
      this.Board[5][6] = 1;
      this.Board[6][6] = 1;
      this.Board[7][6] = 1;
      this.Board[8][6] = 1;
      this.Board[9][6] = 1;
      this.Board[10][6] = 1;
      this.Board[4][7] = 1;
      this.Board[6][7] = 1;
      this.Board[8][7] = 1;
      this.Board[10][7] = 1;
      this.Board[4][8] = 1;
      this.Board[5][8] = 1;
      this.Board[6][8] = 1;
      this.Board[7][8] = 1;
      this.Board[8][8] = 1;
      this.Board[9][8] = 1;
      this.Board[10][8] = 1;
    }

    for (var col = 0; col < this.xsize; col++) {
      for (var row = 0; row < this.ysize; row++) {
        this.Neighbors(this.Board, col, row);
      }
    }

    this.DrawBoard(this.Board);
  }
}

const life = new Life();
