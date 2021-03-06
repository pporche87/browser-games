import React, { Component } from "react";
import "./App.css";

import Announcement from "./Announcement";
import ResetButton from "./ResetButton";
import Tile from "./Tile";

class App extends Component {
  constructor(){
    super();
    this.state = {
      gameBoard: [
        "", "", "",
        "", "", "",
        "", "", ""
      ],
      turn: "x",
      winner: null,
      maxPlayer: "x",
      minPlayer: "o"
    }
  }
  resetBoard(){
    this.setState({
      gameBoard: [
        "", "", "",
        "", "", "",
        "", "", ""
      ],
      turn: "x",
      winner: null,
      maxPlayer: "x",
      minPlayer: "o"
    });
  }
  tie(board){
    var moves = board.join("").replace(/ /g, "");
    if(moves.length === 9){
      return true;
    }
    return false;
  }
  winner(board, player){
    if(
      // figure out how to do the winner function with a loop
      (board[0] === player && board[1] === player && board[2] === player) ||
      (board[3] === player && board[4] === player && board[5] === player) ||
      (board[6] === player && board[7] === player && board[8] === player) ||
      (board[0] === player && board[3] === player && board[6] === player) ||
      (board[1] === player && board[4] === player && board[7] === player) ||
      (board[2] === player && board[5] === player && board[8] === player) ||
      (board[0] === player && board[4] === player && board[8] === player) ||
      (board[2] === player && board[4] === player && board[6] === player)
    ){
      return true;
    } else {
      return null;
    }
  }
  copyBoard(board){
    return board.slice(0);
  }
  validMove(move, player, board){
    let newBoard = this.copyBoard(board);
    if(newBoard[move] === ""){
      newBoard[move] = player;
      return newBoard;
    } else {
      return null;
    }
  }
  findAiMove(board){
    var bestMoveScore = 100;
    let move = null;
    if(this.winner(board, "x") || this.winner(board, "o") || this.tie(board)){
      return null;
    }
    for(let i = 0; i < board.length; i++){
      let newBoard = this.validMove(i, this.state.minPlayer, board);
      if(newBoard){
        var moveScore = this.maxScore(newBoard);
        if(moveScore < bestMoveScore){
          bestMoveScore = moveScore;
          move = i;
        }
      }
    }
    return move;
  }
  // minMaxScore function ? argument for passing in which player is playing
  minScore(board){
    if(this.winner(board, "x")){
      return 10;
    } else if(this.winner(board, "o")){
      return -10;
    } else if(this.tie(board)){
      return 0;
    } else {
      var bestMoveValue = 100;
    } for(let i = 0; i < board.length; i++){
      var newBoard = this.validMove(i, this.state.minPlayer, board);
      if(newBoard){
        var predictedMoveValue = this.maxScore(newBoard);
        if(predictedMoveValue < bestMoveValue){
          bestMoveValue = predictedMoveValue;
        }
      }
    }
    return bestMoveValue;
  }
  maxScore(board){
    if(this.winner(board, "x")){
      return 10;
    } else if(this.winner(board, "o")){
      return -10;
    } else if(this.tie(board)){
      return 0;
    } else {
      var bestMoveValue = -100;
    } for(let i = 0; i < board.length; i++){
      var newBoard = this.validMove(i, this.state.maxPlayer, board);
      if(newBoard){
        var predictedMoveValue = this.minScore(newBoard);
        if(predictedMoveValue > bestMoveValue){
          bestMoveValue = predictedMoveValue;
        }
      }
    }
    return bestMoveValue;
  }
  gameLoop(moves){
    let player = this.state.turn;
    let currentGameBoard = this.validMove(moves, player, this.state.gameBoard);
    if(this.winner(currentGameBoard, player)){
      this.setState({
        gameBoard: currentGameBoard,
        winner: player
      });
      return;
    }
    if(this.tie(currentGameBoard)){
      this.setState({
        gameBoard: currentGameBoard,
        winner: "draw"
      });
      return;
    }
    // roll into one function and call that function
    player = "o";
    currentGameBoard = this.validMove(this.findAiMove(currentGameBoard), player, currentGameBoard);
    if(this.winner(currentGameBoard, player)){
      this.setState({
        gameBoard: currentGameBoard,
        winner: player
      });
      return;
    }
    if(this.tie(currentGameBoard)){
      this.setState({
        gameBoard: currentGameBoard,
        winner: "draw"
      });
      return;
    }
    this.setState({
      gameBoard: currentGameBoard
    });
  }
  render() {
    return (
      <div className="container">
        <div className="menu">
          <h1>Tic-Tac-Toe</h1>
          <Announcement winner={this.state.winner} />
          <ResetButton reset={this.resetBoard.bind(this)} />
        </div>
        {this.state.gameBoard.map(function(value, i){
          return (
            <Tile
              key={i}
              loc={i}
              value={value}
              gameLoop={this.gameLoop.bind(this)} />
          )
        }.bind(this))}
      </div>
    );
  }
}

export default App;
