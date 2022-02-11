import burgerConstructorStyles from "./burger-constructor.module.css";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import { useSelector } from '../../utils/hooks';
import {FunctionComponent} from "react";

export const FinalAmount: FunctionComponent = () => {
    const { finalAmount } = useSelector((state) => state.constructorBurger)
    return (
        <div className={burgerConstructorStyles.finalPrice}>
            <p className="text text_type_digits-medium">{finalAmount}</p>
            <CurrencyIcon type="primary"/>
        </div>
    )
}