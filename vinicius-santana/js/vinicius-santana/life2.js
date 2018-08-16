var Board;
var nextBoard;
var xsize = 10;
var ysize = 10;
var dead = 0;
var alive = 1;

function Neighbors(boardSnap, x, y) {
  var n = 0;
  for (dx = -1; dx < 1; ++dx)
    for (dy = -1; dy < 1; ++dy) {
      var ax = x + dx;
      var ay = y + dy;
      if (ax >= 0 && ax < xsize && ay >= 0 && ay < ysize) {
        if (boardSnap[ax][ay] === alive) {
          ++n;
        }
      }
    }
  return n;
}

function Kill(boardSnap, x, y) {
  if (boardSnap[x][y] === alive) Board[x][y] = dead;
}

function MakeLive(boardSnap, x, y) {
  if (boardSnap[x][y] === dead) Board[x][y] = alive;
}

function NextStep(Board) {
  var boardSnap = [].concat(Board);
  for (var x = 0; x < xsize; x++) {
    for (var y = 0; y < ysize; y++) {
      var n = Neighbors(boardSnap, x, y);
      if (n === 3) {
        MakeLive(boardSnap, x, y);
      }
      if (n < 2 || n > 3) {
        Kill(boardSnap, x, y);
      }
    }
  }
}

function DrawBoard(Board) {
  var Text = "";
  for (var y = 0; y < ysize; ++y) {
    for (var x = 0; x < xsize; ++x) Text += Board[x][y] == alive ? "o" : "_";
    Text += "<br/>";
  }
  document.getElementById("board").innerHTML = Text;
}

function Main() {
  // *** Change this variable to choose a different baord setup from below
  var BoardSetup = "blinker";

  Board = new Array(xsize);
  for (var x = 0; x < xsize; ++x) {
    Board[x] = new Array(ysize);
    for (var y = 0; y < ysize; ++y) Board[x][y] = 0;
  }

  if (BoardSetup == "blinker") {
    Board[1][0] = 1;
    Board[1][1] = 1;
    Board[1][2] = 1;
  } else if (BoardSetup == "glider") {
    Board[2][0] = 1;
    Board[2][1] = 1;
    Board[2][2] = 1;
    Board[1][2] = 1;
    Board[0][1] = 1;
  } else if (BoardSetup == "flower") {
    Board[4][6] = 1;
    Board[5][6] = 1;
    Board[6][6] = 1;
    Board[7][6] = 1;
    Board[8][6] = 1;
    Board[9][6] = 1;
    Board[10][6] = 1;
    Board[4][7] = 1;
    Board[6][7] = 1;
    Board[8][7] = 1;
    Board[10][7] = 1;
    Board[4][8] = 1;
    Board[5][8] = 1;
    Board[6][8] = 1;
    Board[7][8] = 1;
    Board[8][8] = 1;
    Board[9][8] = 1;
    Board[10][8] = 1;
  }

  DrawBoard(Board);
}
