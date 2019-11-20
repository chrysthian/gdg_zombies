import Vector3 from 'core/Vector3';

export default class GameObject {
  constructor(position = new Vector3(), direction = new Vector3()) {
    this.position = position;
    this.direction = direction;

    this.isVisible = true;
    this.isActive = false;
  }
}
