import { Enum } from 'enumify';

export class ActionEnum extends Enum { }
ActionEnum.initEnum([
    'CHANGE_SCORE',
    'KEYBOARD',
    'MOUSE_MOVE',
    'MOUSE_PRESSED',
]);
