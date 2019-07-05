import Vector3 from 'core/Vector3'

export default class Mouse {
  constructor() {
    this._pressed = new Int8Array(6);
    this._buffer = new Vector3(0, 0, 0);

    this.position = new Vector3(0, 0, 0);

    this.MOUSE_LMB = 0;
    this.MOUSE_MID = 1;
    this.MOUSE_RMB = 2;
    this.MOUSE_B3 = 3;
    this.MOUSE_B4 = 4;
    this.MOUSE_B5 = 5;

    for (let i = 0, len = this._pressed.length; i < len; i++) {
      this._pressed[i] = -1;
    }
  }

  init = () => {
    window.addEventListener('mousemove', (event) => {
      this.onMouseMove(event);
    }, false);
    window.addEventListener('mousedown', (event) => {
      this.onMouseDown(event);
    }, false);
    window.addEventListener('mouseup', (event) => {
      this.onMouseUp(event);
    }, false);
  }

  isDown = (button) => {
    return (this._pressed[button] === -1) ? null : this._pressed[button];
  }

  onMouseMove = (event) => {
    this.position.set(event.clientX, event.clientY, 0);
    // console.log(this.position.toArray())
  }

  onMouseDown = function (event) {
    event.preventDefault();
    this._pressed[event.button] = 1;
  };

  onMouseUp = function (event) {
    this._pressed[event.button] = -1;
  };

  getMousePositionOnElement = (e) => {
    var rect = e.getBoundingClientRect();
    this._buffer.set(this.position.x - rect.left, this.position.y - rect.top, 0);
    return this._buffer;
  };
}