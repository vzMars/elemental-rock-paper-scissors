let rivalScore = 0;
let playerScore = 0;
let battle = 0;
let winner = false;
let battleDescription;
const player1 = 'Red';
const player2 = 'Blue';

const choices = document.querySelectorAll('.choice');
const battleNumber = document.querySelector('#battleNumber');
const player = document.querySelector('#playerScore');
const rival = document.querySelector('#rivalScore');
const battleText = document.querySelector('#battleDescription');
const playAgain = document.querySelector('#playAgain');
const playerPokemon = document.querySelector('#pokemon-player');
const playerBG = document.querySelector('#playerBG');
const rivalPokemon = document.querySelector('#pokemon-rival');
const rivalBG = document.querySelector('#rivalBG');

playAgain.addEventListener('click', resetUI);

choices.forEach((choice) => choice.addEventListener('click', playBattle));
playAgain.style.display = 'none';

function rivalChoice() {
  const randomNumber = Math.floor(Math.random() * 3);
  switch (randomNumber) {
    case 0:
      return 'Fire';
    case 1:
      return 'Grass';
    default:
      return 'Water';
  }
}

function updateUI() {
  battleNumber.textContent = `Battle: ${battle}`;
  player.textContent = `Player Score: ${playerScore}`;
  rival.textContent = `Rival Score: ${rivalScore}`;
  battleText.textContent = `${battleDescription}`;
  if (winner) {
    playAgain.style.display = '';
  }
}

function updateBattleContainer(image, selection, bgSelection) {
  if (selection === 'Fire') {
    image.src = 'images/2.png';
    bgSelection.style.backgroundColor = 'var(--red)';
  } else if (selection === 'Grass') {
    image.src = 'images/1.png';
    bgSelection.style.backgroundColor = 'var(--green)';
  } else {
    image.src = 'images/3.png';
    bgSelection.style.backgroundColor = 'var(--blue)';
  }
}

function resetUI() {
  winner = false;
  rivalScore = 0;
  playerScore = 0;
  battle = 0;
  battleDescription = `${player1} vs ${player2}`;
  playerPokemon.src = 'images/hidden1.png';
  playerBG.style.backgroundColor = 'var(--gray)';
  rivalPokemon.src = 'images/hidden2.png';
  rivalBG.style.backgroundColor = 'var(--gray)';
  updateUI();
  playAgain.style.display = 'none';
}

function playBattle(e) {
  const playerSelection = e.target.dataset.choice;
  const rivalSelection = rivalChoice();
  if (!winner) {
    if (
      (playerSelection === 'Grass' && rivalSelection === 'Fire') ||
      (playerSelection === 'Water' && rivalSelection === 'Grass') ||
      (playerSelection === 'Fire' && rivalSelection === 'Water')
    ) {
      battleStatus(playerSelection, rivalSelection, player2);
    } else if (playerSelection === rivalSelection) {
      battleStatus(playerSelection, rivalSelection, '');
    } else {
      battleStatus(playerSelection, rivalSelection, player1);
    }
  }
}

function battleStatus(playerSelection, rivalSelection, winner) {
  if (winner === 'Red') {
    playerScore++;
    battleDescription = `You Win! ${playerSelection} is super effective against ${rivalSelection}`;
  } else if (winner === 'Blue') {
    rivalScore++;
    battleDescription = `You Lose! ${rivalSelection} is super effective against ${playerSelection}`;
  } else {
    battleDescription = `It's a tie! ${playerSelection} is equal to ${rivalSelection}`;
  }
  battle++;
  checkWinner();
  updateBattleContainer(playerPokemon, playerSelection, playerBG);
  updateBattleContainer(rivalPokemon, rivalSelection, rivalBG);
  updateUI();
}

function checkWinner() {
  if (playerScore === 5) {
    winner = true;
    battleDescription = `${player1} Wins!`;
  } else if (rivalScore === 5) {
    winner = true;
    battleDescription = `${player2} Wins!`;
  }
}
