export const getResponseData = (res) => {
    return res.ok
        ? res.json()
        : res.json().then((err) => Promise.reject(err));
}
export const apiNorma = 'https://norma.nomoreparties.space/api/'
export const POST_LOGIN_REQUEST = 'POST_LOGIN_REQUEST'
export const POST_LOGIN_SUCCESS = 'POST_LOGIN_SUCCESS'
export const POST_LOGIN_FAILED = 'POST_LOGIN_FAILED'
export const RESET_PASSWORD = 'RESET_PASSWORD'