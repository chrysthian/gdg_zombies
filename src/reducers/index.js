import { combineReducers } from 'redux';
import { keyboard } from './KeyboardReducer';
import { mouse } from './MouseReducer';
import { score } from './ScoreReducer';

export const Reducers = combineReducers({
  mouse,
  keyboard,
  score
});
