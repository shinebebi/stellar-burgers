import { getResponseData, apiNorma } from "./index";
import {setCookie} from "../utils";

import {POST_LOGIN_SUCCESS, POST_LOGIN_FAILED, POST_LOGIN_REQUEST} from "./index";


function loginRequest (form, url) {
    return fetch(`${apiNorma}${url}`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(form)
    });
}
export function signIn (form, url) {
    return function (dispatch) {
        dispatch({type: POST_LOGIN_REQUEST})
        loginRequest(form, url)
            .then(res => getResponseData(res))
            .then(data => {
                if (data.success) {
                    const authToken = data.accessToken.split('Bearer ')[1]
                    const refreshToken = data.refreshToken
                    console.log(authToken)
                    if (authToken && refreshToken) {
                        setCookie('token', authToken);
                        setCookie('refreshToken', refreshToken)
                    }
                    dispatch({
                        type: POST_LOGIN_SUCCESS,
                        email: data.user.email,
                        name: data.user.name,
                    })
                } else {
                    dispatch({type: POST_LOGIN_FAILED})
                }
            })
            .catch(err => {
                dispatch({type: POST_LOGIN_FAILED})
            })
    }
}