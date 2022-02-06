import {useSelector, useDispatch} from '../../utils/hooks'
import {useLocation, useParams} from "react-router-dom";
import React, {FC, useEffect} from "react";
import {linkOpenInfoOrderAction} from "../../services/actions/feed";
import style from "./order-info.module.css";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {finalPrice} from "../../utils/fncs";
import { fullArray } from "../../utils/fncs";
import {IIngredient, TElem} from "../../utils/types";
import {wsConnectionStart, wsProfileConnectionStart} from "../../services/actions/ws";

export const OrderInfo: FC = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { order } = useSelector((state) => state.feed)
    const { orders, userOrders } = useSelector(state => state.ws)
    const location = useLocation()
    const { data } = useSelector(state => state.ingredients)
    const countFnc = (elem: IIngredient) => {
        // @ts-ignore
        let count = order.ingredients.filter(function (x: object) {
            return x === elem;
        }).length
        if (elem.type === 'bun') {
            return count + 1
        } else {
            return count
        }
    }

    const OrderIngredient: FC<TElem> = ({elem}) => {
        return (
            <div className={style.ingred_desc}>
                <img src={elem.image} alt={elem.name} className={style.image}/>
                <p className={`text text_type_main-default ${style.ingred_name}`}>{elem.name}</p>
                <div className={style.finalPrice}>
                    <p className="text text_type_digits-default">{countFnc(elem)} x {elem.price}</p>
                    <CurrencyIcon type="primary"/>
                </div>
            </div>
        )
    }
    useEffect(()=> {
        dispatch(wsConnectionStart())
        dispatch(wsProfileConnectionStart())
    }, [])
    useEffect(() => {
        if (location.pathname === `/feed/${id}` && orders !== undefined) {
            const ordersArray: any = fullArray(orders, data)
            dispatch(linkOpenInfoOrderAction(ordersArray.filter((e: any) => e._id === id)[0]))
        } else if (location.pathname === `/profile/orders/${id}` && userOrders !== undefined) {
            const ordersArray: any = fullArray(userOrders, data)
            dispatch(linkOpenInfoOrderAction(ordersArray.filter((e: any) => e._id === id)[0]))
        }
    }, [orders, userOrders])
    return (
        <>
            {order !== undefined && order.ingredients !== undefined &&
                <div className={style.main}>
                    <p className={`text text_type_digits-default ${style.number}`}>#{order.number}</p>
                    <h3 className={`text text_type_main-medium ${style.name}`}>{order.name}</h3>
                    <p className={`text text_type_main-default ${style.status}`}>{order.status}</p>
                    <p className={`text text_type_main-medium ${style.consist}`}>Состав:</p>
                    <div className={style.ingred_container}>
                        {order.ingredients.filter(function(o: any, pos: number) {
                            return order.ingredients.indexOf(o) === pos;
                        }).map((elem: any, index: number) => (
                            <OrderIngredient elem={elem} key={index}/>
                        ))}
                    </div>
                    <div className={style.info}>
                        <p className={`text text_type_main-default text_color_inactive ${style.time}`}>{order.createdAt.slice(0, 10)} {order.createdAt.slice(11, 19)}</p>
                        <div className={style.finalPrice}>
                            <p className="text text_type_digits-default">
                                {finalPrice(order.ingredients)}
                            </p>
                            <CurrencyIcon type="primary"/>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}