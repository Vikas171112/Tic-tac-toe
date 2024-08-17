// Get the player selector buttons
let playerSelector = Array.from(
  document.querySelectorAll(".player-selector button")
);

// Get the element that displays the current turn
let turn = document.querySelector(".turn h2");
console.log(turn);

// Get the boxes in the game board
let boxes = Array.from(document.querySelectorAll(".box"));
console.log(boxes);

// Variables to track the players and current turn
let currentPlayer = "";
let playerX = "X";
let playerO = "0";
let gameActive = true;

// Set up an event listener for each player button
playerSelector.forEach((element, index) => {
  element.addEventListener("click", () => {
    if (index === 1) {
      currentPlayer = playerO; // Start with Player 0
      turn.textContent = "Player 0's Turn";
    } else {
      currentPlayer = playerX; // Start with Player X
      turn.textContent = "Player X's Turn";
    }

    // Disable the player selection buttons after the selection is made
    playerSelector.forEach((button) => (button.disabled = true));
  });
});

// Function to check for a win
function checkWin() {
  const winningCombinations = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal from top-left to bottom-right
    [2, 4, 6], // Diagonal from top-right to bottom-left
  ];

  // Check each winning combination to see if all indices are the same player's mark
  for (let i = 0; i < winningCombinations.length; i++) {
    let [a, b, c] = winningCombinations[i];
    if (
      boxes[a].textContent === currentPlayer &&
      boxes[a].textContent === boxes[b].textContent &&
      boxes[a].textContent === boxes[c].textContent
    ) {
      return true; // We have a winner
    }
  }
  return false; // No winner
}

// Handle clicks on the game board boxes
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.textContent === "" && currentPlayer !== "" && gameActive) {
      box.textContent = currentPlayer;

      // Check for a win after the current move
      if (checkWin()) {
        turn.textContent = `Player ${currentPlayer} Wins!`;
        gameActive = false; // Stop the game after a win
      } else if (boxes.every((box) => box.textContent !== "")) {
        // If all boxes are filled and no winner, it's a draw
        turn.textContent = "It's a Draw!";
        gameActive = false;
      } else {
        // Switch turns if no win or draw
        currentPlayer = currentPlayer === playerX ? playerO : playerX;
        turn.textContent = `Player ${currentPlayer}'s Turn`;
      }
    }
  });
});

let lastPlayer = playerX;
const resetBtn = () => {
  boxes.forEach((box) => (box.textContent = ""));

  // Reset the turn indicator to show Player X's turn
  turn.textContent = "Player X's Turn";

  // Reset the current player to Player X by default
  // Toggle the starting player
  lastPlayer = lastPlayer === playerX ? playerO : playerX;

  // Set the current player to the opposite of the last starting player
  currentPlayer = lastPlayer;

  // Reactivate the game
  gameActive = true;
  turn.textContent = `Player ${currentPlayer}'s Turn`;

  // Re-enable the player selection buttons so players can choose again
  playerSelector.forEach((button) => (button.disabled = false));
};
