import KEYS from './Keys'

export default class Keyboard {
  constructor() {
    this._pressed = new Int16Array(256);

    for (let i = 0, len = this._pressed.length; i < len; i++) {
      this._pressed[i] = 0;
    }
  }

  init = () => {
    window.addEventListener('keyup', (event) => {
      this.onKeyUp(event);
    }, false);
    window.addEventListener('keydown', (event) => {
      this.onKeyDown(event);
    }, false);
  }

  isDown = (keyCode) => {
    return (this._pressed[keyCode] === 0) ? null : this._pressed[keyCode];
  }

  onKeyDown = (event) => {
    if (event.keyCode === KEYS.BACKSPACE ||
      event.keyCode === KEYS.UP_ARROW ||
      event.keyCode === KEYS.DOWN_ARROW ||
      event.keyCode === KEYS.LEFT_ARROW ||
      event.keyCode === KEYS.RIGHT_ARROW ||
      event.keyCode === KEYS.PAGE_UP ||
      event.keyCode === KEYS.PAGE_DOWN ||
      event.keyCode === KEYS.SPACE) {
      event.preventDefault();
    }

    this._pressed[event.keyCode] = 1;
    // console.log(event.keyCode)
  };

  onKeyUp = (event) => { 
    this._pressed[event.keyCode] = 0;
  };
}