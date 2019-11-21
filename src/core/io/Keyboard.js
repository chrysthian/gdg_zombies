import KEYS from './Keys';

export default class Keyboard {
  constructor() {
    this.pressed = new Int16Array(256);

    for (let i = 0, len = this.pressed.length; i < len; i++) {
      this.pressed[i] = 0;
    }
  }

  onKeyDown = event => {
    if (event.keyCode === KEYS.BACKSPACE || event.keyCode === KEYS.UP_ARROW || event.keyCode === KEYS.DOWN_ARROW || event.keyCode === KEYS.LEFT_ARROW || event.keyCode === KEYS.RIGHT_ARROW || event.keyCode === KEYS.PAGE_UP || event.keyCode === KEYS.PAGE_DOWN || event.keyCode === KEYS.SPACE) {
      event.preventDefault();
    }

    console.log(event.key);
    this.pressed[event.keyCode] = 1;
    return this.pressed
  };

  onKeyUp = event => {
    this.pressed[event.keyCode] = 0;
    return this.pressed
  };
}
