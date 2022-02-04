import {
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_PROFILE_ORDERS_START,
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_GET_ORDERS,
    WS_GET_USER_ORDERS,
    WS_CONNECTION_USER_SUCCESS,
    WS_CONNECTION_USER_ERROR,
    WS_CONNECTION_USER_CLOSED
} from '../constants';
import {IOrders} from "../../utils/types";

export interface IWsConnectionSuccess {
    readonly type: typeof WS_CONNECTION_SUCCESS
}

export interface IWsConnectionError {
    readonly type: typeof WS_CONNECTION_ERROR
}

export interface IWsConnectionClosed {
    readonly type: typeof WS_CONNECTION_CLOSED
}

export interface IWsConnectionUserSuccess {
    readonly type: typeof WS_CONNECTION_USER_SUCCESS
}

export interface IWsConnectionUserError {
    readonly type: typeof WS_CONNECTION_USER_ERROR
}

export interface IWsConnectionUserClosed {
    readonly type: typeof WS_CONNECTION_USER_CLOSED
}

export interface IWsGetOrders {
    readonly type: typeof WS_GET_ORDERS
    orders: Array<IOrders>,
    readonly total: number,
    readonly totalToday: number
}

export interface IWsConnectionStart {
    readonly type: typeof WS_CONNECTION_START
}

export interface IWsProfileConnectionStart {
    readonly type: typeof WS_CONNECTION_PROFILE_ORDERS_START
}

export interface IWsGetUserOrders {
    readonly type: typeof WS_GET_USER_ORDERS
    userOrders: Array<IOrders>
}

export type TWsActions =
    | IWsConnectionClosed
    | IWsConnectionError
    | IWsConnectionSuccess
    | IWsGetOrders
    | IWsConnectionStart
    | IWsProfileConnectionStart
    | IWsGetUserOrders
    | IWsConnectionUserClosed
    | IWsConnectionUserError
    | IWsConnectionUserSuccess;

export const wsConnectionSuccess = (): IWsConnectionSuccess => ({
    type: WS_CONNECTION_SUCCESS
});

export const wsConnectionError = (): IWsConnectionError => ({
    type: WS_CONNECTION_ERROR
})

export const wsConnectionClosed = (): IWsConnectionClosed  => ({
    type: WS_CONNECTION_CLOSED
})

export const wsGetOrders = (orders: Array<IOrders>, total: number, totalToday: number): IWsGetOrders => ({
    type: WS_GET_ORDERS,
    orders,
    total,
    totalToday
})

export const wsConnectionStart = (): IWsConnectionStart => ({
    type: WS_CONNECTION_START
})

export const wsProfileConnectionStart = (): IWsProfileConnectionStart => ({
    type: WS_CONNECTION_PROFILE_ORDERS_START
})

export const wsGetUserOrders = (userOrders: Array<IOrders>): IWsGetUserOrders => ({
    type: WS_GET_USER_ORDERS,
    userOrders
})



/*export const wsSendMessage = message => {
    return {
        type: WS_SEND_MESSAGE,
        payload: message
    };
};*/