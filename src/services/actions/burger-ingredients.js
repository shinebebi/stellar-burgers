import { getResponseData, apiNorma } from "./index";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST'
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS'
export const GET_INGREDIENTS_FAILED ='GET_INGREDIENTS_FAILED'

export function getIngredients() {
    return function(dispatch) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST
        });
        fetch(`${apiNorma}ingredients`)
            .then(res => getResponseData(res))
            .then(data => {
            if (data && data.success) {
                dispatch({
                    type: GET_INGREDIENTS_SUCCESS,
                    data: data.data
                });
            } else {
                dispatch({
                    type: GET_INGREDIENTS_FAILED
                });
            }
        }).catch(err => {
            dispatch({
                type: GET_INGREDIENTS_FAILED
            })
        })
    };
}