import { getResponseData, apiNorma } from "./index";
import {setCookie} from "../utils";
import {AppDispatch, AppThunk} from "../../utils/types";
import {POST_LOGIN_SUCCESS, POST_LOGIN_FAILED, POST_LOGIN_REQUEST} from "../constants";
import {getIngredientsAction, getIngredientsFailedAction, getIngredientsSuccessAction} from "./burger-ingredients";

export interface ILoginAction {
    readonly type: typeof POST_LOGIN_REQUEST;
}

export interface ILoginFailedAction {
    readonly type: typeof POST_LOGIN_FAILED;
}

export interface ILoginSuccessAction {
    readonly type: typeof POST_LOGIN_SUCCESS;
    readonly email: string;
    readonly name: string;
}

export const loginAction = (): ILoginAction => ({
    type: POST_LOGIN_REQUEST
});

export const loginFailedAction = (): ILoginFailedAction => ({
    type: POST_LOGIN_FAILED
});

export const loginSuccessAction = (email: string, name: string): ILoginSuccessAction => ({
    type: POST_LOGIN_SUCCESS,
    email,
    name
});

function loginRequest (form:{email: string, password: string}, url: string) {
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


export const signIn: AppThunk = (form: {email: string, password: string}, url: string) => (dispatch: AppDispatch) =>{
    dispatch(loginAction())
    loginRequest(form, url)
        .then(res => getResponseData(res))
        .then(data => {
            if (data.success) {
                const authToken = data.accessToken.split('Bearer ')[1]
                const refreshToken = data.refreshToken
                if (authToken && refreshToken) {
                    setCookie('token', authToken);
                    setCookie('refreshToken', refreshToken)
                }
                dispatch(loginSuccessAction(data.user.email, data.user.name))
            } else {
                dispatch(loginFailedAction())
            }
        })
        .catch(err => {
            dispatch(loginFailedAction())
        })
}