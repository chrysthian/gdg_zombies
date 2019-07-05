import * as _Math from 'core/Math'

export default class Vector3 {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  set = (x = 0, y = 0, z = 0) => {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }

  setScalar = (s) => {
    this.x = s;
    this.y = s;
    this.z = s;
    return this;
  }

  setX = (x) => {
    this.x = x;
    return this;
  }

  setY = (y) => {
    this.y = y;
    return this;
  }

  setZ = (z) => {
    this.z = z;
    return this;
  }

  clone = () => {
    return new this.constructor(this.x, this.y, this.z);
  }

  copy = (v) => {
    this.x = v.x;
    this.y = v.y;
    this.z = v.z;

    return this;
  }

  add = (v) => {
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;

    return this;
  }

  addScalar = (s) => {
    this.x += s;
    this.y += s;
    this.z += s;

    return this;
  }

  addVectors = (a, b) => {
    this.x = a.x + b.x;
    this.y = a.y + b.y;
    this.z = a.z + b.z;

    return this;
  }

  addScaledVector = (v, s) => {
    this.x += v.x * s;
    this.y += v.y * s;
    this.z += v.z * s;

    return this;
  }

  sub = (v) => {
    this.x -= v.x;
    this.y -= v.y;
    this.z -= v.z;

    return this;
  }

  subScalar = (s) => {
    this.x -= s;
    this.y -= s;
    this.z -= s;

    return this;
  }

  subVectors = (a, b) => {
    this.x = a.x - b.x;
    this.y = a.y - b.y;
    this.z = a.z - b.z;

    return this;
  }

  multiply = (v, w) => {
    this.x *= v.x;
    this.y *= v.y;
    this.z *= v.z;

    return this;
  }

  multiplyScalar = (s) => {
    this.x *= s;
    this.y *= s;
    this.z *= s;

    return this;
  }

  multiplyVectors = (a, b) => {
    this.x = a.x * b.x;
    this.y = a.y * b.y;
    this.z = a.z * b.z;

    return this;
  }

  divide = (v) => {
    this.x /= v.x;
    this.y /= v.y;
    this.z /= v.z;

    return this;
  }

  divideScalar = (scalar) => {
    return this.multiplyScalar(1 / scalar);
  }

  min = (v) => {
    this.x = Math.min(this.x, v.x);
    this.y = Math.min(this.y, v.y);
    this.z = Math.min(this.z, v.z);

    return this;
  }

  max = (v) => {
    this.x = Math.max(this.x, v.x);
    this.y = Math.max(this.y, v.y);
    this.z = Math.max(this.z, v.z);

    return this;

  }

  clamp = (min, max) => {
    // assumes min < max

    this.x = Math.max(min.x, Math.min(max.x, this.x));
    this.y = Math.max(min.y, Math.min(max.y, this.y));
    this.z = Math.max(min.z, Math.min(max.z, this.z));

    return this;
  }

  clampScalar = (minVal, maxVal) => {
    this.x = Math.max(minVal, Math.min(maxVal, this.x));
    this.y = Math.max(minVal, Math.min(maxVal, this.y));
    this.z = Math.max(minVal, Math.min(maxVal, this.z));

    return this;
  }

  clampLength = (min, max) => {
    let length = this.length();
    return this.divideScalar(length || 1).multiplyScalar(Math.max(min, Math.min(max, length)));
  }

  floor = () => {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    this.z = Math.floor(this.z);

    return this;
  }

  ceil = () => {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
    this.z = Math.ceil(this.z);

    return this;
  }

  round = () => {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    this.z = Math.round(this.z);

    return this;
  }

  roundToZero = () => {
    this.x = (this.x < 0) ? Math.ceil(this.x) : Math.floor(this.x);
    this.y = (this.y < 0) ? Math.ceil(this.y) : Math.floor(this.y);
    this.z = (this.z < 0) ? Math.ceil(this.z) : Math.floor(this.z);

    return this;
  }

  negate = () => {
    this.x = - this.x;
    this.y = - this.y;
    this.z = - this.z;

    return this;
  }

  dot = (v) => {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }

  length = () => {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  lengthSq = () => {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }

  manhattanLength = () => {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
  }

  normalize = () => {
    return this.divideScalar(this.length() || 1);
  }

  setLength = (length) => {
    return this.normalize().multiplyScalar(length);
  }

  lerp = (v, alpha) => {
    this.x += (v.x - this.x) * alpha;
    this.y += (v.y - this.y) * alpha;
    this.z += (v.z - this.z) * alpha;

    return this;
  }

  lerpVectors = (v1, v2, alpha) => {
    return this.subVectors(v2, v1).multiplyScalar(alpha).add(v1);
  }

  cross = (v) => {
    return this.crossVectors(this, v);
  }

  crossVectors = (a, b) => {
    let ax = a.x, ay = a.y, az = a.z;
    let bx = b.x, by = b.y, bz = b.z;

    this.x = ay * bz - az * by;
    this.y = az * bx - ax * bz;
    this.z = ax * by - ay * bx;

    return this;
  }

  projectOnVector = (vector) => {
    let scalar = vector.dot(this) / vector.lengthSq();
    return this.copy(vector).multiplyScalar(scalar);
  }
  reflect = () => {
    // reflect incident vector off plane orthogonal to normal
    // normal is assumed to have unit length

    let v1 = new Vector3();

    return (normal) => {
      return this.sub(v1.copy(normal).multiplyScalar(2 * this.dot(normal)));
    };
  }

  angleTo = (v) => {
    let theta = this.dot(v) / (Math.sqrt(this.lengthSq() * v.lengthSq()));

    // clamp, to handle numerical problems
    return Math.acos(_Math.clamp(theta, - 1, 1));
  }

  distanceTo = (v) => {
    return Math.sqrt(this.distanceToSquared(v));
  }

  distanceToSquared = (v) => {
    let dx = this.x - v.x, dy = this.y - v.y, dz = this.z - v.z;
    return dx * dx + dy * dy + dz * dz;
  }

  manhattanDistanceTo = (v) => {
    return Math.abs(this.x - v.x) + Math.abs(this.y - v.y) + Math.abs(this.z - v.z);
  }

  equals = (v) => {
    return ((v.x === this.x) && (v.y === this.y) && (v.z === this.z));
  }

  fromArray = (array, offset) => {
    if (offset === undefined) offset = 0;

    this.x = array[offset];
    this.y = array[offset + 1];
    this.z = array[offset + 2];

    return this;
  }

  toArray = (array, offset) => {
    if (array === undefined) array = [];
    if (offset === undefined) offset = 0;

    array[offset] = this.x;
    array[offset + 1] = this.y;
    array[offset + 2] = this.z;

    return array;
  }
}