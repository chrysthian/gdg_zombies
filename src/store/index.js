import { createStore, applyMiddleware, compose } from 'redux'
// import logger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { Reducers } from 'reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const Store = createStore(Reducers, composeEnhancers(applyMiddleware(thunkMiddleware /*, logger*/)))
