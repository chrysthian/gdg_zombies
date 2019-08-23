import { ActionEnum } from 'enum/ActionEnum.js';
import Vector3 from 'core/Vector3';

let initialState = {
    pressed: [],
    position: new Vector3(0, 0, 0)
};

export const mouse = (state = initialState, action) => {
    switch (action.type) {
        case ActionEnum.MOUSE_MOVE:
            return {
                ...state,
                position: action.payload
            };
        case ActionEnum.MOUSE_PRESSED:
            return {
                ...state,
                pressed: action.payload
            };
        default:
            return state;
    }
};
