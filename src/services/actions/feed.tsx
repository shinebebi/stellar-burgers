import {
    GET_ORDERS_FAILED,
    GET_ORDERS_REQUEST,
    GET_ORDERS_SUCCESS,
    LINK_OPEN_INFO_ORDER,
    MODAL_INFO_ORDER_CLOSE,
    MODAL_INFO_ORDER_OPEN
} from "../constants";
import { TClickOrder } from "../../utils/types";
import {apiNorma, getResponseData} from "./index";

/*export interface IGetOrdersAction {
    readonly type: typeof GET_ORDERS_REQUEST;
}

export interface IGetOrdersFailedAction {
    readonly type: typeof GET_ORDERS_FAILED;
}

export interface IGetOrdersSuccessAction {
    readonly type: typeof GET_ORDERS_SUCCESS;
    readonly orders: Array<IOrders>;
    readonly total: number;
    readonly totalToday: number;
}*/

export interface IInfoOrderOpenAction {
    readonly type: typeof MODAL_INFO_ORDER_OPEN;
    readonly order: TClickOrder
}

export interface IInfoOrderCloseAction {
    readonly type: typeof MODAL_INFO_ORDER_CLOSE
}

export interface ILinkOpenInfoOrderAction {
    readonly type: typeof LINK_OPEN_INFO_ORDER;
    readonly order: TClickOrder
}

export type TOrdersActions =
    | IInfoOrderOpenAction
    | IInfoOrderCloseAction
    | ILinkOpenInfoOrderAction;

/*export const getOrdersAction = (): IGetOrdersAction => ({
    type: GET_ORDERS_REQUEST
});

export const getOrdersFailedAction = (): IGetOrdersFailedAction => ({
    type: GET_ORDERS_FAILED
});

export const getOrdersSuccessAction = (orders: Array<IOrders>, total: number, totalToday: number): IGetOrdersSuccessAction => ({
    type: GET_ORDERS_SUCCESS,
    orders,
    total,
    totalToday
});*/

export const infoOrderOpenAction = (order: TClickOrder): IInfoOrderOpenAction => ({
    type: MODAL_INFO_ORDER_OPEN,
    order
})

export const infoOrderCloseAction = (): IInfoOrderCloseAction => ({
    type: MODAL_INFO_ORDER_CLOSE
})

export const linkOpenInfoOrderAction = (order: TClickOrder): ILinkOpenInfoOrderAction => ({
    type: LINK_OPEN_INFO_ORDER,
    order
})

/*export const getOrders: AppThunk = () => (dispatch: AppDispatch) => {
    dispatch(getOrdersAction())
    fetch(`${apiNorma}orders/all`)
        .then(res => getResponseData(res))
        .then(data => {
            if (data && data.success) {
                dispatch(getOrdersSuccessAction(data.orders, data.total, data.totalToday));
            } else {
                dispatch(getOrdersFailedAction());
            }
        }).catch(err => {
        dispatch(getOrdersFailedAction())
    })
}*/