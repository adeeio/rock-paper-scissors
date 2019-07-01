'use-strict';

document.getElementById("paper").onclick = playerMove;
document.getElementById("rock").onclick = playerMove;
document.getElementById("scissors").onclick = playerMove;
document.getElementById("new-game").onclick = newGame;

var roundLimitInfo = document.getElementById("round-limit-info");
var output = document.getElementById("output");
var result = document.getElementById("result");
var strikes = document.getElementById("strikes");

var cpuScore = 0;
var userScore = 0;
var roundLimit = 0;
var rounding = 0;

var paper = 1;
var rock = 2;
var scissors = 3;

var draw  = 1;
var win = 2;
var loose = 3;

var paperString = "paper";
var rockString = "rock";
var scissorsString ="scissors";



function btnEnability(btnDisable){
  document.getElementById("paper").disabled = btnDisable;
  document.getElementById("rock").disabled = btnDisable;
  document.getElementById("scissors").disabled = btnDisable;
}

 function random(){
  var cpuChoice = Math.floor(Math.random() * 3) + 1;
  if(cpuChoice === paper){
    return paperString;
  }
   else if(cpuChoice === rock){
     return rockString;
  }
   else{
     return scissorsString;
  }}

 function checkResoults(x, y){
  if(x === y){
    result.innerHTML = " YOU PLAYED " + x + " CPU PLAYED " + y;
    return draw;
  }
  else if(x === "paper" && y === "rock" || x === "rock" && y === "scissors" || x === "scissors" && y === "paper"){
    result.innerHTML = " YOU PLAYED " + x + " CPU PLAYED " + y;
   return win;
}
  else if(x === "paper" && y === "scissors" || x === "rock" && y === "paper" || x === "scissors" && y === "rock"){
    result.innerHTML = " YOU PLAYED " + x + " CPU PLAYED " + y;
    return loose;
}}

function displayStats(s){
    if(s === draw ){
      output.innerHTML = " ITS A DRAW!";
    }
    else if(s === win){
      output.innerHTML = " YOU WIN";
      strikes.innerHTML += " Y ";
    }
    else{
      output.innerHTML = " YOU LOOSE";
      strikes.innerHTML += " X ";
    }
  }

function scoring(a){
    if(a === win){
      userScore++;
      rounding++;
    }
    else if(a === loose){
      cpuScore++;
      rounding++;
    }
    else if(a === draw){
      //rounding++;
     
    }
  }

function gameOver(u, c) {
    if(rounding === roundLimit && cpuScore < userScore){
      result.innerHTML = "YOU WON THE ENTIRE GAME!";
      output.innerHTML = " PRESS NEW GAME BUTTON TO PLAY AGAIN!";
      btnEnability(true);
      cpuScore = 0;
      userScore = 0;
      roundLimit = 0;
      rounding = 0;
      return true;
    }
    else if(rounding === roundLimit && cpuScore > userScore){
      result.innerHTML = "YOU LOST WITH CPU, WHAT A LOOSER!";
      output.innerHTML = " PRESS NEW GAME BUTTON TO PLAY AGAIN!";
      btnEnability(true);
      cpuScore = 0;
      userScore = 0;
      roundLimit = 0;
      rounding = 0;
    }
   else if(rounding === roundLimit && cpuScore === userScore){
      result.innerHTML = "ITS A DRAW!";
      output.innerHTML = " PRESS NEW GAME BUTTON TO PLAY AGAIN!";
      btnEnability(true);
      cpuScore = 0;
      userScore = 0;
      roundLimit = 0;
      rounding = 0;
    }
  }



function newGame(){
  var message = prompt("Set round limit:",);
  if(isNaN(message)){
    alert(message + " is not a number!");
  }
  else if(message == null){
    return false;
  }
  else if(message < 1){
    alert(message + " invalid number");
  }
  else{
    roundLimit = parseInt(message);
    result.innerHTML = " ";
    output.innerHTML = " ";
    strikes.innerHTML = " ";
    roundLimitInfo.innerHTML = "Score " + roundLimit + " to win the game!";
    btnEnability(false);
  }
}

btnEnability(true);


function playerMove(){
  var userChoice = this.id;
  var cpuMove = random();
  var resoults = checkResoults(userChoice, cpuMove);
  
  displayStats(resoults);
  scoring(resoults);
  gameOver(userScore, cpuScore);
}