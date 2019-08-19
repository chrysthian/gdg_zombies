import { ActionEnum } from 'enum/ActionEnum.js';

let initialState = {
    pressed: [],
};

export const keyboard = (state = initialState, action) => {
    switch (action.type) {
    case ActionEnum.KEYBOARD:
        return {
            ...state,
            data: action.payload,
        };
    default:
        return state;
    }
};
