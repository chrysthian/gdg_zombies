import { ActionEnum } from 'enum/ActionEnum.js';

let initialState = { value: 0 };

export const score = (state = initialState, action) => {
  switch (action.type) {
    case ActionEnum.CHANGE_SCORE:
      return {
        ...state,
        value: action.payload
      };
    default:
      return state;
  }
};
