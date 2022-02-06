import {Navigate, useLocation} from 'react-router-dom';
import React, {FC, ReactNode} from "react";
import {useSelector, useDispatch} from '../../utils/hooks'
import {getUserInfo} from "../../services/actions/profile";

interface IProtectedAuthorized {
    children: ReactNode | any
}

export const ProtectedAuthorized: FC<IProtectedAuthorized> = ({ children }) => {
    const {name, userAuth} = useSelector(state => state.auth)
    const location = useLocation();
    const dispatch = useDispatch()
    React.useEffect(() => {
        dispatch(getUserInfo())
    }, [dispatch]);
    return userAuth && name
        ? children
        : <Navigate
            to="/login"
            replace
            state={{ path: location.pathname }}
        />;
}