import { Enum } from 'enumify';

export class ActionEnum extends Enum {}
ActionEnum.initEnum(['CHANGE_SCORE', 'MOUSE_MOVE', 'MOUSE_PRESSED', 'KEYBOARD']);
