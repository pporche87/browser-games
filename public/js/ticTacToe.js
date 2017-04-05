var gameBoard = document.getElementById("gameBoard");
var gameboardArray = ["#","#","#","#","#","#","#","#","#"];
var winConditionData = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
var gameHasWinner = false;
var resetGame = false;
var counter = 0;
var player = {
  symbol: "#",
  class: "#"
};
var computer = {
  symbol: "#",
  class: "#"
};
var turnCounter = 0;

function setPlayerXorO(){
  player.symbol = prompt("Would you like to be an X or and O");
  if(player.symbol === "X"){
    computer.symbol = "O";
    computer.class = "fa fa-opera";
    player.class = "fa fa-times";
  } else {
    computer.symbol = "X";
    computer.class = "fa fa-times";
    player.symbol = "O";
    player.class = "fa fa-opera";
  }
}

// function playerTurn(){
// var playerSquarePosition = parseInt(dataset.gameBoard.location);
// gameboardArray[playerSquarePosition] = player.symbol;

var square0 = document.getElementById("0");
var square1 = document.getElementById("1");
var square2 = document.getElementById("2");
var square3 = document.getElementById("3");
var square4 = document.getElementById("4");
var square5 = document.getElementById("5");
var square6 = document.getElementById("6");
var square7 = document.getElementById("7");
var square8 = document.getElementById("8");

function playerTurn(square0, square1, square3, square4, square5, square6, square7, square8){
  var square0 = document.getElementById("0");
  var square1 = document.getElementById("1");
  var square2 = document.getElementById("2");
  var square3 = document.getElementById("3");
  var square4 = document.getElementById("4");
  var square5 = document.getElementById("5");
  var square6 = document.getElementById("6");
  var square7 = document.getElementById("7");
  var square8 = document.getElementById("8");
  if(gameboardArray[0] === "#"){
    square0.className += player.class;

  }
}

// checkGameStatusHelper();
// computerTurn();


function computerTurn(){
var computerSquarePosition = (Math.random()*10).toFixed();
if(gameboardArray[computerSquarePosition] === "#"){
  gameboardArray[computerSquarePosition] = computer.symbol;
} else {
  computerTurn();
}
checkGameStatusHelper();
}

function updateArray(gameBoardLocation, playerOrComp){
  if(gameboardArray[gameBoardLocation] === "#"){
    gameboardArray[gameBoardLocation] = playerOrComp;
  } else {
    computerTurn();
  }
}

function declareDraw(){
  if(counter === 9){
    promt("There is no winner");
    resetGame = true;
  }
}

function checkWinner(winConditionData){
  for(var i = 0; i < winConditionData.length; i++){
    checkWinnerHelper(windConditionData[i]);
  }
}

function checkWinnerHelper(index1, index2, index3){
    if(gameboardArray[index1] === "X" && gameboardArray[index2] === "X" && gameboardArray[index3] === "X"){
      prompt("X's Win!");
      gameHasWinner = true;
      resetGame = true;
    } else if(gameboardArray[index1] === "O" && gameboardArray[index2] === "O" && gameboardArray[index3] === "O") {
      prompt("O's win!");
      gameHasWinner = true;
      resetGame = true;
    }
}

// function checkGameStatusHelper(){
//   counter++;
//   updateArray();
//   checkWinner();
//   declareDraw();
// }

function resetGame(){
  if(resetGame === true){
    window.location.reload();
  }
}

setPlayerXorO();
