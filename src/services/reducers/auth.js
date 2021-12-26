import {POST_LOGIN_REQUEST, POST_LOGIN_SUCCESS, POST_LOGIN_FAILED, RESET_PASSWORD} from "../actions";
import {POST_LOGOUT_REQUEST, POST_LOGOUT_SUCCESS, POST_LOGOUT_FAILED} from "../actions/logout";
import {GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILED} from "../actions/profile";


const initialStateAuth = {
    name: '',
    email: '',
    password: '',
    isLoading: false,
    hasError: false,
    userAuth: false,
    resetPw: false,
    loginSuccess: false
}

export const authReducer = (state = initialStateAuth, action) => {
    switch (action.type) {
        case POST_LOGIN_REQUEST: {
            return {
                ...state,
                isLoading: true,
                hasError: false
            }
        }
        case POST_LOGIN_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                name: action.name,
                email: action.email,
                loginSuccess: true
            }
        }
        case POST_LOGIN_FAILED: {
            return {
                ...state,
                isLoading: false,
                hasError: true
            }
        } case POST_LOGOUT_REQUEST: {
            return {
                ...state,
                isLoading: true,
                hasError: false
            }
        }
        case POST_LOGOUT_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                name: '',
                email: '',
                password: ''
            }
        }
        case POST_LOGOUT_FAILED: {
            return {
                ...state,
                isLoading: false,
                hasError: true
            }
        }
        case GET_USER_REQUEST: {
            return {
                ...state,
                isLoading: true,
                hasError: false
            }
        } case GET_USER_SUCCESS: {
            return {
                ...state,
                name: action.name,
                email: action.email,
                userAuth: true
            }
        } case GET_USER_FAILED: {
            return {
                isLoading: false,
                hasError: true
            }
        } case RESET_PASSWORD: {
            return {
                resetPw: true
            }
        }
        default: {
            return state
        }
    }
}