import {apiNorma, getResponseData} from "./index";
import {
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    LINK_INGREDIENT_OPEN,
    MODAL_INGREDIENT_CLOSE,
    MODAL_INGREDIENT_OPEN
} from '../constants'
import {AppDispatch, AppThunk, IIngredient} from "../../utils/types";

export interface IModalOpenAction {
    readonly type: typeof MODAL_INGREDIENT_OPEN;
    readonly elemInfo: IIngredient;
}

export interface IModalCloseAction {
    readonly type: typeof MODAL_INGREDIENT_CLOSE;
}

export interface ILinkOpenAction {
    readonly type: typeof LINK_INGREDIENT_OPEN;
    readonly elemInfo: any;
}

export interface IGetIngredientsAction {
    readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsFailedAction {
    readonly type: typeof GET_INGREDIENTS_FAILED;
}

export interface IGetIngredientsSuccessAction {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
    readonly data: Array<IIngredient>;
}

export type TIngredientsActions =
    | ILinkOpenAction
    | IGetIngredientsAction
    | IGetIngredientsFailedAction
    | IModalOpenAction
    | IGetIngredientsSuccessAction
    | IModalCloseAction;

export const modalOpenAction = (elemInfo: IIngredient): IModalOpenAction => ({
    type: MODAL_INGREDIENT_OPEN,
    elemInfo
});

export const modalCloseAction = (): IModalCloseAction => ({
    type: MODAL_INGREDIENT_CLOSE
});

export const linkOpenAction = (elemInfo: IIngredient): ILinkOpenAction => ({
    type: LINK_INGREDIENT_OPEN,
    elemInfo
});

export const getIngredientsAction = (): IGetIngredientsAction => ({
    type: GET_INGREDIENTS_REQUEST
});

export const getIngredientsFailedAction = (): IGetIngredientsFailedAction => ({
    type: GET_INGREDIENTS_FAILED
});

export const getIngredientsSuccessAction = (data: Array<IIngredient>): IGetIngredientsSuccessAction => ({
    type: GET_INGREDIENTS_SUCCESS,
    data
});

export const getIngredients: AppThunk = () => (dispatch: AppDispatch) => {
    dispatch(getIngredientsAction())
    fetch(`${apiNorma}ingredients`)
        .then(res => getResponseData(res))
        .then(data => {
        if (data && data.success) {
            dispatch(getIngredientsSuccessAction(data.data));
        } else {
            dispatch(getIngredientsFailedAction());
        }
    }).catch(err => {
        dispatch(getIngredientsFailedAction())
    })
}