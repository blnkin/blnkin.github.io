// Get all the box elements, reset button, and instructions button
const boxes = document.querySelectorAll(".box");
const resetBtn = document.getElementById("reset-btn");
const instructionsBtn = document.getElementById("instructions-btn");

// Add click event listeners to each box to navigate to the appropriate level
boxes.forEach(box => {
  box.addEventListener("click", () => {
    location.assign(box.getAttribute("href"));
  });
});

// Add click event listener to the instructions button
instructionsBtn.addEventListener("click", () => {
  location.assign("instructions.html");
});

// When the page loads, check if all levels are completed and play confetti video if so
document.addEventListener("DOMContentLoaded", () => {
  if (checkAllLevelsCompleted()) {
    playConfettiVideo();
  }
});

// Function to check if all levels are completed
function checkAllLevelsCompleted() {
  const gameResults = getGameResults();
  const levels = Object.values(gameResults);
  return levels.every(level => level === "win");
}

// Function to play confetti video
function playConfettiVideo() {
  const confettiContainer = document.getElementById("confetti-container");
  const confettiVideo = document.getElementById("confetti-video");

  confettiContainer.style.display = "flex";
  confettiVideo.play();

  confettiVideo.addEventListener("ended", () => {
    confettiContainer.style.display = "none";
  });
}

// Add click event listener to the reset button to reset game progress
resetBtn.addEventListener("click", () => {
  resetGameProgress();
});

// Function to reset game progress
function resetGameProgress() {
  localStorage.removeItem("3x3gameResult");
  localStorage.removeItem("4x4gameResult");
  localStorage.removeItem("5x5gameResult");
  localStorage.removeItem("6x6gameResult");
  localStorage.removeItem("7x7gameResult");
  localStorage.removeItem("8x8gameResult");
  localStorage.removeItem("9x9gameResult");
  localStorage.removeItem("10x10gameResult");
  localStorage.removeItem("bonusgameResult");
  location.reload();
}
