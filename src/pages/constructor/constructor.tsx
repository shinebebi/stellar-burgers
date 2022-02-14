import React, {FC, ReactNode} from 'react';
import {useSelector, useDispatch} from '../../utils/hooks'
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import constructorStyles from "./constructor.module.css"
import {addItemAction, addBunAction} from "../../services/actions/burger-constructor";

interface IBunObj {
    type: string
    _id: string
}
export interface IItemIdd {
    type: string
    _id: string
}
export const ConstructorPage: FC<ReactNode> = ({children}) => {
    const { data, isLoading, hasError } = useSelector((state) => state.ingredients);
    const { points } = useSelector((state) => state.constructorBurger)
    const dispatch = useDispatch();
    const handleDrop = (itemId: IItemIdd) => {
        const prevBunObj = points.filter((e: IBunObj) => e.type === 'bun')[0]
        const dataFilter = () => {
            return data.filter((e: IBunObj) => e._id === itemId._id)[0]
        }
        if (itemId.type !== 'bun' || prevBunObj === undefined) {
            points.push(dataFilter())
            let price = null
            if (itemId.type !== 'bun') {
                price = dataFilter().price
            } else {
                price = dataFilter().price * 2
            }
            dispatch(addItemAction(points, price))
        } else {
            const bunIndex = points.indexOf(prevBunObj)
            points[bunIndex] = dataFilter()
            dispatch(addBunAction(points, prevBunObj.price * 2, dataFilter().price * 2))
        }
    };
    return (
        <div className={constructorStyles.main} data-cy='constructor-page'>
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