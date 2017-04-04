class Character {
  constructor() {
    this.xPos = 325;
    this.yPos = 550;
    this.jumpTime = 2000; // ms
    this.startJump = null;
    this.endJump = null;
    this.jumping = false;
  }

  jump(deltaTime) {

  //   if(!this.startJump) {
  //     this.startJump = performance.now();
  //     this.endJump = this.startJump + this.jumpTime;
  //   }


  //   if(this.endJump - this.startJump < this.jumpTime / 2) {
  //     this.startJump += 17;
  //     this.yPos -= 2;
  //   }
  //   else if(this.endJump - this.startJump < this.jumpTime) {
  //     this.startJump += 15;
  //     this.yPos += 2;
  //   } else {
  //     this.startJump = null;
  //   }
  }
}