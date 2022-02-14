import { combineReducers } from 'redux'

import { authReducer } from "./auth/auth";

import {feedReducer} from "./feed/feed";

import {wsReducer} from "./ws/ws";

import {ingredientsReducer} from "./ingredient/ingredient";

import {constructorReducer} from "./constructor/constructor";


export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    constructorBurger: constructorReducer,
    auth: authReducer,
    feed: feedReducer,
    ws: wsReducer
});