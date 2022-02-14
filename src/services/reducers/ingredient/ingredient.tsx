import {TIngredientsActions} from "../../actions/burger-ingredients";
import {
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS, LINK_INGREDIENT_OPEN, MODAL_INGREDIENT_CLOSE,
    MODAL_INGREDIENT_OPEN
} from "../../constants";
import {IIngredient} from "../../../utils/types";
export type TIngredientState = {
    isLoading: boolean,
    hasError: boolean,
    data: Array<IIngredient>,

    modalIngredientOpen: boolean,
    ingredientDetails?: IIngredient,
    linkIngredientOpen: boolean
}

const initialStateIngredient: TIngredientState = {
    isLoading: false,
    hasError: false,
    data: [],

    modalIngredientOpen: false,
    ingredientDetails: undefined,
    linkIngredientOpen: false
}
export const ingredientsReducer = (state = initialStateIngredient, action: TIngredientsActions): TIngredientState => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                isLoading: true,
                hasError: false,
            };
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                data: action.data,
                isLoading: false
            };
        }
        case GET_INGREDIENTS_FAILED: {
            return {
                ...state,
                hasError: true,
                isLoading: false
            };
        }
        case MODAL_INGREDIENT_OPEN: {
            return {
                ...state,
                modalIngredientOpen: true,
                ingredientDetails: action.elemInfo
            }
        }
        case MODAL_INGREDIENT_CLOSE: {
            return {
                ...state,
                modalIngredientOpen: false,
                ingredientDetails: undefined
            }
        }
        case LINK_INGREDIENT_OPEN: {
            return {
                ...state,
                linkIngredientOpen: true,
                ingredientDetails: action.elemInfo
            }
        }
        default: {
            return state
        }
    }
}