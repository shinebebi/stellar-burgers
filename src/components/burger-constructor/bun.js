import burgerConstructorStyles from "./burger-constructor.module.css";
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import PropTypes from "prop-types";

export const Bun = ({type, direction, elem}) => {
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
Bun.propTypes = {
    type: PropTypes.string.isRequired,
    direction: PropTypes.string.isRequired,
    elem: PropTypes.object.isRequired
}
