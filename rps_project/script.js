const ROCK = "rock";
const SCISSORS = "scissors";
const PAPER = "paper";

let choices = [ROCK, SCISSORS, PAPER];
let userScore = 0;
let computerScore = 0;
let roundCount=0;
let playerSelection = "rock";
const user = document.querySelector("#user");
user.textContent = `You: ${userScore}`;
const computer = document.querySelector("#computer");
computer.textContent = `Computer: ${computerScore}`;
const para = document.querySelector(".reason");
para.textContent = "Welcome to Rock Paper Scissors\nTo Start the game make you choice";
const buttons = document.querySelectorAll(".btn");

buttons.forEach(button => {
    button.addEventListener('click', () => {
        para.textContent=`ROUND:${roundCount+1} of 5`;
        setButton(true);
        play(button.id, getComputerChoice());
    });
});
function getComputerChoice() {
    return choices[Math.floor(Math.random() * 3)];
}

function play(playerSelection, computerSelection) {
    if ((playerSelection != ROCK) && (playerSelection != SCISSORS) && (playerSelection != PAPER)) {
        para.textContent = `BAD Input: Only Rock Paper Scissors | Case insensitive are allowed`;
    }
    computerSelection = computerSelection.toUpperCase();
    playerSelection = playerSelection.toUpperCase();
    if (computerSelection === playerSelection) {
        setTimeout(() => {
            para.textContent = "Its a TIE!";
        }, 500);
    }
    else if (
        (computerSelection == ROCK && playerSelection == SCISSORS) ||
        (computerSelection == SCISSORS && playerSelection == PAPER) ||
        (computerSelection == PAPER && playerSelection == ROCK)
    ) {
        setTimeout(() => {
            para.textContent = `You lose! ${computerSelection} beats ${playerSelection}`;
        }, 500);
        ++computerScore;
        computer.textContent = `Computer: ${computerScore}`;
    }

    else {
        setTimeout(() => {
            para.textContent = `You Win! ${playerSelection} beats ${computerSelection}`;
        }, 500);
        ++userScore;
        user.textContent = `You: ${userScore}`;
    }
    ++roundCount;
    if(roundCount === 5) {
        setTimeout(() => {
            restartGame();
            return;
        }, 1000);
    }
    setTimeout(() => {
        setButton(false);
    }, 800);
}
            


function restartGame(){
    roundCount=0;
    if(userScore<computerScore){
            para.textContent="YOU LOSE! The computer's 'randomness' reigns supreme. Truly awe-inspiring.";
    }else if(userScore>computerScore){
            para.textContent="YOU WIN! Human intellect outwits 'random' calculations. A legendary feat.";
    }else {
            para.textContent="A TIE? Destiny flips a coin, unsure whether to applaud your brilliance or the computer's 'random' charm.";
    }
    userScore=computerScore=0;
    setTimeout(() => {
        window.alert('Round Ended!');
        user.textContent = `You: ${userScore}`;
        computer.textContent = `Computer: ${computerScore}`;
    }, 1000);
}

function setButton(status){
    buttons.forEach(button=>{
        button.classList.toggle('disabled');
        button.disabled=status;
    });
}