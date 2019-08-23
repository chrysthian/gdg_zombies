import { ActionEnum } from 'enum/ActionEnum.js';

let success = function (type, payload) {
    return {
        type,
        payload,
    };
};


export function mouseMove(payload) {
    return dispatch => {
        dispatch(success(ActionEnum.MOUSE_MOVE, payload));
    };
}

export function mouseDown(payload) {
    return dispatch => {
        dispatch(success(ActionEnum.MOUSE_PRESSED, payload));
    };
}

export function mouseUp(payload) {
    return dispatch => {
        dispatch(success(ActionEnum.MOUSE_PRESSED, payload));
    };
}