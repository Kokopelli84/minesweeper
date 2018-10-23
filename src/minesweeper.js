class Game {
  constructor(numberOfRows, numberOfColumns, numberOfBombs){
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
  }
  playMove(rowIndex, columnIndex){
    this._board.flipTile(rowIndex, columnIndex)
    if (this._board.playerBoard[rowIndex][columnIndex] == 'B'){
      console.log("Aww the game over. Final board:")
      this._board.print();
    } else if (!this._board.hasSafeTiles()){
      console.log("Congratulations! You cleared the minefield!")
    } else {
      console.log('Current Board:')
      this._board.print();
    }
  }
}

class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs){
    this._numberOfRows = numberOfRows;
    this._numberOfColumns = numberOfColumns,
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }
  get playerBoard(){
    return this._playerBoard;
  }
  flipTile(rowIndex, columnIndex) {
    if (this._playerBoard[rowIndex][columnIndex] != ' '){
      console.log("This tile has already been flipped!");
    } else if (this._bombBoard[rowIndex][columnIndex] == 'B'){
      this._playerBoard[rowIndex][columnIndex] = 'B';
    } else {
      let numberOfBombs = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
      this._playerBoard[rowIndex][columnIndex] = numberOfBombs;
      this._numberOfTiles--;
    }
  }
  getNumberOfNeighborBombs(rowIndex, columnIndex) {
    const neighborOffsets = [
      [-1,-1],
      [-1,0],
      [-1,1],
      [0,-1],
      [0,1],
      [1,-1],
      [1,0],
      [1,1]
    ];
    const numberOfRows = this._bombBoard.length;
    const numberOfColumns = this._bombBoard[0].length;
    let numberOfBombs = 0;
    neighborOffsets.forEach( offset => {
      const neighborRowIndex = rowIndex + offset[0];
      const neighborColumnIndex = columnIndex + offset[1];
      if (neighborRowIndex >= 0 && neighborRowIndex <= numberOfRows &&
          neighborColumnIndex >= 0 && neighborColumnIndex <= numberOfColumns){
        if (this._bombBoard[neighborRowIndex][neighborColumnIndex] == 'B'){
          numberOfBombs++;
        }
      }
    })
    return numberOfBombs;
  }
  hasSafeTiles(){
    return this._numberOfTiles != this._numberOfBombs;
  }
  print(){
    console.log(
      this._playerBoard.map(row => row.join(' | ')).join('\n')
    );
  }
  static generatePlayerBoard(numberOfRows, numberOfColumns){
    const board = []
    for (let i = 0; i < numberOfRows;i++){
      const row = []
      for (let j = 0; j < numberOfColumns;j++){
        row.push(' ');
      }
      board.push(row);
    }
    return board;
  }
  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs){
    const board = []
    for (let i = 0; i < numberOfRows;i++){
      const row = []
      for (let j = 0; j < numberOfColumns;j++){
        row.push(null);
      }
      board.push(row);
    }

    let numberOfBombsPlaced = 0;
    while(numberOfBombsPlaced < numberOfBombs){
      // TODO: Add control flow so bomb is not placed in same location as another
      let randomRowIndex = Math.floor((Math.random() * numberOfRows));
      let randomColumnIndex = Math.floor((Math.random() * numberOfColumns));

      if (board[randomRowIndex][randomColumnIndex] != 'B'){
        board[randomRowIndex][randomColumnIndex] = 'B';
        numberOfBombsPlaced++;
      }
    }
    return board;
  }
}








/*

let playerBoard = generatePlayerBoard(3, 3);
let bombBoard = generateBombBoard(3, 3, 3);

console.log('Player Board:');
printBoard(playerBoard);
console.log('Bomb Board:')
printBoard(bombBoard);

flipTile(playerBoard, bombBoard, 0, 0);
console.log('Updated Player Board:')
printBoard(playerBoard);
*/
const game = new Game(3,3,3);
game.playMove(0,0);
