import Vector3 from 'core/Vector3'

export default class GameObject {
  constructor() {
    this.position = new Vector3();
    this.rotation = new Vector3();
    this.scale = new Vector3();

    this.components = [];

    this.isVisible = true;
    this.isActive = true;
  }

  update = () => { }
  render = () => { }
}