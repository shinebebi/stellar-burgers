import {apiNorma, getResponseData} from "./index";
import {
    GET_ORDER_DETAILS_FAILED,
    GET_ORDER_DETAILS_REQUEST,
    GET_ORDER_DETAILS_SUCCESS,
    MODAL_ORDER_CLOSE,
    MODAL_ORDER_OPEN
} from '../constants'

import {IAddBunAction, IAddItemAction, IDeleteItemAction, ISortItemsAction} from "./burger-constructor"
import {getCookie} from "../utils";

export interface IModalOrderOpenAction {
    readonly type: typeof MODAL_ORDER_OPEN;
}

export interface IModalOrderCloseAction {
    readonly type: typeof MODAL_ORDER_CLOSE;
}

export interface IGetOrderDetailsAction {
    readonly type: typeof GET_ORDER_DETAILS_REQUEST;
}

export interface IGetOrderDetailsFailedAction {
    readonly type: typeof GET_ORDER_DETAILS_FAILED;
}

export interface IOrderDetailsSuccessAction {
    readonly type: typeof GET_ORDER_DETAILS_SUCCESS;
    readonly orderNumber: number;
    readonly orderHeader: string;
}

export type TConstructorActions =
    | IAddBunAction
    | IAddItemAction
    | IDeleteItemAction
    | ISortItemsAction
    | IModalOrderOpenAction
    | IModalOrderCloseAction
    | IGetOrderDetailsAction
    | IGetOrderDetailsFailedAction
    | IOrderDetailsSuccessAction;

export const modalOrderOpenAction = (): IModalOrderOpenAction => ({
    type: MODAL_ORDER_OPEN
});

export const modalOrderCloseAction = (): IModalOrderCloseAction => ({
    type: MODAL_ORDER_CLOSE
});


export const getOrderDetailsAction = (): IGetOrderDetailsAction => ({
    type: GET_ORDER_DETAILS_REQUEST
});

export const getOrderDetailsFailedAction = (): IGetOrderDetailsFailedAction => ({
    type: GET_ORDER_DETAILS_FAILED
});

export const getOrderDetailsSuccessAction = (orderNumber: number, orderHeader: string): IOrderDetailsSuccessAction => ({
    type: GET_ORDER_DETAILS_SUCCESS,
    orderNumber,
    orderHeader
});
export function getOrderDetails() {
    return function (dispatch: any, getState: any) {
        const { points } = getState().constructorBurger
        const postIngredients: any = []
        points.forEach((point: {_id: string})  => {
            postIngredients.push(point._id)
        })
        dispatch(getOrderDetailsAction());
        // @ts-ignore
        fetch(`${apiNorma}orders`, {
            method: 'POST',
            // @ts-ignore
            headers: {
                'Content-Type': 'application/json',
                authorization: 'Bearer ' + getCookie('token')
            },
            body: JSON.stringify({
                ingredients: postIngredients
            })
        })
            .then(res => getResponseData(res))
            .then(orderInfo => {
                if (orderInfo && orderInfo.success) {
                    dispatch(getOrderDetailsSuccessAction(orderInfo.order.number, orderInfo.name))
                } else {
                    dispatch(getOrderDetailsFailedAction());
                }
            }).catch(err => {
            dispatch(getOrderDetailsFailedAction())
        })
    }
}