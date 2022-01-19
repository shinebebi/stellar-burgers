import { getResponseData, apiNorma } from "./index";
import {deleteCookie, getCookie} from "../utils";

export const POST_LOGOUT_REQUEST = 'POST_LOGOUT_REQUEST'
export const POST_LOGOUT_SUCCESS = 'POST_LOGOUT_SUCCESS'
export const POST_LOGOUT_FAILED = 'POST_LOGOUT_FAILED'

export function postLogout() {
    return function (dispatch) {
        dispatch({type: POST_LOGOUT_REQUEST})
        fetch(`${apiNorma}auth/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: getCookie('refreshToken')
            })
        })
            .then(res => getResponseData(res))
            .then(data => {
                if (data && data.success) {
                    dispatch({type: POST_LOGOUT_SUCCESS})
                    deleteCookie('refreshToken')
                    deleteCookie('token')
                } else {
                    dispatch({type: POST_LOGOUT_FAILED})
                }
            })
            .catch(err => {
                dispatch({type: POST_LOGOUT_FAILED})
            })
    }
}