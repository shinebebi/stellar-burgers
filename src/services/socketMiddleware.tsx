import type { Middleware, MiddlewareAPI } from 'redux';
import {wsGetOrders, wsGetUserOrders} from "./actions/ws";
import type { AppDispatch, RootState } from '../utils/types';
import {getCookie} from "./utils";

export const socketMiddleware = (wsUrl: string): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;
        let socket2: WebSocket | null = null;

        return next => (action: any) => {
            const { dispatch } = store;
            const { type } = action;

            if (type === 'WS_CONNECTION_START') {
                socket = new WebSocket(`${wsUrl}/all`);
            }
            if (socket) {
                socket.onopen = event => {
                    dispatch({ type: 'WS_CONNECTION_SUCCESS', payload: event });
                };
                socket.onerror = event => {
                    dispatch({ type: 'WS_CONNECTION_ERROR', payload: event });
                };
                socket.onmessage = event => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    dispatch(wsGetOrders(parsedData.orders, parsedData.total, parsedData.totalToday))
                };
                socket.onclose = event => {
                    dispatch({ type: 'WS_CONNECTION_CLOSED', payload: event });
                };
            }
            if (type === 'WS_CONNECTION_PROFILE_ORDERS_START') {
                socket2 = new WebSocket(`${wsUrl}?token=${getCookie('token')}`);
            }
            if (socket2) {
                socket2.onopen = event => {
                    dispatch({ type: 'WS_CONNECTION_USER_SUCCESS', payload: event });
                };
                socket2.onerror = event => {
                    dispatch({ type: 'WS_CONNECTION_USER_ERROR', payload: event });
                };
                socket2.onmessage = event => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    const orders =  parsedData.orders.reverse()
                    dispatch(wsGetUserOrders(orders))
                };
                socket2.onclose = event => {
                    dispatch({ type: 'WS_CONNECTION_USER_CLOSED', payload: event });
                };
            }
            next(action);
        };
    }) as Middleware;
};