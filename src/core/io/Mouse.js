import Vector3 from 'core/Vector3';

export default class Mouse {
  constructor() {
    let pressed = new Int8Array(6);

    for (let i = 0, len = pressed.length; i < len; i++) {
      pressed[i] = 0;
    }

    window.mouse = { position: new Vector3(0, 0, 0), pressed };
  }

  isDown = button => {
    return this._pressed[button] === 0 ? null : this._pressed[button];
  };

  onMouseMove = event => {
    window.mouse.position.set(event.clientX, event.clientY, 0);
    //console.log(window.mouse.position.toArray());
  };

  onMouseDown = function(event) {
    event.preventDefault();
    window.mouse.pressed[event.button] = 1;
    //console.log(window.mouse.pressed[event.button]);
  };

  onMouseUp = function(event) {
    window.mouse.pressed[event.button] = 0;
  };
}
