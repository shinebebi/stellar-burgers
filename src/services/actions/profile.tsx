import {apiNorma, getResponseData} from "./index";
import {getCookie, setCookie} from "../utils";
import {refreshToken} from "../api";
import {GET_USER_FAILED, GET_USER_REQUEST, GET_USER_SUCCESS, RESET_PASSWORD} from '../constants'
import {AppDispatch} from "../../utils/types";
import {ILoginAction, ILoginFailedAction, ILoginSuccessAction} from './login'
import {ILogoutAction, ILogoutFailedAction, ILogoutSuccessAction} from './logout'

export interface IPasswordAction {
    readonly type: typeof RESET_PASSWORD
}

export interface IUserAction {
    readonly type: typeof GET_USER_REQUEST;
}

export interface IUserFailedAction {
    readonly type: typeof GET_USER_FAILED;
}

export interface IUserSuccessAction {
    readonly type: typeof GET_USER_SUCCESS;
    readonly email: string;
    readonly name: string;
}

export type TAuthActions =
    | IPasswordAction
    | IUserAction
    | IUserFailedAction
    | IUserSuccessAction
    | ILoginAction
    | ILoginFailedAction
    | ILoginSuccessAction
    | ILogoutAction
    | ILogoutFailedAction
    | ILogoutSuccessAction;

export const userAction = (): IUserAction => ({
    type: GET_USER_REQUEST
});

export const userFailedAction = (): IUserFailedAction => ({
    type: GET_USER_FAILED
});

export const userSuccessAction = (email: string, name: string): IUserSuccessAction => ({
    type: GET_USER_SUCCESS,
    email,
    name
});

export const passwordAction = (): IPasswordAction => ({
    type: RESET_PASSWORD
})


export const getUserInfo = () => {
    return function (dispatch: AppDispatch) {
        dispatch(userAction())
        fetch(`${apiNorma}auth/user`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: 'Bearer ' + getCookie('token')
            }
        })
            .then(res => getResponseData(res))
            .then(data => {
                if (data && data.success) {
                    dispatch(userSuccessAction(data.user.email, data.user.name))
                }
        })
            .catch(err => {
                if (err.message === "jwt expired") {
                    console.log('hi')
                    const refreshData: any = refreshToken()
                    setCookie("refreshToken", refreshData.refreshToken);
                    setCookie("token", refreshData.accessToken);
                }
            })
    }
}
export const patchUserInfo = (name: string, email: string, password: string) => {
    return function (dispatch: AppDispatch) {
        dispatch(userAction())
        fetch(`${apiNorma}auth/user`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                authorization: 'Bearer ' + getCookie('token')
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        })
            .then(res => getResponseData(res))
            .then(data => {
                if (data && data.success) {
                    dispatch(userSuccessAction(data.user.email, data.user.name))
                } else {
                    dispatch(userFailedAction())
                }
            })
            .catch(err => {
                if (err.message === "jwt expired") {
                    const refreshData: any = refreshToken();
                    setCookie("refreshToken", refreshData.refreshToken);
                    setCookie("token", refreshData.accessToken);
                } else {
                    dispatch(userFailedAction())
                }
            })
    }
}