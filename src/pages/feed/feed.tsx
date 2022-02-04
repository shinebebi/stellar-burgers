import React, {FC, ReactNode} from 'react';
import {useSelector} from '../../utils/hooks'
import style from "./feed.module.css"
import {Orders} from "../../components/orders/orders";
import {Done} from "../../components/done/done";

export const FeedPage: FC<ReactNode> = ({children}) => {
    const {orders, wsConnected} = useSelector(state => state.ws)
    return (
        <section>
            <h2 className={`text text_type_main-large ${style.header}`}>Лента заказов</h2>
            {!wsConnected && 'Произошла ошибка'}
            {// @ts-ignore
                wsConnected && orders.length &&
                <div className={style.main}>
                    <Orders link='feed' orders={orders}>{children}</Orders>
                    <Done/>
                </div>
            }
        </section>
    )
}