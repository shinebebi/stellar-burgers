import React, {FC} from 'react';
import {useSelector} from '../../utils/hooks'
import style from "./done.module.css"

export const Done: FC = () => {
    const { orders, total, totalToday } = useSelector(state => state.ws)
    let done: number[] = []
    let a: number[] = []
    // @ts-ignore
    orders.forEach((o: any) => {
        if (o.status !== 'done') {
            a.push(o.number)
        } else if (o.status === 'done') {
            done.push(o.number)
        }
    })
    return (
        <section className={style.main}>
            <div className={style.orders_id__container}>
                <div className={style.list__container}>
                    <h3 className="text text_type_main-medium">Готовы:</h3>
                    <div className={style.orders_id}>
                        {done.map((elem: number, index: number) => (
                            <p className="text text_type_digits-default" style={{color: '#00CCCC'}} key={index}>{elem}</p>
                        ))}
                    </div>
                </div>
                <div className={style.list__container}>
                    <h3 className="text text_type_main-medium">В работе:</h3>
                    <div className={style.orders_id}>
                        {a.map((elem: number, index: number) => (
                            <p className="text text_type_digits-default" key={index}>{elem}</p>
                        ))}
                    </div>
                </div>
            </div>
            <div className={style.dones_num}>
                <h3 className="text text_type_main-medium">Выполнено за все время:</h3>
                <p className={`text text_type_digits-large ${style.num}`}>{total}</p>
            </div>
            <div className={style.dones_num}>
                <h3 className="text text_type_main-medium">Выполнено за сегодня:</h3>
                <p className={`text text_type_digits-large ${style.num}`}>{totalToday}</p>
            </div>
        </section>
    )
}