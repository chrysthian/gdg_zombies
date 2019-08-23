import { ActionEnum } from 'enum/ActionEnum.js';

let success = function (payload) {
    return {
        type: ActionEnum.CHANGE_SCORE,
        payload,
    };
};

export function changeScore(payload) {
     return dispatch => {
        dispatch(success( payload ));
    };
}