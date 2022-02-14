import {feedReducer} from "./feed";
import {infoOrderCloseAction, infoOrderOpenAction, linkOpenInfoOrderAction} from "../../actions/feed";
let state = {
    order: undefined,
    modalInfoOrderOpen: false,
    linkInfoOrderOpen: false
}
export const testOrder = {
    createdAt: "2022-02-09T15:56:00.422Z",
    ingredients: [{
        calories: 420,
        carbohydrates: 53,
        fat: 24,
        image: "https://code.s3.yandex.net/react/code/bun-02.png",
        image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
        image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
        name: "Краторная булка N-200i",
        price: 1255,
        proteins: 80,
        type: "bun",
        __v: 0,
        _id: "60d3b41abdacab0026a733c6",
    }],
    name: "Space краторный бургер",
    number: 9829,
    status: "done",
    updatedAt: "2022-02-09T15:56:00.735Z",
    _id: "6203e4106d7cd8001b2d4f20"
}
describe('feed reducer', () => {
    it('should return the initial state', () => {
        expect(feedReducer(undefined, {})).toEqual(state)
    })
    it('should handle MODAL_INFO_ORDER_OPEN', () => {
        let action = infoOrderOpenAction(testOrder)
        let newState = feedReducer(state, action)
        expect(newState.order).toBe(testOrder)
        expect(newState.modalInfoOrderOpen).toBe(true)
    })
    it('should handle MODAL_INFO_ORDER_CLOSE', () => {
        let action = infoOrderCloseAction()
        let newState = feedReducer(state, action)
        expect(newState.modalInfoOrderOpen).toBe(false)
    })
    it('should handle LINK_OPEN_INFO_ORDER', () => {
        let action = linkOpenInfoOrderAction(testOrder)
        let newState = feedReducer(state, action)
        expect(newState.order).toBe(testOrder)
        expect(newState.linkInfoOrderOpen).toBe(true)
    })
})