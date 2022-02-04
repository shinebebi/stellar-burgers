import {store} from '../index'
import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux'
import {TIngredientsActions} from "../services/actions/burger-ingredients";
import {TConstructorActions} from "../services/actions/order-details";
import {TAuthActions} from "../services/actions/profile";
import {TOrdersActions} from '../services/actions/feed'
import {TWsActions} from "../services/actions/ws";

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

/*export type IOrders = {
    "success": true,
    "orders": [
        {
            "ingredients": [
                "60d3463f7034a000269f45e7",
                "60d3463f7034a000269f45e9",
                "60d3463f7034a000269f45e8",
                "60d3463f7034a000269f45ea"
            ],
            "_id": "",
            "status": "done",
            "number": 0,
            "createdAt": "2021-06-23T14:43:22.587Z",
            "updatedAt": "2021-06-23T14:43:22.603Z"
        }
    ],
    "total": 1,
    "totalToday": 1
}*/

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
export type TApplicationActions = TIngredientsActions | TConstructorActions | TAuthActions | TOrdersActions | TWsActions;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ActionCreator<
    ThunkAction<ReturnType, Action, RootState, TApplicationActions>
    >;