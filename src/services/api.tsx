import {apiNorma, getResponseData} from "./actions";
import {getCookie} from "./utils";

export const emailRequest = (email: string) => {
    return fetch(`${apiNorma}password-reset`, {
        method: 'POST',
        /*mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',*/
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({
            email: email
        })
    })
        .then(res => getResponseData(res))
};

export const passwordReset = (password: string, token: string) => {
    return fetch(`${apiNorma}password-reset/reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({
            password: password,
            token: token
        })
    })
        .then(res => getResponseData(res))
};

export const refreshToken = () => {
    return fetch(`${apiNorma}auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            token: 'Bearer ' + getCookie('refreshToken'),
        }),
    }).then(getResponseData);
};




