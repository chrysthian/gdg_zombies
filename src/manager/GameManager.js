import * as PIXI from 'pixi.js';
import KEYS from 'core/io/Keys';
import { Store } from 'store';

class GameManager {
  constructor() {
    this.objects = [];

    this.loader = PIXI.Loader.shared;
    this.loading = true;

    this.sprites = {};

    //Create a Pixi Application
    this.pixi = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0x1099bb,
      resolution: window.devicePixelRatio || 1
    });

    // bind to store! o/
    Store.subscribe(() => {
      this.keyboard = Store.getState().keyboard.pressed
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

      this.pixi.stage.addChild(this.sprites.zombies);

      console.log('all resources loded', this.sprites);
    });
  };

  keyPressed = keyCode => {
    if (this.keyboard) {
      return this.keyboard[keyCode] === 0 ? null : this.keyboard[keyCode];
    }
    return null
  };

  run = () => {
    this.pixi.ticker.add(delta => {
      if (!this.loading) {
        let speed = 200 * (1 / this.pixi.ticker.FPS);

        if (this.keyPressed(KEYS.W)) {
          this.sprites.zombies.y -= speed;
        }
        if (this.keyPressed(KEYS.S)) {
          this.sprites.zombies.y += speed;
        }
        if (this.keyPressed(KEYS.A)) {
          this.sprites.zombies.x -= speed;
        }
        if (this.keyPressed(KEYS.D)) {
          this.sprites.zombies.x += speed;
        }
      }
    });
  };
}

export default new GameManager();
