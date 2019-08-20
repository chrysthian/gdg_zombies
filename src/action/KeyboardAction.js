import { ActionEnum } from 'enum/ActionEnum.js';

let success = function (payload) {
    return {
        type: ActionEnum.KEYBOARD,
        payload,
    };
};

export function keyDown(payload) {
     return dispatch => {
        dispatch(success( payload ));
    };
}

export function keyUp(payload) {
    return dispatch => {
        dispatch(success( payload ));
    };
}