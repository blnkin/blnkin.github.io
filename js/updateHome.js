// When the DOM is fully loaded, update the box colors based on the game results
document.addEventListener("DOMContentLoaded", () => {
  const boxes = document.querySelectorAll(".box");
  const gameResults = getGameResults();

  // Loop through each box element and set the background color based on the game result
  boxes.forEach(box => {
    const levelName = box.getAttribute("href").replace(".html", "");
    if (gameResults[levelName] === "win") {
      box.style.backgroundColor = "#2ECC71";
    } else if (gameResults[levelName] === "lose") {
      box.style.backgroundColor = "#E74C3C";
    }

    // Add click event listeners to each box, redirecting to the corresponding game level
    box.addEventListener("click", () => {
      location.assign(box.getAttribute("href"));
    });
  });
});

// Function to get the game results from localStorage
function getGameResults() {
  return {
    "3x3": localStorage.getItem("3x3gameResult"),
    "4x4": localStorage.getItem("4x4gameResult"),
    "5x5": localStorage.getItem("5x5gameResult"),
    "6x6": localStorage.getItem("6x6gameResult"),
    "7x7": localStorage.getItem("7x7gameResult"),
    "8x8": localStorage.getItem("8x8gameResult"),
    "9x9": localStorage.getItem("9x9gameResult"),
    "10x10": localStorage.getItem("10x10gameResult"),
    "bonus": localStorage.getItem("bonusgameResult"),
  };
}
