import {wsReducer} from "./ws";
import {
    wsConnectionClosed,
    wsConnectionError,
    wsConnectionSuccess, wsConnectionUserError, wsConnectionUserSuccess,
    wsGetOrders,
    wsGetUserOrders, wsUserConnectionClosed
} from "../../actions/ws";
import {testOrder} from "../feed/feed.test";

const testPayload = {
    total: 12,
    totalToday: 2,
    orders: [testOrder]
}

const state = {
    wsConnected: false,
    orders: [],
    total: 0,
    totalToday: 0,
    userOrders: [],
    wsProfileConnected: false
}

describe('webSocket reducer', () => {
    it('should return the initial state', () => {
        expect(wsReducer(undefined, {})).toEqual(state)
    })
    it('should handle WS_CONNECTION_SUCCESS', () => {
        const action = wsConnectionSuccess()
        const newState = wsReducer(state, action)
        expect(newState.wsConnected).toBe(true)
    })
    it('should handle WS_CONNECTION_ERROR', () => {
        const action = wsConnectionError()
        const newState = wsReducer(state, action)
        expect(newState.wsConnected).toBe(false)
    })
    it('should handle WS_CONNECTION_CLOSED', () => {
        const action = wsConnectionClosed()
        const newState = wsReducer(state, action)
        expect(newState.wsConnected).toBe(false)
    })
    it('should handle WS_GET_ORDERS', () => {
        const action = wsGetOrders(testPayload)
        const newState = wsReducer(state, action)
        expect(newState.totalToday).toBe(2)
        expect(newState.total).toBe(12)
        expect(newState.orders).toStrictEqual([testOrder])
    })
    it('should handle WS_GET_USER_ORDERS', () => {
        const action = wsGetUserOrders(testPayload)
        const newState = wsReducer(state, action)
        expect(newState.userOrders).toStrictEqual([testOrder])
    })
    it('should handle WS_CONNECTION_USER_SUCCESS', () => {
        const action = wsConnectionUserSuccess()
        const newState = wsReducer(state, action)
        expect(newState.wsProfileConnected).toBe(true)
    })
    it('should handle WS_CONNECTION_USER_CLOSED', () => {
        const action = wsUserConnectionClosed()
        const newState = wsReducer(state, action)
        expect(newState.wsProfileConnected).toBe(false)
    })
    it('should handle WS_CONNECTION_USER_ERROR', () => {
        const action = wsConnectionUserError()
        const newState = wsReducer(state, action)
        expect(newState.wsProfileConnected).toBe(false)
    })
})