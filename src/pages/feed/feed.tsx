import React, {FC, ReactNode, useEffect} from 'react';
import {useSelector, useDispatch} from '../../utils/hooks'
import style from "./feed.module.css"
import {Orders} from "../../components/orders/orders";
import {Done} from "../../components/done/done";
import {wsConnectionClosed, wsConnectionStart} from "../../services/actions/ws";
import {useLocation} from "react-router-dom";

export const FeedPage: FC<ReactNode> = ({children}) => {
    const {orders, wsConnected} = useSelector(state => state.ws)
    const location = useLocation()
    const dispatch = useDispatch()
    useEffect(()=> {
        if (location.pathname === '/feed') {
            dispatch(wsConnectionStart())
        } else {
            dispatch(wsConnectionClosed())
        }
    }, [])
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