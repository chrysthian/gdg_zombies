import { ActionEnum } from 'enum/ActionEnum.js';

let success = function (payload) {
    return {
        type: ActionEnum.KEYBOARD,
        payload,
    };
};

export function keyPress(data) {
    return dispatch => {
        dispatch(success({ data }));
    };
}