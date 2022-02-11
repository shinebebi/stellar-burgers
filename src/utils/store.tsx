import { applyMiddleware, createStore, compose } from 'redux';
import { rootReducer } from '../services/reducers';
import { socketMiddleware } from '../services/socketMiddleware';
import thunkMiddleware from 'redux-thunk';
import {
    WS_CONNECTION_START, WS_CONNECTION_SUCCESS,
    WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR,
    WS_GET_ORDERS, WS_CONNECTION_PROFILE_ORDERS_START,
    WS_CONNECTION_USER_SUCCESS, WS_CONNECTION_USER_ERROR,
    WS_CONNECTION_USER_CLOSED, WS_GET_USER_ORDERS
} from "../services/constants";

import {getCookie} from "../services/utils";

const wsUrl = 'wss://norma.nomoreparties.space/orders';
const wsActions = {
    wsInit: WS_CONNECTION_START,
    onOpen: WS_CONNECTION_SUCCESS,
    onClose: WS_CONNECTION_CLOSED,
    onError: WS_CONNECTION_ERROR,
    onMessage: WS_GET_ORDERS
};

const wsUserActions = {
    wsUserInit: WS_CONNECTION_PROFILE_ORDERS_START,
    onOpen: WS_CONNECTION_USER_SUCCESS,
    onClose: WS_CONNECTION_USER_CLOSED,
    onError: WS_CONNECTION_USER_ERROR,
    onMessage: WS_GET_USER_ORDERS
}
const composeEnhancers =
    typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;

export const initStore = (initialState = {}) =>
    createStore(
        rootReducer,
        initialState,
        composeEnhancers(applyMiddleware(thunkMiddleware, socketMiddleware(wsUrl, wsActions), socketMiddleware(wsUrl, wsUserActions)))
    );