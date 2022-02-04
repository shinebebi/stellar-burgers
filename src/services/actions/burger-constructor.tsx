import {IIngredient} from "../../utils/types";
import {ADD_BUN, ADD_ITEM, DELETE_ITEM, SORT_ITEMS} from '../constants/index'

export interface IAddBunAction {
    readonly type: typeof ADD_BUN;
    readonly points: Array<IIngredient>;
    readonly prevBun: number;
    readonly currentBun: number;
}
export interface IAddItemAction {
    readonly type: typeof ADD_ITEM;
    readonly points: Array<IIngredient>;
    readonly price: number
}
export interface IDeleteItemAction {
    readonly type: typeof DELETE_ITEM;
    readonly points: Array<IIngredient>;
    readonly price: number
}
export interface ISortItemsAction {
    readonly type: typeof SORT_ITEMS;
    readonly points: Array<IIngredient>;
}

export const addBunAction = (points: Array<IIngredient>, prevBun: number, currentBun: number): IAddBunAction => ({
    type: ADD_BUN,
    points,
    prevBun,
    currentBun
});

export const addItemAction = (points: Array<IIngredient>, price: number): IAddItemAction => ({
    type: ADD_ITEM,
    points,
    price
});

export const deleteItemAction = (points: Array<IIngredient>, price: number): IDeleteItemAction => ({
    type: DELETE_ITEM,
    points,
    price
});

export const sortItemItemAction = (points: Array<IIngredient>): ISortItemsAction => ({
    type: SORT_ITEMS,
    points
});