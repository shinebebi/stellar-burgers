import type { Middleware, MiddlewareAPI } from 'redux';
import type {AppDispatch, RootState, TWsAction} from '../utils/types';

export const socketMiddleware = (wsUrl: string, wsActions: TWsAction): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

        return next => (action: any) => {
            const { dispatch } = store;
            const { type } = action;
            const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;

            if (type === wsInit) {
                socket = new WebSocket(wsUrl);
            }
            if (socket) {
                socket.onopen = event => {
                    dispatch({ type: onOpen, payload: event });
                };
                socket.onerror = event => {
                    dispatch({ type: onError, payload: event });
                };
                socket.onmessage = event => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    dispatch({type: onMessage, payload: parsedData})
                };
                socket.onclose = event => {
                    dispatch({ type: onClose, payload: event });
                };
            }
            next(action);
        };
    }) as Middleware;
};