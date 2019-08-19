import { Enum } from 'enumify';

export class ActionEnum extends Enum { }
ActionEnum.initEnum([
    'GET_SCORE',
    'GET_HERO_HEALTH',
    'IS_GAME_OVER',
    'KEYBOARD',
    'MOUSE',
]);
