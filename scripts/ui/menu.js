
class Menu {
  constructor(resetGame, state) {
    this.gameState = state;
    this.screen = 'menu';
    this.currentItem = null;
    this.menuItems = {
      newGame: 'New Game',
      highScores: 'High Scores',
      credits: 'Credits',
      reconfigure: 'Reconfigure',
    };

    this.gameOverItems = {
      position: 0,
      initials: [0, 0, 0],
      submit: false,
    };

    this.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    this.highScores = [];
    this.listenForHighScores();

    this.countDown = 3;

    this.scoresVisible = false;
    this.creditsVisible = false;
    this.reconfigureVisible = false;
    this.initListeners((codes) => this.menuActions(codes));
    this.resetGame = resetGame;
    this.newJumper = localStorage.getItem('reconfigured') || 'space';
  }

  reset() {
    this.countDown = 3;
    this.screen = 'countDown';
  }

  menuActions(codes) {
    if (this.reconfigureVisible && codes.keyCode !== keyMap.enter) {
      if(codes.stringKey == " "){
        codes.stringKey = 'space';
      }

      localStorage.setItem('reconfigured', codes.stringKey);
      this.newJumper = codes.stringKey;
      let node = document.getElementById('currentBinding');
      node.innerHTML = `Reconfigured Jump To: '${codes.stringKey}'`
    }

    switch (codes.keyCode) {
      case keyMap.up:
        this.arrowUp();
        break;
      case keyMap.down:
        this.arrowDown();
        break;
      case keyMap.left:
        this.arrowLeft();
        break;
      case keyMap.right:
        this.arrowRight();
        break;
      case keyMap.escape:
        if (this.screen !== 'menu'){
          this.screen = 'menu';
        } else {
          this.screen = null;
        }
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
      callback({keyCode: e.keyCode, stringKey: e.key});
    }, false);
  }

  upOne() {
    switch (this.currentItem) {
      case '':
        return this.menuItems.credits;
      case this.menuItems.credits:
        return this.menuItems.highScores;
      case this.menuItems.highScores:
        return this.menuItems.newGame;
      case this.menuItems.newGame:
        return this.menuItems.reconfigure;
      case this.menuItems.reconfigure:
        return this.menuItems.credits;
      default:
        return '';
    }
  }

  downOne() {
    switch (this.currentItem) {
      case '':
        return this.menuItems.newGame;
      case this.menuItems.newGame:
        return this.menuItems.highScores;
      case this.menuItems.highScores:
        return this.menuItems.credits;
      case this.menuItems.credits:
        return this.menuItems.reconfigure;
      case this.menuItems.reconfigure:
        return this.menuItems.newGame;
      default:
        return '';
    }
  }

  moveInitial(direction) {
    if (this.gameOverItems.position === 0 && direction === 'left' || this.gameOverItems.position === 2 && direction === 'right') {
      this.gameOverItems.submit = true;
    } else {
      this.gameOverItems.submit = false;
      if (direction === 'left') { this.gameOverItems.position -= 1}
      if (direction === 'right') { this.gameOverItems.position += 1}
    }
  }

  changeLetter(direction) {
    if (!this.gameOverItems.submit) {
      if (direction === 'down') {
        if (this.gameOverItems.initials[this.gameOverItems.position] === 25) {
          this.gameOverItems.initials[this.gameOverItems.position] = 0;
        } else {
          this.gameOverItems.initials[this.gameOverItems.position] += 1;
        }
      } else {
        if (this.gameOverItems.initials[this.gameOverItems.position] === 0) {
          this.gameOverItems.initials[this.gameOverItems.position] = 25;
        } else {
          this.gameOverItems.initials[this.gameOverItems.position] -= 1;
        }
      }
    }
  }

  arrowUp() {
    if (this.screen === 'menu') {
      this.currentItem = this.upOne();
    } else if (this.screen === 'gameOver') {
      this.changeLetter('up');
    }
  }

  arrowDown() {
    if (this.screen === 'menu') {
      this.currentItem = this.downOne();
    } else if (this.screen === 'gameOver') {
      this.changeLetter('down');
    }
  }

  arrowLeft() {
    if (this.screen === 'gameOver') {
      this.moveInitial('left');
    }
  }

  arrowRight() {
    if (this.screen === 'gameOver') {
      this.moveInitial('right');
    }
  }

  showCorrectElements() {
    document.getElementById('highScores').style.display = this.scoresVisible ? 'block' : 'none';
    document.getElementById('credits').style.display = this.creditsVisible ? 'block' : 'none';
    document.getElementById('reconfigure').style.display = this.reconfigureVisible ? 'block' : 'none';
  }

  reconfigControls() {
    this.reconfigureVisible = !this.reconfigureVisible;
    this.showCorrectElements();
    let node = document.getElementById('currentBinding');
    node.innerHTML = `Reconfigured Jump To: '${this.newJumper}'`
  }

  changeMenu() {
    switch (this.currentItem) {
      case this.menuItems.newGame:
        this.screen = null;
        this.resetGame();
        break;
      case this.menuItems.highScores:
        this.screen = 'highScores';
        break;
      case this.menuItems.credits:
        this.screen = 'credits';
        break;
      case this.menuItems.reconfigure:
        this.reconfigControls();
        break;
      default:
        break;
    }
  }

  saveScore() {
    // Get a reference to the database service
    const database = firebase.database().ref('scores/');
    // Create a new post reference with an auto-generated id
    var newPostRef = database.push();
    newPostRef.set({
      name: _.map(this.gameOverItems.initials, index => this.alphabet[index]).join(''),
      score: this.gameState.score,
    });
    this.screen = 'highScores';
  }

  select() {
    if (this.screen === 'menu') {
      this.changeMenu()
    } else if (this.screen === 'gameOver' && this.gameOverItems.submit) {
      this.saveScore();
    }
  }

  listenForHighScores() {
    const scores = firebase.database().ref('scores/').orderByChild('score').limitToLast(7);
    scores.on('child_added', (data) => {
      this.highScores.push(data.val());
    });
  }
}
