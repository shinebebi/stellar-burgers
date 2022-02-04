export const getResponseData = (res: any) => {
    return res.ok
        ? res.json()
        : res.json().then((err: any) => Promise.reject(err));
}
export const apiNorma = 'https://norma.nomoreparties.space/api/'