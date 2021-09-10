let rivalScore = 0;
let playerScore = 0;
let battle = 0;
let winner = false;
let battleDescription;

const choices = document.querySelectorAll(".choice");
const battleNumber = document.querySelector("#battleNumber");
const player = document.querySelector("#playerScore");
const rival = document.querySelector("#rivalScore");
const battleText = document.querySelector("#battleDescription");
const playAgain = document.querySelector("#playAgain");
const playerPokemon = document.querySelector("#pokemon-player");
const playerBG = document.querySelector("#playerBG");
const rivalPokemon = document.querySelector("#pokemon-rival");
const rivalBG = document.querySelector("#rivalBG");

playAgain.addEventListener("click", resetUI);

choices.forEach((choice) => choice.addEventListener("click", playBattle));
playAgain.style.display = "none";

function rivalChoice() {
  const randomNumber = Math.floor(Math.random() * 3) + 1;
  //console.log(randomNumber);
  if (randomNumber === 1) {
    return "Fire";
  } else if (randomNumber === 2) {
    return "Grass";
  } else {
    return "Water";
  }
}

function updateUI() {
  battleNumber.textContent = `Battle: ${battle}`;
  player.textContent = `Player Score: ${playerScore}`;
  rival.textContent = `Rival Score: ${rivalScore}`;
  battleText.textContent = `${battleDescription}`;
  if (winner) {
    playAgain.style.display = "inline-block";
  }
}

function updateBattleContainer(image, selection, bgSelection) {
  if (selection === "Fire") {
    image.src = "/images/2.png";
    bgSelection.style.backgroundColor = "var(--red)";
  } else if (selection === "Grass") {
    image.src = "/images/1.png";
    bgSelection.style.backgroundColor = "var(--green)";
  } else {
    image.src = "/images/3.png";
    bgSelection.style.backgroundColor = "var(--blue)";
  }
}

function resetUI() {
  winner = false;
  rivalScore = 0;
  playerScore = 0;
  battle = 0;
  battleDescription = "Red vs Blue";
  playerPokemon.src = "/images/hidden1.png";
  playerBG.style.backgroundColor = "var(--grayBG)";
  rivalPokemon.src = "/images/hidden2.png";
  rivalBG.style.backgroundColor = "var(--grayBG)";
  updateUI();
  playAgain.style.display = "none";
}

function playBattle(e) {
  //console.log("inside the playBattle method");
  const playerSelection = e.target.dataset.choice;
  const rivalSelection = rivalChoice();
  if (!winner) {
    if (
      (playerSelection === "Grass" && rivalSelection === "Fire") ||
      (playerSelection === "Water" && rivalSelection === "Grass") ||
      (playerSelection === "Fire" && rivalSelection === "Water")
    ) {
      battleLost(playerSelection, rivalSelection);
    } else if (playerSelection === rivalSelection) {
      battleTie(playerSelection, rivalSelection);
    } else {
      battleWon(playerSelection, rivalSelection);
    }
  }
  //console.log("end of the playBattle method");
}

function battleWon(playerSelection, rivalSelection) {
  //console.log("inside the battleWon method");
  playerScore++;
  battle++;
  battleDescription = `You Win! ${playerSelection} is super effective against ${rivalSelection}`;
  checkWinner();
  updateBattleContainer(playerPokemon, playerSelection, playerBG);
  updateBattleContainer(rivalPokemon, rivalSelection, rivalBG);
  updateUI();
  //console.log("end of the battleWon method");
}

function battleLost(playerSelection, rivalSelection) {
  //console.log("inside the battleLost method");
  rivalScore++;
  battle++;
  battleDescription = `You Lose! ${rivalSelection} is super effective against ${playerSelection}`;
  checkWinner();
  updateBattleContainer(playerPokemon, playerSelection, playerBG);
  updateBattleContainer(rivalPokemon, rivalSelection, rivalBG);
  updateUI();
  //console.log("end of the battleLost method");
}

function battleTie(playerSelection, rivalSelection) {
  //console.log("inside the battleTie method");
  battle++;
  battleDescription = `It's a tie! ${playerSelection} is equal to ${rivalSelection}`;
  updateBattleContainer(playerPokemon, playerSelection, playerBG);
  updateBattleContainer(rivalPokemon, rivalSelection, rivalBG);
  updateUI();
  //console.log("end of the battleTie method");
}

function checkWinner() {
  //console.log("inside the checkwinner method");
  if (playerScore === 5) {
    winner = true;
    battleDescription = `Red Wins!`;
  } else if (rivalScore === 5) {
    winner = true;
    battleDescription = `Blue Wins!`;
  }
  //console.log("end of the checkWinner method");
}
