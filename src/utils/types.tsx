import {store} from '../index'
import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux'
import {TIngredientsActions} from "../services/actions/burger-ingredients";
import {TConstructorActions} from "../services/actions/order-details";
import {TAuthActions} from "../services/actions/profile";
import {TOrdersActions} from '../services/actions/feed'
import {TWsActions} from "../services/actions/ws";
import {
    WS_CONNECTION_START, WS_CONNECTION_SUCCESS,
    WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR,
    WS_GET_ORDERS, WS_CONNECTION_PROFILE_ORDERS_START,
    WS_CONNECTION_USER_SUCCESS, WS_CONNECTION_USER_ERROR,
    WS_CONNECTION_USER_CLOSED, WS_GET_USER_ORDERS
} from "../services/constants";

export type IIngredient = {
    _id: string,
    name: string,
    type: string,
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number,
    image: string,
    image_mobile: string,
    image_large: string,
    __v: string
};

export type IOrders = {
    ingredients: Array<string>,
    _id: string,
    status: string,
    number: number,
    name: string
    createdAt: string,
    updatedAt: string
}
type TIngredients = {
    ingredients: Array<IIngredient>
}
export type TClickOrder = Omit<IOrders, 'ingredients'> & TIngredients;
export type TElem = {
    elem: IIngredient
};
export type TOrder = {
    elem: TClickOrder
}

export interface TWsAction {
    wsInit: typeof WS_CONNECTION_PROFILE_ORDERS_START | typeof WS_CONNECTION_START,
    onOpen: typeof WS_CONNECTION_SUCCESS | typeof WS_CONNECTION_USER_SUCCESS,
    onClose: typeof WS_CONNECTION_CLOSED | typeof WS_CONNECTION_USER_CLOSED,
    onError: typeof WS_CONNECTION_ERROR | typeof WS_CONNECTION_USER_ERROR,
    onMessage: typeof WS_GET_USER_ORDERS | typeof WS_GET_ORDERS
}

export type TApplicationActions = TIngredientsActions | TConstructorActions | TAuthActions | TOrdersActions | TWsActions;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ActionCreator<
    ThunkAction<ReturnType, Action, RootState, TApplicationActions>
    >;