import React, {FC, ReactNode, useEffect} from "react";
import styles from "./profile-orders.module.css";
import {ProfileTab} from "../../components/profile-tab/profile-tab";
import {Orders} from "../../components/orders/orders";
import {useSelector, useDispatch} from "../../utils/hooks";
import {wsProfileConnectionStart, wsUserConnectionClosed} from "../../services/actions/ws";
import {useLocation} from "react-router-dom";

export const ProfileOrders: FC<ReactNode> = ({children}) => {
    const { userOrders } = useSelector(state => state.ws)
    const dispatch = useDispatch()
    const location = useLocation()
    useEffect(() => {
        if (location.pathname === '/profile/orders') {
            dispatch(wsProfileConnectionStart());
        } else {
            dispatch(wsUserConnectionClosed())
        }
    }, [])
    return (
        <section className={styles.container}>
            <ProfileTab text='В этом разделе вы можете просмотреть свою историю заказов' btn='history'/>
            <Orders link='profile/orders' orders={userOrders}>{children}</Orders>
        </section>
    )
}