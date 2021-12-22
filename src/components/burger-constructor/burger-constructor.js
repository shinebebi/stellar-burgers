import React from 'react'
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
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";

function BurgerConstructor ({onDropHandler}) {
    const dispatch = useDispatch()
    const { modalOrderOpen } = useSelector(state => state.constructorBurger)
    const { name } = useSelector(state => state.auth)
    const navigate = useNavigate()
    return (
        <section className={burgerConstructorStyles.windowConstructor}>
            <Points onDropHandler={onDropHandler}/>
            <div className={burgerConstructorStyles.makeOrder__container}>
                <FinalAmount/>
                <Button type="primary" size="large" onClick={() => dispatch({type: MODAL_ORDER_OPEN})}>
                    Оформить заказ
                </Button>
                {modalOrderOpen && name ?
                    <Modal header='' onClose={() => dispatch({type: MODAL_ORDER_CLOSE})}>
                        <OrderDetails/>
                    </Modal>
                    : navigate('/login')
                }
            </div>
        </section>
    )
}

BurgerConstructor.propTypes = {
    onDropHandler: PropTypes.func.isRequired
}

export default BurgerConstructor