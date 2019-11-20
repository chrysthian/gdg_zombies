import GameObject from './GameObject';
import * as Constants from 'core/Constants';

export default class Bullet extends GameObject {
  constructor(canvasWidth, canvasHeight) {
    super();
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
  }

  update = fps => {
    let speed = Constants.BULLET_SPPED / fps;

    this.direction.normalize();

    if (this.isActive) {
      this.position.x += this.direction.x * speed;
      this.position.y += this.direction.y * speed;
    }

    if (this.position.x < 0 || this.position.x > this.canvasWidth || this.position.y < 0 || this.position.y > this.canvasHeight) {
      this.reset();
    }
  };

  reset = () => {
    this.isActive = false;
    this.position.x = -100;
    this.position.y = -100;
  };
}
