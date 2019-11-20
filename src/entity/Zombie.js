import GameObject from './GameObject';
import * as Constants from 'core/Constants';

export default class Bullet extends GameObject {
  constructor(canvasWidth, canvasHeight) {
    super();
    this.reset();
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
  }

  update = fps => {
    let speed = Constants.ZOMBIE_MOVE_SPEED * (1 / fps);

    this.direction.normalize();

    if (this.isActive) {
      this.position.x += this.direction.x * speed;
      this.position.y += this.direction.y * speed;
    }
  };

  reset = () => {
    this.isActive = true;

    switch (Math.floor(Math.random() * 4)) {
      case 1:
        this.position.x = Math.random() * this.canvasWidth;
        this.position.y = -63;
        break;
      case 2:
        this.position.x = -63;
        this.position.y = Math.random() * this.canvasHeight;
        break;
      case 3:
        this.position.x = this.canvasWidth + 63;
        this.position.y = Math.random() * this.canvasHeight;
        break;
      case 4:
      default:
        this.position.x = Math.random() * this.canvasWidth;
        this.position.y = this.canvasHeight + 63;
        break;
    }

    this.life = Constants.ZOMBIE_LIFE;
  };
}
