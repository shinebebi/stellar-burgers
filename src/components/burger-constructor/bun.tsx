import burgerConstructorStyles from "./burger-constructor.module.css";
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {FunctionComponent} from 'react'
import {IIngredient} from "../../utils/types";
type TBunProps = IIngredient & {
    type?: 'top' | 'bottom';
    direction: string;
};

export const Bun: FunctionComponent<TBunProps> = ({type, direction, elem}) => {
    return (
        <div className={burgerConstructorStyles.buns}>
            <ConstructorElement
                type={type}
                isLocked={true}
                text={`${elem.name} (${direction})`}
                price={elem.price}
                thumbnail={elem.image}
            />
        </div>
    )
}
