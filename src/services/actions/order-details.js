import { store } from '../../index'
import { getResponseData, apiNorma } from "./index";

export const MODAL_ORDER_OPEN = 'MODAL_ORDER_OPEN'
export const MODAL_ORDER_CLOSE = 'MODAL_ORDER_CLOSE'
export const GET_ORDER_DETAILS_REQUEST = 'GET_ORDER_DETAILS_REQUEST'
export const GET_ORDER_DETAILS_SUCCESS = 'GET_ORDER_DETAILS_SUCCESS'
export const GET_ORDER_DETAILS_FAILED ='GET_ORDER_DETAILS_FAILED'
export function getOrderDetails() {
    const points = store.getState().constructorBurger.points
    const postIngredients = []
    points.forEach(point => {
        postIngredients.push(point._id)
    })
    return function (dispatch) {
        dispatch({
            type: GET_ORDER_DETAILS_REQUEST
        });
        fetch(`${apiNorma}orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ingredients: postIngredients
            })
        })
            .then(res => getResponseData(res))
            .then(orderInfo => {
                if (orderInfo && orderInfo.success) {
                    dispatch({
                        type: GET_ORDER_DETAILS_SUCCESS,
                        orderNumber: orderInfo.order.number,
                        orderHeader: orderInfo.name
                    });
                } else {
                    dispatch({
                        type: GET_ORDER_DETAILS_FAILED
                    });
                }
            }).catch(err => {
            dispatch({
                type: GET_ORDER_DETAILS_FAILED
            })
        })
    }
}