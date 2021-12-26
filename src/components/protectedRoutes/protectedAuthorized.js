import {Navigate, useLocation} from 'react-router-dom';
import React from "react";
import {useSelector} from "react-redux";

export function ProtectedAuthorized({ children }) {
    const {userAuth} = useSelector(state => state.auth)
    const location = useLocation();
    return userAuth
        ? children
        : <Navigate
            to="/login"
            replace
            state={{ path: location.pathname }}
        />;
}