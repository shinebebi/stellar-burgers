export const getResponseData = (res) => {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
}
export const apiNorma = 'https://norma.nomoreparties.space/api/'