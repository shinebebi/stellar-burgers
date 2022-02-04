import { applyMiddleware, createStore, compose } from 'redux';
import { rootReducer } from '../services/reducers';
import { socketMiddleware } from '../services/socketMiddleware';
import thunkMiddleware from 'redux-thunk';

import {wsConnectionSuccess, wsConnectionError, wsConnectionClosed, wsConnectionStart} from '../services/actions/ws'
import thunk from "redux-thunk";

const wsUrl = 'wss://norma.nomoreparties.space/orders';

const composeEnhancers =
    typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;

export const initStore = (initialState = {}) =>
    createStore(
        rootReducer,
        initialState,
        composeEnhancers(applyMiddleware(thunkMiddleware, socketMiddleware(wsUrl)))
    );