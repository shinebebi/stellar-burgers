import React, {FC, ReactNode} from 'react';
import {useSelector, useDispatch} from '../../utils/hooks'
import style from "./orders.module.css"
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
import burgerIngredientsStyles from "../burger-ingredients/burger-ingredients.module.css";
import {infoOrderOpenAction} from '../../services/actions/feed'
import {finalPrice} from "../../utils/fncs";
import {IOrders, TClickOrder, TOrder} from "../../utils/types";
import { fullArray } from "../../utils/fncs";

interface IOrdersElement {
    children: ReactNode,
    link: string,
    orders: Array<IOrders>
}

export const Orders: FC<IOrdersElement> = ({children,link, orders}) => {
    const { modalInfoOrderOpen } = useSelector(state => state.feed)
    const { data } = useSelector(state => state.ingredients)
    const dispatch = useDispatch()
    const ordersArray: any = fullArray(orders, data)

    const Order: FC<TOrder> = ({elem}) => {
        const orderArrayCut = elem.ingredients.slice(0, 6)
        return (
            <Link to={{ pathname: `/${link}/${elem._id}`}} className={burgerIngredientsStyles.link}>
                <div className={style.order__container} onClick={() => dispatch(infoOrderOpenAction(elem))}>
                    <div className={style.info}>
                        <p className="text text_type_digits-default">#{elem.number}</p>
                        <p className={`text text_type_main-default text_color_inactive ${style.date}`}>{elem.createdAt}</p>
                    </div>
                    <h3 className='text text_type_main-medium' style={{marginLeft: 24}}>{elem.name}</h3>
                    <div className={style.desc}>
                        <div className={style.images}>
                            {orderArrayCut.map(function (e: any, index: number) {
                                if (index === 5 && elem.ingredients.length > 6) {
                                    return (
                                        <div className={style.last} key={index}>
                                            <img src={e.image} className={`${style.image}`} alt={e.name} key={index} style={{opacity: 0.3}}/>
                                            <p className={`text text_type_main-default ${style.amt}`}>+{elem.ingredients.length - 6}</p>
                                        </div>
                                    )
                                } else {
                                    return <img src={e.image} className={style.image} alt={e.name} key={index}/>
                                }
                            })}
                        </div>
                        <div className={style.finalPrice}>
                            <p className="text text_type_digits-default">
                                {finalPrice(elem.ingredients)}
                            </p>
                            <CurrencyIcon type="primary"/>
                        </div>
                    </div>
                </div>
            </Link>
        )
    }
    return (
        <div className={style.feed}>
            {ordersArray.map((elem: TClickOrder, index: number) => (
                <Order key={index} elem={elem}/>
            ))}
            {modalInfoOrderOpen && children}
        </div>
    )
}