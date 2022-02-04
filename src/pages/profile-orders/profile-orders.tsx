import React, {FC, ReactNode, useEffect} from "react";
import styles from "./profile-orders.module.css";
import {ProfileTab} from "../../utils/fncs";
import {Orders} from "../../components/orders/orders";
import {useSelector} from "../../utils/hooks";

export const ProfileOrders: FC<ReactNode> = ({children}) => {
    const { userOrders } = useSelector(state => state.ws)
    return (
        <section className={styles.container}>
            <ProfileTab text='В этом разделе вы можете просмотреть свою историю заказов' btn='history'/>
            <Orders link='profile/orders' orders={userOrders}>{children}</Orders>
        </section>
    )
}