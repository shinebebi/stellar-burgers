import React, {FunctionComponent} from 'react'
import {
    Button
} from '@ya.praktikum/react-developer-burger-ui-components'
import burgerConstructorStyles from './burger-constructor.module.css';
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import {FinalAmount} from "./final-amount";
import {useSelector, useDispatch} from '../../utils/hooks'
import {modalOrderOpenAction, modalOrderCloseAction} from "../../services/actions/order-details";
import {Points} from "./points";
import {useNavigate} from "react-router-dom";
import {IItemIdd} from "../../pages/constructor/constructor";

export interface IBurgerConstructor {
    onDropHandler: (itemId: IItemIdd) => void;
}

export const BurgerConstructor: FunctionComponent<IBurgerConstructor> = ({onDropHandler}) => {
    const dispatch = useDispatch()
    const { modalOrderOpen } = useSelector((state) => state.constructorBurger)
    const { name } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    return (
        <section className={burgerConstructorStyles.windowConstructor}>
            <Points onDropHandler={onDropHandler}/>
            <div className={burgerConstructorStyles.makeOrder__container}>
                <FinalAmount/>
                <Button type="primary" size="large" onClick={() => {
                    if (name) {
                        dispatch(modalOrderOpenAction())
                    } else {
                        navigate('/login')
                    }
                }}>
                    Оформить заказ
                </Button>
                {modalOrderOpen &&
                    <Modal header='' onClose={() => {
                        dispatch(modalOrderCloseAction())
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