import { createStore, compose, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { gameReducer } from './reducer'
import { watchGameActions } from './sagas'
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

const saga = createSagaMiddleware()

export const store = createStore(gameReducer, composeEnhancers(applyMiddleware(saga)))

saga.run(watchGameActions)
