import React, {FunctionComponent} from 'react'
import {
    Button
} from '@ya.praktikum/react-developer-burger-ui-components'
import burgerConstructorStyles from './burger-constructor.module.css';
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import {FinalAmount} from "./final-amount";
import { useSelector, useDispatch } from 'react-redux';
import {
    MODAL_ORDER_OPEN,
    MODAL_ORDER_CLOSE
} from "../../services/actions/order-details";
import {Points} from "./points";
import {useNavigate} from "react-router-dom";
import {IItemIdd} from "../../pages/constructor/constructor";

export interface IBurgerConstructor {
    onDropHandler: (itemId: IItemIdd) => void;
}

export const BurgerConstructor: FunctionComponent<IBurgerConstructor> = ({onDropHandler}) => {
    const dispatch = useDispatch()
    const { modalOrderOpen } = useSelector((state: any) => state.constructorBurger)
    const { name } = useSelector((state: any) => state.auth)
    const navigate = useNavigate()
    return (
        <section className={burgerConstructorStyles.windowConstructor}>
            <Points onDropHandler={onDropHandler}/>
            <div className={burgerConstructorStyles.makeOrder__container}>
                <FinalAmount/>
                <Button type="primary" size="large" onClick={() => {
                    if (name) {
                        dispatch({type: MODAL_ORDER_OPEN})
                    } else {
                        navigate('/login')
                    }
                }}>
                    Оформить заказ
                </Button>
                {modalOrderOpen &&
                    <Modal header='' onClose={() => {
                        dispatch({type: MODAL_ORDER_CLOSE})
                        navigate('/')
                    }}>
                        <OrderDetails/>
                    </Modal>
                }
            </div>
        </section>
    )
}

export default BurgerConstructor