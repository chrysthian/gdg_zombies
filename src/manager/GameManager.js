import * as PIXI from 'pixi.js'
import Keyboard from 'core/io/Keyboard'
import Mouse from 'core/io/Mouse'

class GameManager {
  constructor() {
    this.objects = []
    this.keyboard = new Keyboard()
    this.mouse = new Mouse()

    this.loader = PIXI.Loader.shared
    this.loading = true

    this.sprites = {};

    //Create a Pixi Application
    this.pixi = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight - 3,
      backgroundColor: 0x1099bb,
      resolution: window.devicePixelRatio || 1,
    })
  }

  init = () => {
    //Add the canvas that Pixi automatically created for you to the HTML document
    document.body.appendChild(this.pixi.view)

    //init inputs
    this.keyboard.init()
    this.mouse.init()

    this.load()
    this.run()
  }

  load = () => {
    this.loader
      .add('generico_tosco', 'assets/generico_tosco.png')
      .add('zombies', 'assets/zombies.png');

    this.loader
      .load((loader, resources) => {
        this.sprites.generico_tosco = new PIXI.TilingSprite(resources.generico_tosco.texture);
        this.sprites.zombies = new PIXI.TilingSprite(resources.zombies.texture);
      });

    this.loader
      .onComplete.add(() => {
        this.loading = false
        console.log('all resources loded', this.sprites);
      })
  }

  run = () => {
    this.pixi.ticker.add(delta => {
      // magic goes here!
      if (!this.loading) {
        //console.log(delta)
      }
    });
  }
}

export default new GameManager();