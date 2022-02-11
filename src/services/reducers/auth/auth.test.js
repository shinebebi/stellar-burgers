import {authReducer} from './auth'
import {loginAction, loginFailedAction, loginSuccessAction} from "../../actions/login";
import {logoutAction, logoutFailedAction, logoutSuccessAction} from "../../actions/logout";
import {passwordAction, userAction, userFailedAction, userSuccessAction} from "../../actions/profile";
let state = {
    name: '',
    email: '',
    password: '',
    isLoading: false,
    hasError: false,
    userAuth: false,
    resetPw: false,
    loginSuccess: false
}
describe('authorization reducer', () => {
    it('should return the initial state', () => {
        expect(authReducer(undefined, {})).toEqual(state)
    })
    it('should handle POST_LOGIN_REQUEST', () => {
        let action = loginAction()
        let newState = authReducer(state, action)
        expect(newState.isLoading).toBe(true)
        expect(newState.hasError).toBe(false)
    })
    it('should handle POST_LOGIN_SUCCESS', () => {
        let action = loginSuccessAction('example@gmail.com', 'example')
        let newState = authReducer(state, action)
        expect(newState.isLoading).toBe(false)
        expect(newState.name).toBe('example')
        expect(newState.email).toBe('example@gmail.com')
        expect(newState.loginSuccess).toBe(true)
    })
    it('should handle POST_LOGIN_FAILED', () => {
        let action = loginFailedAction()
        let newState = authReducer(state, action)
        expect(newState.isLoading).toBe(false)
        expect(newState.hasError).toBe(true)
    })
    it('should handle POST_LOGOUT_REQUEST', () => {
        let action = logoutAction()
        let newState = authReducer(state, action)
        expect(newState.isLoading).toBe(true)
        expect(newState.hasError).toBe(false)
    })
    it('should handle POST_LOGOUT_SUCCESS', () => {
        let action = logoutSuccessAction()
        let newState = authReducer(state, action)
        expect(newState.isLoading).toBe(false)
        expect(newState.name).toBe('')
        expect(newState.email).toBe('')
        expect(newState.password).toBe('')
    })
    it('should handle POST_LOGOUT_FAILED', () => {
        let action = logoutFailedAction()
        let newState = authReducer(state, action)
        expect(newState.isLoading).toBe(false)
        expect(newState.hasError).toBe(true)
    })
    it('should handle GET_USER_REQUEST', () => {
        let action = userAction()
        let newState = authReducer(state, action)
        expect(newState.isLoading).toBe(true)
        expect(newState.hasError).toBe(false)
    })
    it('should handle GET_USER_SUCCESS', () => {
        let action = userSuccessAction('example@gmail.com', 'example')
        let newState = authReducer(state, action)
        expect(newState.name).toBe('example')
        expect(newState.email).toBe('example@gmail.com')
        expect(newState.userAuth).toBe(true)
    })
    it('should handle GET_USER_FAILED', () => {
        let action = userFailedAction()
        let newState = authReducer(state, action)
        expect(newState.isLoading).toBe(false)
        expect(newState.hasError).toBe(true)
    })
    it('should handle RESET_PASSWORD', () => {
        let action = passwordAction()
        let newState = authReducer(state, action)
        expect(newState.resetPw).toBe(true)
    })
})