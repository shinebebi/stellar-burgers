import { getResponseData, apiNorma } from "./index";
import {getCookie, setCookie} from "../utils";
import {refreshToken} from "../api";

export const GET_USER_REQUEST = 'GET_USER_REQUEST'
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS'
export const GET_USER_FAILED ='GET_USER_FAILED'


export const getUserInfo = () => {
    return function (dispatch) {
        dispatch({type: GET_USER_REQUEST})
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
                    dispatch({
                        type: GET_USER_SUCCESS,
                        name: data.user.name,
                        email: data.user.email
                    })
                }
        })
            .catch(err => {
                if (err.message === "jwt expired") {
                    console.log('hi')
                    const refreshData = refreshToken()
                    setCookie("refreshToken", refreshData.refreshToken);
                    setCookie("token", refreshData.accessToken);
                    getUserInfo()
                }
            })
    }
}
export const patchUserInfo = (name, email, password) => {
    return function (dispatch) {
        dispatch({type: GET_USER_REQUEST})
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
                    dispatch({
                        type: GET_USER_SUCCESS,
                        name: data.user.name,
                        email: data.user.email
                    })
                } else {
                    dispatch({type: GET_USER_FAILED})
                }
            })
            .catch(err => {
                if (err.message === "jwt expired") {
                    const refreshData = refreshToken();
                    console.log(refreshData)// обновляем токен; пытаемся 1 раз, если не сложилось -- падаем с ошибкой
                    setCookie("refreshToken", refreshData.refreshToken);
                    setCookie("token", refreshData.accessToken); // тут для примера accessToken храним в куке
                    getUserInfo()
                    /*options.headers ??= {} // если в переданных опциях не было хедеров, добавляем в options пустой объект по ключу headers
                    options.headers.authorization = refreshData.accessToken;
                    const res = await fetch(url, options); // повторяем оригинальный запрос с оригинальными options (+ дополнительным хедером)
                    return await getResponseData(res); // если все равно проваливаемся -- значит не судьба :/*/
                } else {
                    dispatch({type: GET_USER_FAILED})
                }
            })
    }
}