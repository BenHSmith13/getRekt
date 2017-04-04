
class Menu {
  constructor(resetGame) {
    this.isActive = false;
    this.currentItem = '';
    this.items = {
      newGame: 'New Game',
      highScores: 'High Scores',
      credits: 'Credits',
      reconfigure: 'Reconfigure',
    };
    this.scoresVisible = false;
    this.creditsVisible = false;
    this.initListeners((key) => this.menuActions(key));
    this.resetGame = resetGame;
  }

  menuActions(keyCode) {
    switch (keyCode) {
      case keyMap.up:
        this.arrowUp();
        break;
      case keyMap.down:
        this.arrowDown();
        break;
      case keyMap.esc:
        this.isActive = !this.isActive;
        break;
      case keyMap.enter:
        this.select();
        break;
      default:
        break;
    }
  }

  initListeners(callback) {
    addEventListener("keydown", (e) => {
      callback(e.keyCode);
    }, false);
  }

  upOne() {
    switch (this.currentItem) {
      case '':
        return this.items.credits;
      case this.items.credits:
        return this.items.highScores;
      case this.items.highScores:
        return this.items.newGame;
      case this.items.newGame:
        return this.items.reconfigure;
      case this.items.reconfigure:
        return this.items.credits;
      default:
        return '';
    }
  }

  downOne() {
    switch (this.currentItem) {
      case '':
        return this.items.newGame;
      case this.items.newGame:
        return this.items.highScores;
      case this.items.highScores:
        return this.items.credits;
      case this.items.credits:
        return this.items.reconfigure;
      case this.items.reconfigure:
        return this.items.newGame;
      default:
        return '';
    }
  }

  arrowUp() {
    this.currentItem = this.upOne();
  }

  arrowDown() {
    this.currentItem = this.downOne();
  }

  clearScoreDisplay() {
    const scoreNode = document.getElementById('scores');
    while (scoreNode.firstChild) {
      scoreNode.removeChild(scoreNode.firstChild);
    }
  }

  showCorrectElements() {
    document.getElementById('highScores').style.display = this.scoresVisible ? 'block' : 'none';
    document.getElementById('credits').style.display = this.creditsVisible ? 'block' : 'none';
  }

  showScores() {
    this.scoresVisible = !this.scoresVisible;
    this.creditsVisible = false;
    const scores = JSON.parse(localStorage.getItem('scores'));
    this.showCorrectElements();
    if (scores && this.scoresVisible) {
      const sortedScores = _.orderBy(scores, null, ['desc']);
      _.forEach(sortedScores, (score, index) => {
        if (index < 10) {
          const node = document.createElement('P');
          const scoreNode = document.createTextNode(score);
          node.appendChild(scoreNode);
          document.getElementById('scores').appendChild(node);
        }
      })
    } else {
      this.clearScoreDisplay();
    }
  }

  showCredits() {
    this.creditsVisible = !this.creditsVisible;
    this.scoresVisible = false;
    this.showCorrectElements();
    this.clearScoreDisplay();
  }

  reconfigControls() {
    console.log('Will set up new controls page here.')
  }

  select() {
    switch (this.currentItem) {
      case this.items.newGame:
        this.scoresVisible = false;
        this.creditsVisible = false;
        this.showCorrectElements();
        this.resetGame();
        break;
      case this.items.highScores:
        this.showScores();
        break;
      case this.items.credits:
        this.showCredits();
        break;
      case this.items.reconfigure:
        this.reconfigControls();
        break;
      default:
        break;
    }
  }
}
