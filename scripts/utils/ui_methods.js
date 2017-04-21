// Functinos that dorectyl interact with the DOM should go here.
// These functions should be accessible form anywhere is the code

function startNewGame() {
  const newGame = new GameLoop();
  newGame.startGame(true);

  document.getElementById('scoreText').style.display = 'inline-block';
}

window.onload = () => startNewGame();

var scores = firebase.database().ref('scores/');
scores.on('value', function(snapshot) {
  // updateStarCount(postElement, snapshot.val());
  debugger;
});