import * as PIXI from 'pixi.js';
import KEYS from 'core/io/Keys';
import { Store } from 'store';
import Vector3 from '../core/Vector3';
import { changeScore } from 'action/ScoreAction'

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

    //Create a Pixi Application
    this.pixi = new PIXI.Application({
      width: window.innerWidth ,
      height: window.innerHeight - 3,
      backgroundColor: 0x1099bb,
      resolution: window.devicePixelRatio || 1
    });

    // bind to store! o/
    Store.subscribe(() => {
      this.keyboard = Store.getState().keyboard.pressed
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
    this.loader.add('generico_tosco', 'assets/generico_tosco.png');
    this.loader.add('zombies', 'assets/zombies.png');

    this.loader.load((loader, resources) => {
      this.sprites.generico_tosco = new PIXI.TilingSprite(resources.generico_tosco.texture, 64, 64);
      this.sprites.zombies = new PIXI.TilingSprite(resources.zombies.texture, 64, 64);
    });

    this.loader.onComplete.add(() => {
      this.loading = false;

      this.sprites.zombies.x = this.pixi.screen.width / 2;
      this.sprites.zombies.y = this.pixi.screen.height / 2;
      
      this.sprites.zombies.anchor.set(0.5);
      this.sprites.generico_tosco.anchor.set(0.5);

      this.pixi.stage.addChild(this.sprites.zombies);
      this.pixi.stage.addChild(this.sprites.generico_tosco);

      console.log('all resources loded', this.sprites);
    });
  };

  keyPressed = keyCode => {
    if (this.keyboard) {
      return this.keyboard[keyCode] === 0 ? null : this.keyboard[keyCode];
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

        // if (this.keyPressed(KEYS.W)) {
        //   this.sprites.zombies.y -= speed;
        // }
        // if (this.keyPressed(KEYS.S)) {
        //   this.sprites.zombies.y += speed;
        // }
        // if (this.keyPressed(KEYS.A)) {
        //   this.sprites.zombies.x -= speed;
        // }
        // if (this.keyPressed(KEYS.D)) {
        //   this.sprites.zombies.x += speed;
        // }

        this.sprites.zombies.rotation = this.getRotation()

        this.direction_buffer.normalize()
        this.sprites.zombies.x += this.direction_buffer.x * speed;
        this.sprites.zombies.y += this.direction_buffer.y * speed;

        if (this.mouse) {
          this.sprites.generico_tosco.x = this.mouse.position.x
          this.sprites.generico_tosco.y = this.mouse.position.y

          if( this.zombie_buffer.distanceTo(this.mouse.position) <= 64 && this.score){
            Store.dispatch(changeScore(this.score.score +1));
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
