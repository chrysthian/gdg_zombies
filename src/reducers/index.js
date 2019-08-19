import { combineReducers } from 'redux';
import { keyboard } from './KeyboardReducer';
import { mouse } from './MouseReducer';

export const Reducers = combineReducers({
    keyboard,
    mouse
});