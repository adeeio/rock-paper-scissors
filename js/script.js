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
var modalMessage = document.getElementById("modal-one").getElementsByTagName('div')[1];
var modalStats = document.getElementById("modal-one").childNodes[3];




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
      modalStats.innerHTML = " YOU WON THE ENTIRE GAME!";
      modalMessage.innerHTML = " PRESS NEW GAME BUTTON TO PLAY AGAIN!";
      showModal();
      btnEnability(true);
      params.cpuScore = 0;
      params.userScore = 0;
     params.roundLimit = 0;
      params.rounding = 0;
      return true;
    }
    else if(params.rounding === params.roundLimit && params.cpuScore > params.userScore){
      modalStats.innerHTML = " YOU LOST WITH CPU, WHAT A LOOSER!";
      modalMessage.innerHTML = " PRESS NEW GAME BUTTON TO PLAY AGAIN!";
      showModal();
      btnEnability(true);
      params.cpuScore = 0;
      params.userScore = 0;
     params.roundLimit = 0;
      params.rounding = 0;
    }
   else if(params.rounding === params.roundLimit && params.cpuScore === params.userScore){
      modalStats.innerHTML = " ITS A DRAW!";
      modalMessage.innerHTML = " PRESS NEW GAME BUTTON TO PLAY AGAIN!";
      showModal();
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

function showModal(){
  event.preventDefault();
  document.querySelector('#modal-overlay').classList.add('show');
  var modals = document.querySelectorAll('.modal');
  for(var i = 0; i < modals.length; i++){
    modals[i].classList.remove('show');
    modals[i].classList.add('show'); 
  }
}

var hideModal = function(event){
  event.preventDefault();
  document.querySelector('#modal-overlay').classList.remove('show');
}

var closeButtons = document.querySelectorAll('.modal .close');

for(var i = 0; i < closeButtons.length; i++){
  closeButtons[i].addEventListener('click', hideModal);
}


function playerMove(){
  var userChoice = this.getAttribute('data-move');
  var cpuMove = random();
  var resoults = checkResoults(userChoice, cpuMove);
  
  displayStats(resoults);
  scoring(resoults);
  gameOver(params.userScore, params.cpuScore);
}