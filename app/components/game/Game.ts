import { CellStatus, Diffculty, GameStatus } from "./definitions";

type Board = number[][];
export enum GameVerifyStatus {
  Win = 1,
  Loss = 0,
  Error = -1,
}
export class Game {
  diffculty?: Diffculty;
  status: GameStatus;
  board: Board;
  creator?: string;
  gameId?: string;
  boardWidth = 4;
  boardHeight = 6;
  constructor() {
    this.status = GameStatus.Ready;
    this.board = [];
    this.initialGame();
  }

  initialGame() {
    for (let i = 0; i < this.boardHeight; i++) {
      this.board[i] = new Array(this.boardWidth);
      for (let j = 0; j < this.boardWidth; j++) {
        this.board[i][j] = CellStatus.ToVerify;
      }
    }
  }
  verify(index: number, result: boolean) {
    const x = Math.floor(index / this.boardWidth);
    const y = index % this.boardWidth;
    const clickedCell = this.board?.[x]?.[y];
    if (clickedCell == undefined) GameVerifyStatus.Error;
    if (clickedCell !== CellStatus.ToVerify) {
      return GameVerifyStatus.Error;
    }
    if (result) {
      this.board[x][y] = CellStatus.Good;
      this.gameOver();
      return GameVerifyStatus.Win;
    } else {
      // game over
      this.board[x][y] = CellStatus.Bad;
      this.gameOver();
      return GameVerifyStatus.Loss;
    }
  }

  gameOver() {
    this.status = GameStatus.Done;
  }
  gameWin() {
    this.status = GameStatus.Done;
  }

  reset() {
    this.status = GameStatus.Ready;
    this.board = [];
    this.initialGame();
  }
}
