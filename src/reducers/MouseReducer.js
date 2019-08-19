import { ActionEnum } from 'enum/ActionEnum.js';

let initialState = {
    pressed: [],
};

export const mouse = (state = initialState, action) => {
    switch (action.type) {
    case ActionEnum.MOUSE:
        return {
            ...state,
            data: action.payload,
        };
    default:
        return state;
    }
};
