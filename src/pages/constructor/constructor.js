import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import constructorStyles from "./constructor.module.css"
import { ADD_ITEM, ADD_BUN } from "../../services/actions/burger-constructor";

export default function ConstructorPage ({children}) {
    const { data, isLoading, hasError } = useSelector(state => state.ingredients);
    const { points } = useSelector(state => state.constructorBurger)
    const dispatch = useDispatch();
    const handleDrop = (itemId) => {
        const prevBunObj = points.filter(e => e.type === 'bun')[0]
        const dataFilter = () => {
            return data.filter(e => e._id === itemId._id)[0]
        }
        if (itemId.type !== 'bun' || prevBunObj === undefined) {
            points.push(dataFilter())
            let price = null
            if (itemId.type !== 'bun') {
                price = dataFilter().price
            } else {
                price = dataFilter().price * 2
            }
            dispatch({type: ADD_ITEM, points: points, price: price})
        } else {
            const bunIndex = points.indexOf(prevBunObj)
            points[bunIndex] = dataFilter()
            dispatch({type: ADD_BUN,
                points: points,
                currentBun: dataFilter().price * 2,
                prevBun: prevBunObj.price * 2
            })
        }
    };
    return (
        <div className={constructorStyles.main}>
            {isLoading && 'Загрузка...'}
            {hasError && 'Произошла ошибка'}
            {!isLoading && !hasError && data.length &&
            <DndProvider backend={HTML5Backend}>
                <BurgerIngredients>{children}</BurgerIngredients>
                <BurgerConstructor onDropHandler={handleDrop}/>
            </DndProvider>
            }
        </div>
    );
}