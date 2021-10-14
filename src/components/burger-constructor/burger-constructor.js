import React from 'react'
import { ConstructorElement, DragIcon, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import burgerConstructorStyles from './burger-constructor.module.css';
import PropTypes from "prop-types";


function BurgerConstructor (props) {
    const points = ["Соус традиционный галактический", "Мясо бессмертных моллюсков Protostomia", "Плоды Фалленианского дерева", "Хрустящие минеральные кольца", "Хрустящие минеральные кольца"]

    const FinalAmount = ({list}) => {
        const finalAmount = (list) => {
            let n = 0
            list.forEach(e => {
                points.forEach(i => {
                    if (i === e.name) {
                        n += e.price
                    }
                })
            })
            return n
        }

        return (
            <div className={burgerConstructorStyles.finalPrice}>
                <p className="text text_type_digits-medium">{finalAmount(list)}</p>
                <CurrencyIcon type="primary"/>
            </div>
        )
    }

    const Points = ({ list }) => {
        const setArguments = (name) => {
            return list.filter(e => e.name === name)[0]
        }

        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div className={burgerConstructorStyles.buns}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={setArguments("Краторная булка N-200i").price}
                        thumbnail={setArguments("Краторная булка N-200i").image}
                    />
                </div>
                <section className={burgerConstructorStyles.constructor_mains}>
                    {points.map(e => (
                        <div>
                            <DragIcon type="primary"/>
                            <ConstructorElement
                                text={e}
                                price={setArguments(e).price}
                                thumbnail={setArguments(e).image}
                            />
                        </div>
                    ))}
                </section>
                <div className={burgerConstructorStyles.buns}>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text="Краторная булка N-200i (низ)"
                        price={setArguments("Краторная булка N-200i").price}
                        thumbnail={setArguments("Краторная булка N-200i").image}
                    />
                </div>
            </div>
        )
    }
    return (
        <section className={burgerConstructorStyles.windowConstructor}>
            <Points list={props.points} />
            <div className={burgerConstructorStyles.makeOrder__container}>
                <FinalAmount list={props.points}/>
                <Button type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </section>
    )
}

BurgerConstructor.propTypes = {
    points: PropTypes.arrayOf(PropTypes.object)
}

export default BurgerConstructor