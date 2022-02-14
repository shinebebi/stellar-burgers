import {constructorReducer} from "./constructor";
import {
    getOrderDetailsAction, getOrderDetailsFailedAction,
    getOrderDetailsSuccessAction,
    modalOrderCloseAction,
    modalOrderOpenAction
} from "../../actions/order-details";
import {addBunAction, addItemAction, deleteItemAction, sortItemItemAction} from "../../actions/burger-constructor";
import { testData } from "../ingredient/ingredients.test";

const state = {
    modalOrderOpen: false,
    orderNumber: 0,
    orderHeader: '',
    isLoading: false,
    hasError: false,

    points: [],
    finalAmount: 0
}

describe('constructor reducer', () => {
    it('should return the initial state', () => {
        expect(constructorReducer(undefined, {})).toEqual(state)
    })
    it('should handle MODAL_ORDER_OPEN', () => {
        const action = modalOrderOpenAction()
        const newState = constructorReducer(state, action)
        expect(newState.modalOrderOpen).toBe(true)
    })
    it('should handle MODAL_ORDER_CLOSE', () => {
        const action = modalOrderCloseAction()
        const newState = constructorReducer(state, action)
        expect(newState.modalOrderOpen).toBe(false)
        expect(newState.orderNumber).toBe(0)
        expect(newState.orderHeader).toBe('')
        expect(newState.isLoading).toBe(false)
        expect(newState.hasError).toBe(false)
    })
    it('should handle GET_ORDER_DETAILS_REQUEST', () => {
        const action = getOrderDetailsAction()
        const newState = constructorReducer(state, action)
        expect(newState.isLoading).toBe(true)
        expect(newState.hasError).toBe(false)
    })
    it('should handle GET_ORDER_DETAILS_SUCCESS', () => {
        const action = getOrderDetailsSuccessAction(1234, 'Example header')
        const newState = constructorReducer(state, action)
        expect(newState.orderNumber).toBe(1234)
        expect(newState.orderHeader).toBe('Example header')
        expect(newState.isLoading).toBe(false)
        expect(newState.points).toStrictEqual([])
        expect(newState.finalAmount).toBe(0)
    })
    it('should handle GET_ORDER_DETAILS_FAILED', () => {
        const action = getOrderDetailsFailedAction()
        const newState = constructorReducer(state, action)
        expect(newState.isLoading).toBe(false)
        expect(newState.hasError).toBe(true)
    })
    it('should handle DELETE_ITEM', () => {
        const action = deleteItemAction(testData, 1329)
        const newState = constructorReducer(state, action)
        expect(newState.points).toBe(testData)
        expect(newState.finalAmount).toBe(state.finalAmount - 1329)
    })
    it('should handle ADD_ITEM', () => {
        const action = addItemAction(testData, 199)
        const newState = constructorReducer(state, action)
        expect(newState.points).toBe(testData)
        expect(newState.finalAmount).toBe(state.finalAmount + 199)
    })
    it('should handle ADD_BUN', () => {
        const action = addBunAction(testData, 1234, 1996)
        const newState = constructorReducer(state, action)
        expect(newState.points).toBe(testData)
        expect(newState.finalAmount).toBe(state.finalAmount - 1234 + 1996)
    })
    it('should handle SORT_ITEMS', () => {
        const action = sortItemItemAction(testData)
        const newState = constructorReducer(state, action)
        expect(newState.points).toBe(testData)
    })
})