let randomNumber;
let computerSelection;
let playerSelection;
let computerScore = 0;
let playerScore = 0;
let round = 0;
let winner = false;
game();

function computerPlay() {
  if (randomNumber === 1) {
    return "Rock";
  } else if (randomNumber === 2) {
    return "Paper";
  } else {
    return "Scissors";
  }
}

function playerPlay() {
  let tempSelection = capitalize(prompt("Rock, Paper or Scissors?"));
  console.log(`Temp Selection is ${tempSelection}`);
  if (
    tempSelection === "Rock" ||
    tempSelection === "Paper" ||
    tempSelection === "Scissors"
  ) {
    return tempSelection;
  } else {
    console.log("Wrong choice pick only rock, paper or scissors!");
    return playerPlay();
  }
}

function capitalize(str) {
  if (str !== null && str !== "") {
    let str2 = str.toLowerCase();
    return str2.charAt(0).toUpperCase() + str2.slice(1);
  }
}

function playRound(playerSelection, computerSelection) {
  if (playerSelection === "Rock" && computerSelection === "Paper") {
    computerScore++;
    return "You Lose! Paper beats Rock";
  } else if (playerSelection === "Paper" && computerSelection === "Scissors") {
    computerScore++;
    return "You Lose! Scissors beats Paper";
  } else if (playerSelection === "Scissors" && computerSelection === "Rock") {
    computerScore++;
    return "You Lose! Rock beats Scissors";
  } else if (playerSelection === computerSelection) {
    return `It's a tie! ${playerSelection} is equal to ${computerSelection}`;
  } else {
    playerScore++;
    return `You Win! ${playerSelection} beats ${computerSelection}`;
  }
}

function game() {
  while (!winner) {
    if (playerScore === 5 || computerScore === 5) {
      if (playerScore > computerScore) {
        console.log("Player Wins!");
      } else {
        console.log("Computer Wins!");
      }
      winner = true;
    } else {
      round++;
      console.log(`Round ${round}`);
      roundSetup();
      console.log(playRound(playerSelection, computerSelection));
      console.log(`Player: ${playerScore} Computer: ${computerScore}`);
    }
  }
}

function roundSetup() {
  //computer choice
  randomNumber = Math.floor(Math.random() * 3) + 1;
  console.log(randomNumber);
  computerSelection = computerPlay();
  console.log(`Computer Selection is ${computerSelection}`);

  //player choice
  playerSelection = playerPlay();
  console.log(`Player Selection is ${playerSelection}`);
}
