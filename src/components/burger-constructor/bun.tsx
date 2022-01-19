import burgerConstructorStyles from "./burger-constructor.module.css";
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {FunctionComponent} from 'react'

interface IBunProps {
    type?: 'top' | 'bottom';
    direction: string;
    elem: {
        name: string;
        price: number;
        image: string;
    };
}

export const Bun: FunctionComponent<IBunProps> = ({type, direction, elem}) => {
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
