import * as PIXI from 'pixi.js';
import { Store } from 'store';
import Vector3 from 'core/Vector3';
import { changeScore } from 'action/ScoreAction';
import MOUSE_BUTTONS from 'core/io/MouseButtons';
import KEYS from 'core/io/Keys';
import * as Constants from 'core/Constants';

class GameManager {
  constructor() {
    this.objects = [];

    this.loader = PIXI.Loader.shared;
    this.loading = true;

    this.elapsed = 0;

    this.sprites = {};

    this.hero_position = new Vector3();
    this.hero_direction = new Vector3();

    this.zombie_position = new Vector3();
    this.zombie_direction = new Vector3();

    this.up = new Vector3(0, 1, 0);
    this.heroAlive = true;

    //Create a Pixi Application
    this.pixi = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0x1099bb,
      resolution: window.devicePixelRatio || 1
    });

    this.graphics = new PIXI.Graphics();

    // bind to store! o/
    Store.subscribe(() => {
      this.keyboard = Store.getState().keyboard;
      this.mouse = Store.getState().mouse;
      this.score = Store.getState().score;
    });
  }

  init = () => {
    document.body.appendChild(this.pixi.view);

    this.load();
    this.run();
  };

  load = () => {
    this.loader.add('zombie', 'assets/zombies.png');
    this.loader.add('hero', 'assets/generico_tosco.png');

    this.loader.load((loader, resources) => {
      this.sprites.zombie = new PIXI.TilingSprite(resources.zombie.texture, 64, 64);
      this.sprites.hero = new PIXI.Sprite(resources.hero.texture, 64, 64);
    });

    this.loader.onComplete.add(() => {
      this.loading = false;

      this.sprites.zombie.anchor.set(0.5);
      this.sprites.hero.anchor.set(0.5);

      this.sprites.zombie.x = this.pixi.screen.width;
      this.sprites.zombie.y = this.pixi.screen.height;

      this.sprites.hero.x = this.pixi.screen.width / 2;
      this.sprites.hero.y = this.pixi.screen.height / 2;

      this.pixi.stage.addChild(this.sprites.zombie);
      this.pixi.stage.addChild(this.sprites.hero);
      this.pixi.stage.addChild(this.graphics);

      console.log('all resources loded', this.sprites);
    });
  };

  keyPressed = keyCode => {
    if (this.keyboard) {
      return this.keyboard.pressed[keyCode] === 0 ? null : this.keyboard.pressed[keyCode];
    }
    return null;
  };

  buttonPressed = keyCode => {
    if (this.mouse) {
      return this.mouse.pressed[keyCode] === 0 ? null : this.mouse.pressed[keyCode];
    }
    return null;
  };

  getHeroRotation = () => {
    if (this.mouse) {
      this.hero_position.set(this.sprites.hero.x, this.sprites.hero.y, 0);
      this.hero_direction.subVectors(this.mouse.position, this.hero_position);
      return this.mouse.position.x > this.sprites.hero.x ? -this.up.angleTo(this.hero_direction) : this.up.angleTo(this.hero_direction);
    }
    return 0;
  };

  getZombieRotation = () => {
    this.zombie_position.set(this.sprites.zombie.x, this.sprites.zombie.y, 0);
    this.zombie_direction.subVectors(this.hero_position, this.zombie_position);
    return this.hero_position.x > this.sprites.zombie.x ? -this.up.angleTo(this.zombie_direction) : this.up.angleTo(this.zombie_direction);
  };

  run = () => {
    this.pixi.ticker.add(delta => {
      if (!this.loading) {
        this.graphics.clear();

        // Set the fill color
        this.graphics.beginFill(0xf1c40f); // Red

        // Draw a circle
        this.graphics.drawCircle(this.hero_position.x, this.hero_position.y, 4); // drawCircle(x, y, radius)

        // Applies fill to lines and shapes since the last call to beginFill.
        this.graphics.endFill();

        let speed = 200 * (1 / this.pixi.ticker.FPS);

        this.sprites.hero.rotation = this.getHeroRotation();
        this.sprites.zombie.rotation = this.getZombieRotation();

        if (this.mouse && this.keyboard) {
          if (this.heroAlive) {
            this.zombie_direction.normalize();
            this.sprites.zombie.x += this.zombie_direction.x * speed;
            this.sprites.zombie.y += this.zombie_direction.y * speed;

            // this.sprites.hero.x = this.mouse.position.x;
            // this.sprites.hero.y = this.mouse.position.y;

            if (this.zombie_position.distanceTo(this.hero_position) <= 64 && this.score) {
              Store.dispatch(changeScore(this.score.value + 1));
              this.heroAlive = false;
            }
          } else {
            this.sprites.hero.x = this.pixi.screen.width / 2;
            this.sprites.hero.y = this.pixi.screen.height / 2;
          }

          if (this.buttonPressed(MOUSE_BUTTONS.MOUSE_LEFT) || this.keyPressed(KEYS.W) || this.keyPressed(KEYS.A) || this.keyPressed(KEYS.S) || this.keyPressed(KEYS.D)) {
            this.heroAlive = true;
          }

          if (this.keyPressed(KEYS.W)) {
            this.hero_direction.set(0, -1, 0);
            this.sprites.hero.y += this.hero_direction.y * speed;
          }

          if (this.keyPressed(KEYS.A)) {
            this.hero_direction.set(-1, 0, 0);
            this.sprites.hero.x += this.hero_direction.x * speed;
          }

          if (this.keyPressed(KEYS.S)) {
            this.hero_direction.set(0, 1, 0);
            this.sprites.hero.y += this.hero_direction.y * speed;
          }

          if (this.keyPressed(KEYS.D)) {
            this.hero_direction.set(1, 0, 0);
            this.sprites.hero.x += this.hero_direction.x * speed;
          }
        }

        if (this.elapsed > Constants.ANIMATION_SPEED) {
          this.sprites.zombie.tilePosition.x = this.sprites.zombie.tilePosition.x === 192 ? 0 : this.sprites.zombie.tilePosition.x + 64;
          this.elapsed = 0;
        } else {
          this.elapsed += this.pixi.ticker.elapsedMS;
        }
      }
    });
  };
}

export default new GameManager();
