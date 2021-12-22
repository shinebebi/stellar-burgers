import { Navigate } from 'react-router-dom';
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUserInfo} from "../../services/actions/profile";

export function ProtectedAuthorized({ children }) {
    const [isUserLoaded, setUserLoaded] = React.useState(false)
    const {name} = useSelector(state => state.auth)
    const dispatch = useDispatch()
    React.useEffect(() => {
        dispatch(getUserInfo())
        setUserLoaded(true)
    }, []);
    if (!isUserLoaded) {
        return null;
    }
    return name ? children : <Navigate to="/login"/>;
}