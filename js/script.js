'use-strict';


document.getElementById("new-game").onclick = newGame;

var allButtons = document.querySelectorAll('.player-move');
var params = {
  cpuScore: 0,
  userScore: 0,
  roundLimit: 0,
  rounding: 0,
  paper: 1,
  rock: 2,
  scissors: 3,
  draw: 1,
  win: 2,
  loose: 3,
  paperString: "paper",
  rockString: "rock",
  scissorsString: "scissors"
};

for(var i = 0; i < allButtons.length; i++){
  allButtons[i].addEventListener('click', playerMove);
  
}


var roundLimitInfo = document.getElementById("round-limit-info");
var output = document.getElementById("output");
var result = document.getElementById("result");
var strikes = document.getElementById("strikes");

//var cpuScore = 0;
//var userScore = 0;
//var roundLimit = 0;
//var rounding = 0;

//var paper = 1;
//var rock = 2;
//var scissors = 3;
//
//var draw  = 1;
//var win = 2;
//var loose = 3;
//
//var paperString = "paper";
//var rockString = "rock";
//var scissorsString ="scissors";



function btnEnability(btnDisable){
  document.getElementById("paper").disabled = btnDisable;
  document.getElementById("rock").disabled = btnDisable;
  document.getElementById("scissors").disabled = btnDisable;
}

 function random(){
  var cpuChoice = Math.floor(Math.random() * 3) + 1;
  if(cpuChoice === params.paper){
    return params.paperString;
  }
   else if(cpuChoice === params.rock){
     return params.rockString;
  }
   else{
     return params.scissorsString;
  }}

 function checkResoults(x, y){
  if(x === y){
    result.innerHTML = " YOU PLAYED " + x + " CPU PLAYED " + y;
    return params.draw;
  }
  else if(x === params.paperString && y === params.rockString || x === params.rockString && y === params.scissorsString || x === params.scissorsString && y === params.paperString){
    result.innerHTML = " YOU PLAYED " + x + " CPU PLAYED " + y;
   return params.win;
}
  else if(x === params.paperString && y === params.scissorsString || x === params.rockString && y === params.paperString || x === params.scissorsString && y === params.rockString){
    result.innerHTML = " YOU PLAYED " + x + " CPU PLAYED " + y;
    return params.loose;
}}

function displayStats(s){
    if(s === params.draw ){
      output.innerHTML = " ITS A DRAW!";
    }
    else if(s === params.win){
      output.innerHTML = " YOU WIN";
      strikes.innerHTML += " Y ";
    }
    else{
      output.innerHTML = " YOU LOOSE";
      strikes.innerHTML += " X ";
    }
  }

function scoring(a){
    if(a === params.win){
      params.userScore++;
      params.rounding++;
    }
    else if(a === params.loose){
      params.cpuScore++;
      params.rounding++;
    }
    else if(a === params.draw){
      params.rounding++;
     
    }
  }

function gameOver(u, c) {
    if(params.rounding === params.roundLimit && params.cpuScore < params.userScore){
      result.innerHTML = "YOU WON THE ENTIRE GAME!";
      output.innerHTML = " PRESS NEW GAME BUTTON TO PLAY AGAIN!";
      btnEnability(true);
      params.cpuScore = 0;
      params.userScore = 0;
     params.roundLimit = 0;
      params.rounding = 0;
      return true;
    }
    else if(params.rounding === params.roundLimit && params.cpuScore > params.userScore){
      result.innerHTML = "YOU LOST WITH CPU, WHAT A LOOSER!";
      output.innerHTML = " PRESS NEW GAME BUTTON TO PLAY AGAIN!";
      btnEnability(true);
      params.cpuScore = 0;
      params.userScore = 0;
     params.roundLimit = 0;
      params.rounding = 0;
    }
   else if(params.rounding === params.roundLimit && params.cpuScore === params.userScore){
      result.innerHTML = "ITS A DRAW!";
      output.innerHTML = " PRESS NEW GAME BUTTON TO PLAY AGAIN!";
      btnEnability(true);
      params.cpuScore = 0;
      params.userScore = 0;
     params.roundLimit = 0;
      params.rounding = 0;
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
   params.roundLimit = parseInt(message);
    result.innerHTML = " ";
    output.innerHTML = " ";
    strikes.innerHTML = " ";
    roundLimitInfo.innerHTML = "Score " + params.roundLimit + " to win the game!";
    btnEnability(false);
  }
}

btnEnability(true);


function playerMove(){
  //var att = event.getAttribute('data-move'); // o to chodzilo? 
  var userChoice = this.id;
  var cpuMove = random();
  var resoults = checkResoults(userChoice, cpuMove);
  
  displayStats(resoults);
  scoring(resoults);
  gameOver(params.userScore, params.cpuScore);
}