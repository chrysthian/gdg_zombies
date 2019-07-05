
import { DEG2RAD, RAD2DEG } from 'core/Constants'

export const degToRad = (degrees) => {
  return degrees * DEG2RAD;
}

export const radToDeg = (radians) => {
  return radians * RAD2DEG;
}

export const clamp = (value, min, max) => {
  return Math.max(min, Math.min(max, value));
}
