import * as PIXI from 'pixi.js';
import { Store } from 'store';
import Vector3 from 'core/Vector3';
import { changeScore } from 'action/ScoreAction';
import MOUSE_BUTTONS from 'core/io/MouseButtons';
import KEYS from 'core/io/Keys';
import * as Constants from 'core/Constants';
import Bullet from '../entity/Bullet';
import Zombie from '../entity/Zombie';
import Hero from '../entity/Hero';

class GameManager {
  constructor() {
    this.loader = PIXI.Loader.shared;
    this.loading = true;

    this.elapsedSpriteAnimation = 0;
    this.elapsedTimeBetweenShots = Constants.TIME_BETWEEN_SHOTS;

    this.sprites = {};

    this.hero = null;
    this.zombie = null;

    this.bullets = [];

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

      for (let i = 0; i < Constants.MAX_BULLETS; i++) {
        this.bullets.push(new Bullet(this.pixi.screen.width, this.pixi.screen.height));
      }

      this.hero = new Hero(this.pixi.screen.width, this.pixi.screen.height);
      this.zombie = new Zombie(this.pixi.screen.width, this.pixi.screen.height);

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

  shoot = elapsedMS => {
    if (this.elapsedTimeBetweenShots > Constants.TIME_BETWEEN_SHOTS) {
      for (let i = 0; i < Constants.MAX_BULLETS; i++) {
        if (!this.bullets[i].isActive) {
          this.bullets[i].isActive = true;
          this.bullets[i].position.set(this.hero.position.x, this.hero.position.y, 0);
          this.bullets[i].direction = this.hero.direction.clone();
          this.elapsedTimeBetweenShots = 0;
          return;
        }
      }
    } else {
      this.elapsedTimeBetweenShots += elapsedMS;
    }
  };

  getHeroRotation = () => {
    if (this.mouse) {
      this.hero.position.set(this.sprites.hero.x, this.sprites.hero.y, 0);
      this.hero.direction.subVectors(this.mouse.position, this.hero.position);
      return this.mouse.position.x > this.sprites.hero.x ? -this.up.angleTo(this.hero.direction) : this.up.angleTo(this.hero.direction);
    }
    return 0;
  };

  getZombieRotation = () => {
    this.zombie.position.set(this.sprites.zombie.x, this.sprites.zombie.y, 0);
    this.zombie.direction.subVectors(this.hero.position, this.zombie.position);
    return this.hero.position.x > this.sprites.zombie.x ? -this.up.angleTo(this.zombie.direction) : this.up.angleTo(this.zombie.direction);
  };

  renderShots = fps => {
    this.graphics.clear();

    for (let i = 0; i < Constants.MAX_BULLETS; i++) {
      if (this.bullets[i].isActive) {
        this.bullets[i].update(fps);
        this.graphics.beginFill(0xf1c40f);
        this.graphics.drawCircle(this.bullets[i].position.x, this.bullets[i].position.y, 4);
        this.graphics.endFill();
      }
    }
  };

  checkCollisions = () => {
    for (let i = 0; i < Constants.MAX_BULLETS; i++) {
      if (this.bullets[i].isActive) {
        if (this.zombie.position.distanceTo(this.bullets[i].position) <= 64 && this.score) {
          if (this.zombie.life < 0) {
            Store.dispatch(changeScore(this.score.value + 1));
            this.zombie.reset();
            this.sprites.zombie.x = this.zombie.position.x;
            this.sprites.zombie.y = this.zombie.position.y;
          } else {
            this.zombie.life--;
          }

          this.bullets[i].reset();
        }
      }
    }
  };

  run = () => {
    this.pixi.ticker.add(delta => {
      if (!this.loading) {
        this.renderShots(this.pixi.ticker.FPS);

        this.sprites.hero.rotation = this.getHeroRotation();
        this.sprites.zombie.rotation = this.getZombieRotation();

        if (this.mouse && this.keyboard) {
          if (this.buttonPressed(MOUSE_BUTTONS.MOUSE_LEFT)) {
            this.shoot(this.pixi.ticker.elapsedMS);
          } else {
            this.elapsedTimeBetweenShots = Constants.TIME_BETWEEN_SHOTS;
          }

          if (this.heroAlive) {
            this.zombie.update(this.pixi.ticker.FPS);
            this.checkCollisions();
            this.sprites.zombie.x = this.zombie.position.x;
            this.sprites.zombie.y = this.zombie.position.y;
          } else {
            this.sprites.hero.x = this.pixi.screen.width / 2;
            this.sprites.hero.y = this.pixi.screen.height / 2;
          }

          let speed = Constants.HERO_MOVE_SPEED * (1 / this.pixi.ticker.FPS);

          if (this.keyPressed(KEYS.W)) {
            this.hero.direction.set(0, -1, 0);
            this.sprites.hero.y += this.hero.direction.y * speed;
          }

          if (this.keyPressed(KEYS.A)) {
            this.hero.direction.set(-1, 0, 0);
            this.sprites.hero.x += this.hero.direction.x * speed;
          }

          if (this.keyPressed(KEYS.S)) {
            this.hero.direction.set(0, 1, 0);
            this.sprites.hero.y += this.hero.direction.y * speed;
          }

          if (this.keyPressed(KEYS.D)) {
            this.hero.direction.set(1, 0, 0);
            this.sprites.hero.x += this.hero.direction.x * speed;
          }
        }

        if (this.elapsedSpriteAnimation > Constants.ANIMATION_SPEED) {
          this.sprites.zombie.tilePosition.x = this.sprites.zombie.tilePosition.x === 192 ? 0 : this.sprites.zombie.tilePosition.x + 64;
          this.elapsedSpriteAnimation = 0;
        } else {
          this.elapsedSpriteAnimation += this.pixi.ticker.elapsedMS;
        }
      }
    });
  };
}

export default new GameManager();
