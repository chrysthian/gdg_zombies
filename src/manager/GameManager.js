import * as PIXI from 'pixi.js'
import Keyboard from 'core/io/Keyboard'
import Mouse from 'core/io/Mouse'

class GameManager {
  constructor() {
    this.objects = [];
    this.keyboard = new Keyboard();
    this.mouse = new Mouse();

    //Create a Pixi Application
    this.pixi = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight - 3,
      backgroundColor: 0x1099bb,
      resolution: window.devicePixelRatio || 1,
    });

  }

  init = () => {
    //Add the canvas that Pixi automatically created for you to the HTML document
    document.body.appendChild(this.pixi.view);

    //init inputs
    this.keyboard.init();
    this.mouse.init()

    this.run();
  }

  load = () => { }

  run = () => {
    this.pixi.ticker.add(delta => {
      // magic goes here!
      // console.log(delta)
    });
  }
}

export default new GameManager();