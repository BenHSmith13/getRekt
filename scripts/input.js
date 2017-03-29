
class Input {
  constructor(callback) {
    this.keysdown = {};
    this.init(this.keysdown);
  }

  init(keyObject) {
    addEventListener("keydown", (e) => {
      keyObject[e.keyCode] = true;
    }, false);

    addEventListener("keyup", (e) => {
      delete keyObject[e.keyCode];
    }, false);
  }
}