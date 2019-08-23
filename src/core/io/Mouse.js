import Vector3 from 'core/Vector3';

export default class Mouse {
  constructor() {
    this.pressed = new Int8Array(6)
    this.position = new Vector3(0, 0, 0)

    for (let i = 0, len = this.pressed.length; i < len; i++) {
      this.pressed[i] = 0
    }
  }

  onMouseMove = event => {
    this.position.set(event.clientX, event.clientY, 0)
    return this.position
  };

  onMouseDown = function(event) {
    event.preventDefault()
    this.pressed[event.button] = 1
    return this.pressed
  };

  onMouseUp = function(event) {
    this.pressed[event.button] = 0
    return this.pressed
  };
}
