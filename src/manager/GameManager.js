import * as PIXI from 'pixi.js';
import { Store } from 'store';
import Vector3 from '../core/Vector3';
import { changeScore } from 'action/ScoreAction'
import MOUSE_BUTTONS from 'core/io/MouseButtons';

class GameManager {
  constructor() {
    this.objects = [];

    this.loader = PIXI.Loader.shared;
    this.loading = true;

    this.animationSpeed = 200;
    this.elapsed = 0;

    this.sprites = {};

    this.direction_buffer = new Vector3();
    this.zombie_buffer = new Vector3()
    this.up = new Vector3(0, 1, 0)
    this.brainActive = true;

    //Create a Pixi Application
    this.pixi = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0x1099bb,
      resolution: window.devicePixelRatio || 1
    });

    // bind to store! o/
    Store.subscribe(() => {
      this.mouse = Store.getState().mouse
      this.score = Store.getState().score
    })
  }

  init = () => {
    //Add the canvas that Pixi automatically created for you to the HTML document
    document.body.appendChild(this.pixi.view);

    this.load();
    this.run();
  };

  load = () => {
    this.loader.add('brain', 'assets/brain.png');
    this.loader.add('zombies', 'assets/zombies.png');

    this.loader.load((loader, resources) => {
      this.sprites.brain = new PIXI.Sprite(resources.brain.texture, 32, 32);
      this.sprites.zombies = new PIXI.TilingSprite(resources.zombies.texture, 64, 64);
    });

    this.loader.onComplete.add(() => {
      this.loading = false;

      this.sprites.zombies.x = this.pixi.screen.width / 2;
      this.sprites.zombies.y = this.pixi.screen.height / 2;

      this.sprites.zombies.anchor.set(0.5);
      this.sprites.brain.anchor.set(0.5);

      this.pixi.stage.addChild(this.sprites.zombies);
      this.pixi.stage.addChild(this.sprites.brain);

      console.log('all resources loded', this.sprites);
    });
  };

  buttonPressed = keyCode => {
    if (this.mouse) {
      //console.log(this.mouse.pressed[0], keyCode, MOUSE_BUTTONS.)
      return this.mouse.pressed[keyCode] === 0 ? null : this.mouse.pressed[keyCode];
    }
    return null
  };

  getRotation = () => {
    if (this.mouse) {
      this.zombie_buffer.set(this.sprites.zombies.x, this.sprites.zombies.y, 0)
      this.direction_buffer.subVectors(this.mouse.position, this.zombie_buffer);
      return (this.mouse.position.x > this.sprites.zombies.x) ? -this.up.angleTo(this.direction_buffer) : this.up.angleTo(this.direction_buffer)
    }
    return 0;
  }

  run = () => {
    this.pixi.ticker.add(delta => {
      if (!this.loading) {
        let speed = 200 * (1 / this.pixi.ticker.FPS);

        this.sprites.zombies.rotation = this.getRotation()

        if (this.mouse) {
          if (this.brainActive) {
            this.direction_buffer.normalize()
            this.sprites.zombies.x += this.direction_buffer.x * speed;
            this.sprites.zombies.y += this.direction_buffer.y * speed;

            this.sprites.brain.x = this.mouse.position.x
            this.sprites.brain.y = this.mouse.position.y

            if (this.zombie_buffer.distanceTo(this.mouse.position) <= 64 && this.score) {
              Store.dispatch(changeScore(this.score.score + 1));
              this.brainActive = false;
            }
          } else {
            this.sprites.brain.x = -100
            this.sprites.brain.y = -100
          }

          if (this.buttonPressed(MOUSE_BUTTONS.MOUSE_LEFT)) {
            this.brainActive = true;
          }
        }

        if (this.elapsed > this.animationSpeed) {
          this.sprites.zombies.tilePosition.x = (this.sprites.zombies.tilePosition.x === 192) ? 0 : this.sprites.zombies.tilePosition.x + 64
          this.elapsed = 0
        } else {
          this.elapsed += this.pixi.ticker.elapsedMS
        }
      }
    });
  };
}

export default new GameManager();
