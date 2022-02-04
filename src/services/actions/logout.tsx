import { getResponseData, apiNorma } from "./index";
import {deleteCookie, getCookie} from "../utils";
import {AppDispatch} from "../../utils/types";
import {POST_LOGOUT_REQUEST, POST_LOGOUT_SUCCESS, POST_LOGOUT_FAILED} from '../constants'

export interface ILogoutAction {
    readonly type: typeof POST_LOGOUT_REQUEST;
}

export interface ILogoutFailedAction {
    readonly type: typeof POST_LOGOUT_FAILED;
}

export interface ILogoutSuccessAction {
    readonly type: typeof POST_LOGOUT_SUCCESS;
}

export const logoutAction = (): ILogoutAction => ({
    type: POST_LOGOUT_REQUEST
});

export const logoutFailedAction = (): ILogoutFailedAction => ({
    type: POST_LOGOUT_FAILED
});

export const logoutSuccessAction = (): ILogoutSuccessAction => ({
    type: POST_LOGOUT_SUCCESS
});
export function postLogout() {
    return function (dispatch: AppDispatch) {
        dispatch(logoutAction())
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
                    dispatch(logoutSuccessAction())
                    deleteCookie('refreshToken')
                    deleteCookie('token')
                } else {
                    dispatch(logoutFailedAction())
                }
            })
            .catch(err => {
                dispatch(logoutFailedAction())
            })
    }
}