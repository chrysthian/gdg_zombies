import GameObject from './GameObject';
import * as Constants from 'core/Constants';

export default class Hero extends GameObject {
  constructor(canvasWidth, canvasHeight) {
    super();
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
  }

  update = fps => {
    let speed = Constants.HERO_MOVE_SPEED / fps;

    this.direction.normalize();

    if (this.isActive) {
      this.position.x += this.direction.x * speed;
      this.position.y += this.direction.y * speed;
    }
  };

  reset = () => {
    this.isActive = false;
    this.position.x = this.canvasWidth / 2;
    this.position.y = this.canvasHeight / 2;
  };
}
