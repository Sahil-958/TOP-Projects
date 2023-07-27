const ROCK = "rock";
const SCISSORS = "scissors";
const PAPER = "paper";

let choices = [ROCK, SCISSORS, PAPER];

let playerSelection = "rock";
console.log("Welcome to Console Rock Paper Scissors\nTo start Type: game(); into tha console and press ENTER")
function getComputerChoice() {
    return choices[Math.floor(Math.random() * 3)];
}

function play(playerSelection, computerSelection) {
    if ((playerSelection != ROCK) && (playerSelection != SCISSORS) && (playerSelection != PAPER)) {
        return `BAD Input: Only Rock Paper Scissors | Case insensitive are allowed`;
    }
    computerSelection = computerSelection.toLowerCase();
    playerSelection = playerSelection.toLowerCase();
    if (computerSelection === playerSelection) {
        return "Its a TIE!";
    }
    else if (
        (computerSelection == ROCK && playerSelection == SCISSORS) ||
        (computerSelection == SCISSORS && playerSelection == PAPER) ||
        (computerSelection == PAPER && playerSelection == ROCK)
    ) {
        return `You lose! ${computerSelection} beats ${playerSelection}`;
    }

    else
        return `You Win! ${playerSelection} beats ${computerSelection}`;


}
function game() {
    console.log("ROCK PAPER SCISSORS ");
    for (let i = 0; i < 5; i++) {
        console.log(`Round ${i + 1} of 5:`);
        playerSelection = prompt("Enter your choice:", playerSelection);
        console.log(play(playerSelection, getComputerChoice()));
    }

}