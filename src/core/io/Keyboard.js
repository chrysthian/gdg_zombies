import KEYS from './Keys';

export default class Keyboard {
  constructor() {
    let pressed = new Int16Array(256);

    for (let i = 0, len = pressed.length; i < len; i++) {
      pressed[i] = 0;
    }

    window.keyboard = pressed;
  }

  onKeyDown = event => {
    if (event.keyCode === KEYS.BACKSPACE || event.keyCode === KEYS.UP_ARROW || event.keyCode === KEYS.DOWN_ARROW || event.keyCode === KEYS.LEFT_ARROW || event.keyCode === KEYS.RIGHT_ARROW || event.keyCode === KEYS.PAGE_UP || event.keyCode === KEYS.PAGE_DOWN || event.keyCode === KEYS.SPACE) {
      event.preventDefault();
    }

    window.keyboard[event.keyCode] = 1;
    // console.log(event.keyCode);
  };

  onKeyUp = event => {
    window.keyboard[event.keyCode] = 0;
  };
}
