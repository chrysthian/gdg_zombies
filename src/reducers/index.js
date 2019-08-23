import { combineReducers } from 'redux';
import { mouse } from './MouseReducer';
import { score } from './ScoreReducer';

export const Reducers = combineReducers({
    mouse,
    score,
});