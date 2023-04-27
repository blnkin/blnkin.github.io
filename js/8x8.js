const boxes = document.querySelectorAll('.box');
const startButton = document.getElementById('start-button');
const backButton = document.getElementById('back-button');
const timerElement = document.getElementById('timer');

// Defining the game object with game state and data
const game = {
  highlightedBoxes: [],
  selectedBoxes: [],
  active: false,
  score: 0,
  attempts: 0,
  countdownTimeout: null,
  countdownInterval: null,
  timer: null
};

// Defining the sounds object to store audio files for game events
const sounds = {
  start: new Audio('./audio/start.mp3'),
  incorrect: new Audio('./audio/incorrect.mp3'),
  win: new Audio('./audio/win.mp3'),
  lose: new Audio('./audio/loose.mp3'),
  boxClick: new Audio('./audio/box.mp3')
};

// Function to generate an array of 12 random, unique boxes
function getRandomBoxes() {
  const randomBoxes = [];
  while (randomBoxes.length < 12) {
    const index = Math.floor(Math.random() * boxes.length);
    if (!randomBoxes.includes(boxes[index])) {
      randomBoxes.push(boxes[index]);
    }
  }
  return randomBoxes;
}

// Function to update the timer display with the time left
function updateTimerDisplay(time) {
  timerElement.innerText = `TIME LEFT:${time}`;
}

// Function to start the countdown for the game
function startCountdown() {
  let seconds = 9;
  updateTimerDisplay(seconds);
  game.countdownTimeout = setTimeout(function countdown() {
    if (seconds === 0) {
      updateTimerDisplay("TIME'S UP!");
    } else {
      seconds--;
      updateTimerDisplay(seconds);
      game.countdownTimeout = setTimeout(countdown, 1000);
    }
  }, 1000);
}

// Function to toggle the visibility of the start button
function toggleButtonsVisibility(visible) {
  startButton.style.display = visible ? "inline-block" : "none";
}
// Function to highlight boxes and start the game
function highlightBoxes() {
  sounds.start.play();
  game.active = false;
  toggleButtonsVisibility(false);
  game.highlightedBoxes.push(...getRandomBoxes());
  game.highlightedBoxes.forEach(box => {
    box.classList.add('highlight');
  });
  setTimeout(() => {
    game.highlightedBoxes.forEach(box => {
      box.classList.remove('highlight');
    });
    game.active = true;
    game.timer = setTimeout(() => {
      endGame();
    }, 10000);
    startCountdown();
  }, 5000);
}

// Function to handle the logic when a box is clicked
function checkClickedBox(box) {
  sounds.boxClick.play();
  if (!game.active) {
    return;
  }
  if (game.selectedBoxes.includes(box)) {
    return;
  }
  game.attempts++;
  if (game.highlightedBoxes.includes(box)) {
    box.classList.add('correct');
    game.selectedBoxes.push(box);
    game.score++;
    if (game.selectedBoxes.length === game.highlightedBoxes.length) {
      clearTimeout(game.timer);
      winGame();
    }
  } else {
    box.classList.add('incorrect');
    sounds.incorrect.play();
    endGame();
  }
}

// Function to update the title text with a given message
function updateTitleText(message) {
  const title = document.querySelector('.title');
  title.innerText = message;
}

// Function to highlight remaining correct boxes
function highlightRemainingCorrectBoxes() {
  game.highlightedBoxes.forEach(box => {
    if (!game.selectedBoxes.includes(box)) {
      box.classList.add('highlight');
    }
  });
}

// Function to reset the game state and UI
function resetGame() {
  game.active = true;
  toggleButtonsVisibility(false);
  game.selectedBoxes.length = 0;
  game.highlightedBoxes.length = 0;
  game.score = 0;
  game.attempts = 0;
  boxes.forEach(box => {
    box.classList.remove('highlight', 'correct', 'incorrect');
  });
  updateTitleText("REMEMBER?");
}

// Function to handle the win condition and transition
function winGame() {
  clearTimeout(game.timer);
  clearInterval(game.countdownTimeout);
  game.active = false;
  sounds.win.play();
  setTimeout(() => {
    updateTitleText(`YOU WIN!\nSCORE: ${game.score} / ${game.attempts}`);
    setTimeout(() => {
      resetGame();
      localStorage.setItem("8x8gameResult", "win");
      location.assign('index.html');
    }, 4000);
  }, 500);
}

// Function to handle the end of the game (win or lose)
function endGame() {
clearTimeout(game.timer);
clearInterval(game.countdownTimeout);
game.active = false;

if (game.selectedBoxes.length === game.highlightedBoxes.length) {
  winGame();
} else {
  sounds.lose.play();
  setTimeout(() => {
    localStorage.setItem("8x8gameResult", "lose");
    highlightRemainingCorrectBoxes();
    updateTitleText(`FAILED!\nSCORE: ${game.score} / ${game.attempts}`);
    setTimeout(() => {
      resetGame();
      location.assign('index.html');
    }, 4000);
  }, 500);
}
}

// Event listeners for start, back buttons and boxes
startButton.addEventListener('click', () => {
resetGame();
highlightBoxes();
});

backButton.addEventListener('click', () => {
location.assign('index.html');
});

boxes.forEach(box => {
box.addEventListener('click', () => {
  checkClickedBox(box);
});
});
   