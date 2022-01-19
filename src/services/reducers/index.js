import { combineReducers } from 'redux'

import { authReducer } from "./auth";

import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED
} from '../actions/burger-ingredients'
import {
    MODAL_INGREDIENT_OPEN,
    MODAL_INGREDIENT_CLOSE, LINK_INGREDIENT_OPEN
} from '../actions/ingredient-details'
import {
    MODAL_ORDER_OPEN,
    MODAL_ORDER_CLOSE,
    GET_ORDER_DETAILS_SUCCESS,
    GET_ORDER_DETAILS_REQUEST,
    GET_ORDER_DETAILS_FAILED
} from "../actions/order-details";
import {
    DELETE_ITEM,
    ADD_ITEM,
    ADD_BUN, SORT_ITEMS
} from "../actions/burger-constructor";

const initialStateIngredient = {
    isLoading: false,
    hasError: false,
    data: [],

    modalIngredientOpen: false,
    ingredientDetails: {},
    linkIngredientOpen: false
}

const initialStateConstructor = {
    modalOrderOpen: false,
    orderNumber: null,
    orderHeader: '',
    isLoading: false,
    hasError: false,

    points: [],
    finalAmount: 0
}

export const ingredientsReducer = (state = initialStateIngredient, action) => {
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
                ingredientDetails: {}
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

export const constructorReducer = (state = initialStateConstructor, action) => {
    switch (action.type) {
        case MODAL_ORDER_OPEN: {
            return {
                ...state,
                modalOrderOpen: true
            }
        }
        case MODAL_ORDER_CLOSE: {
            return {
                ...state,
                modalOrderOpen: false,
                orderNumber: null,
                orderHeader: '',
                isLoading: false,
                hasError: false
            }
        }
        case GET_ORDER_DETAILS_REQUEST: {
            return {
                ...state,
                isLoading: true,
                hasError: false,
            };
        }
        case GET_ORDER_DETAILS_SUCCESS: {
            return {
                ...state,
                orderNumber: action.orderNumber,
                orderHeader: action.orderHeader,
                isLoading: false,
                points: [],
                finalAmount: 0
            };
        }
        case GET_ORDER_DETAILS_FAILED: {
            return {
                ...state,
                hasError: true,
                isLoading: false
            };
        }
        case DELETE_ITEM: {
            return {
                ...state,
                points: action.points,
                finalAmount: state.finalAmount - action.price
            };
        }
        case ADD_ITEM: {
            return {
                ...state,
                points: action.points,
                finalAmount: state.finalAmount + action.price
            }
        }
        case ADD_BUN: {
            return {
                ...state,
                points: action.points,
                finalAmount: state.finalAmount - action.prevBun + action.currentBun
            }
        }
        case SORT_ITEMS: {
            return {
                ...state,
                points: action.points
            }
        }
        default: {
            return state
        }
    }
}


export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    constructorBurger: constructorReducer,
    auth: authReducer
});