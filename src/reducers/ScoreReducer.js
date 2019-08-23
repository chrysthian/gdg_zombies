import { ActionEnum } from 'enum/ActionEnum.js';

let initialState = { score: 0 };

export const score = (state = initialState, action) => {
  switch (action.type) {
    case ActionEnum.CHANGE_SCORE:
      return {
        ...state,
        score: action.payload
      };
    default:
      return state;
  }
};
