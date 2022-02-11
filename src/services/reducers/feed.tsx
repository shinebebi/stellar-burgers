import {
    GET_ORDERS_FAILED,
    GET_ORDERS_REQUEST,
    GET_ORDERS_SUCCESS,
    MODAL_INFO_ORDER_CLOSE,
    MODAL_INFO_ORDER_OPEN,
    LINK_OPEN_INFO_ORDER
} from "../constants";
import { TClickOrder } from "../../utils/types";
import {TOrdersActions} from "../actions/feed";

export type TFeedState = {
    order?: TClickOrder,
    modalInfoOrderOpen: boolean,
    linkInfoOrderOpen: boolean
}


const initialStateFeed: TFeedState = {
    order: undefined,
    modalInfoOrderOpen: false,
    linkInfoOrderOpen: false
}

export const feedReducer = (state = initialStateFeed, action: TOrdersActions): TFeedState => {
    switch (action.type) {
        case MODAL_INFO_ORDER_OPEN: {
            return {
                ...state,
                modalInfoOrderOpen: true,
                order: action.order
            }
        }
        case MODAL_INFO_ORDER_CLOSE: {
            return {
                ...state,
                modalInfoOrderOpen: false
            }
        }
        case LINK_OPEN_INFO_ORDER: {
            return {
                ...state,
                order: action.order,
                linkInfoOrderOpen: true
            }
        }
        default: {
            return state
        }
    }
}