import {IIngredient} from "../../../utils/types";
import {TConstructorActions} from "../../actions/order-details";
import {
    ADD_BUN,
    ADD_ITEM,
    DELETE_ITEM,
    GET_ORDER_DETAILS_FAILED,
    GET_ORDER_DETAILS_REQUEST,
    GET_ORDER_DETAILS_SUCCESS,
    MODAL_ORDER_CLOSE,
    MODAL_ORDER_OPEN, SORT_ITEMS
} from "../../constants";

export type TConstructorState = {
    modalOrderOpen: boolean,
    orderNumber: number,
    orderHeader: string,
    isLoading: boolean,
    hasError: boolean,

    points: Array<IIngredient>,
    finalAmount: number
}

const initialStateConstructor: TConstructorState = {
    modalOrderOpen: false,
    orderNumber: 0,
    orderHeader: '',
    isLoading: false,
    hasError: false,

    points: [],
    finalAmount: 0
}

export const constructorReducer = (state = initialStateConstructor, action: TConstructorActions): TConstructorState => {
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
                orderNumber: 0,
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