class checkTicTacToe4x4 {
   constructor(board) {
    this.board = board;
   }

   checkWinner() {
    // check diagonals
    const diag1Values = Array.from(new Set([this.board[0][0], this.board[1][1], this.board[2][2], this.board[3][3]]));
    if (diag1Values.length === 1 && diag1Values[0] !== "-") {
      return diag1Values[0]; // return winner via first diagonal
    }

    const diag2Values = Array.from(new Set([this.board[0][3], this.board[1][2], this.board[2][1], this.board[3][0]]));
    if (diag2Values.length === 1 && diag2Values[0] !== "-") {
      return diag2Values[0]; // return winner via second diagonal
    }

    // check corners
    const cornerValues = Array.from(new Set([this.board[0][0], this.board[0][3], this.board[3][0], this.board[3][3]]));
    if (cornerValues.length === 1 && cornerValues[0] !== "-") {
      return cornerValues[0]; // return winner via 4 corners
    }

    const endIdx = this.board.length-1;
    
    // iterate through arrays once to check rows, columns, and 2x2 grid
    for (let i = 0; i <= endIdx; i++) {
      for (let j = 0; j <= endIdx; j++) {
        // if i is in first row, check current column for winner
        if (i === 0) {
          const colValues = Array.from(new Set([this.board[i][j], this.board[i+1][j], this.board[i+2][j], this.board[i+3][j]]));
          if (colValues.length === 1 && colValues[0] !== "-") {
            return colValues[0]; // return winner via vertical column
          }
        }

        // if j is in first column, check current row for winner
        if (j === 0) {
          const rowValues = Array.from(new Set(this.board[i]));
          if (rowValues.length === 1 && rowValues[0] !== "-") {
            return rowValues[0]; // return winner via horizontal row
          }
        }

        // check neighbors to the right and below the current index for current 2x2 grid
        if (i !== endIdx && j !== endIdx) {
          const gridValues = Array.from(new Set([this.board[i][j], this.board[i+1][j], this.board[i][j+1], this.board[i+1][j+1]]));
          if (gridValues.length === 1 && gridValues[0] !== "-") {
            return gridValues[0]; // return winner via current 2x2 grid
          }
        }
      }
    }

     return "no winner";
   }

   // I interpreted this as asking whether the board is full or not
   anyMovesLeft() {
    const anyEmptySpaces = this.board.reduce((acc, row) => [...acc, ...row], []).some(el => el === "-");
    
    return anyEmptySpaces;
   }

   // if the game has been won or if there are no more empty spaces, then the game is over
   isGameOver() {
    const winnerExists = this.checkWinner() !== "no winner";
    const isBoardFull = !this.anyMovesLeft();

    return winnerExists || isBoardFull;
   }

   // added this just to help with testing
   runAll() {
    console.log("winner: ", this.checkWinner());
    console.log("moves left? ", this.anyMovesLeft());
    console.log("is game over? ", this.isGameOver());
   }
}


// TEST CASES

// x wins via diagonal
const board1 = [
  ["o", "-", "-", "x"],
  ["o", "o", "x", "-"],
  ["-", "x", "x", "o"],
  ["x", "o", "-", "o"]
]

console.log("1) x wins via diagonal");
const evalBoard1 = new checkTicTacToe4x4(board1);
evalBoard1.runAll(); // expect: "x", true, true


// o wins via 2x2 square
const board2 = [
  ["x", "-", "-", "-"],
  ["o", "x", "x", "x"],
  ["-", "o", "o", "x"],
  ["o", "o", "o", "x"]
]

console.log("2) o wins via 2x2 square");
const evalBoard2 = new checkTicTacToe4x4(board2);
evalBoard2.runAll(); // expect: "o", true, true


// no winner, game still in progress
const board3 = [
  ["x", "-", "-", "o"],
  ["o", "x", "x", "x"],
  ["-", "x", "o", "o"],
  ["o", "x", "-", "o"]
]

console.log("3) no winner, game still in progress")
const evalBoard3 = new checkTicTacToe4x4(board3);
evalBoard3.runAll(); // expect: "-", true, false


// o wins via 4 corners
const board4 = [
  ["o", "-", "x", "o"],
  ["o", "x", "x", "x"],
  ["-", "x", "o", "o"],
  ["o", "x", "x", "o"]
]

console.log("4) o wins via 4 corners")
const evalBoard4 = new checkTicTacToe4x4(board4);
evalBoard4.runAll(); // expect: "o", true, true


// x wins via row 2
const board5 = [
  ["-", "-", "-", "-"],
  ["o", "-", "o", "x"],
  ["x", "x", "x", "x"],
  ["o", "x", "o", "o"]
]

console.log("5) x wins via row 2")
const evalBoard5 = new checkTicTacToe4x4(board5);
evalBoard5.runAll(); // expect: "x", true, true


// o wins via column 3, full board
const board6 = [
  ["x", "o", "x", "o"],
  ["o", "x", "x", "o"],
  ["x", "o", "x", "o"],
  ["x", "x", "o", "o"]
]

console.log("6) o wins via column 3, full board")
const evalBoard6 = new checkTicTacToe4x4(board6);
evalBoard6.runAll(); // expect: "o", false, true


// full board, no winner
const board7 = [
  ["x", "o", "x", "o"],
  ["o", "x", "x", "o"],
  ["o", "x", "o", "o"],
  ["x", "x", "o", "x"]
]

console.log("7) full board, no winner")
const evalBoard7 = new checkTicTacToe4x4(board7);
evalBoard7.runAll(); // expect: "-", false, true
