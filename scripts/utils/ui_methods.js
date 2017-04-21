// Functinos that dorectyl interact with the DOM should go here.
// These functions should be accessible form anywhere is the code

function startNewGame() {
  const newGame = new GameLoop();
  newGame.startGame(true);
}

window.onload = () => startNewGame();
