import { store } from '../../index'
export const GET_FINAL_AMOUNT = 'GET_FINAL_AMOUNT'
export const GET_INITIAL_POINTS = 'GET_POINTS'
export const DELETE_ITEM = 'DELETE_ITEM'
export const ADD_ITEM = 'ADD_ITEM'
export const ADD_BUN = 'ADD_BUN'
export const SORT_ITEMS = 'SORT_ITEMS'
export function getFinalAmount(){
    return function (dispatch) {
        const points = store.getState().constructorBurger.points
        const pricesArray = []
        points.forEach(point => {
            pricesArray.push(point.price)
        })
        //pricesArray.push(points.filter(e => e.type === 'bun')[0].price)
        dispatch({
            type: GET_FINAL_AMOUNT,
            prices: pricesArray
        })
    }
}
