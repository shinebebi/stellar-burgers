import {DndProvider , useDrop} from "react-dnd";
import burgerConstructorStyles from "./burger-constructor.module.css";
import React, {FC} from "react";
import { Bun } from './bun'
import {Item} from "./item";
import {sortItemItemAction} from "../../services/actions/burger-constructor";
import {HTML5Backend} from "react-dnd-html5-backend";
import {useSelector, useDispatch} from '../../utils/hooks'
import {IBurgerConstructor} from './burger-constructor'
import {IItemIdd} from '../../pages/constructor/constructor'
import {IIngredient} from "../../utils/types";

export const Points: FC<IBurgerConstructor> = ({onDropHandler}) => {
    const dispatch = useDispatch()
    const { points } = useSelector((state) => state.constructorBurger)
    const [, dropTarget] = useDrop({
        accept: 'products',
        drop(itemId: IItemIdd) {
            onDropHandler(itemId);
        }
    });

    const setBun = (type: 'top' | 'bottom', direction: string) => {
        for (let i = 0; i < points.length; i++) {
            if (points[i].type === 'bun') {
                return <Bun type={type} direction={direction} elem={points[i]}/>;
                break
            }
        }
    }
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', height: 650}} ref={dropTarget}>
            {setBun('top', 'верх')}
            <DndProvider backend={HTML5Backend}>
                {!points.length
                    ? <p className="text text_type_main-default text_color_inactive">Перенесите сюда ингредиенты</p>
                    : <section className={burgerConstructorStyles.constructor_mains}>
                        {points.map(function (e: IIngredient, index: number) {
                            // @ts-ignore
                            return (e.type !== 'bun') &&
                                // @ts-ignore
                                <Item elem={e} key={e._id} index={index} moveItem={(dragIndex, hoverIndex) => {
                                    /*const dragItem = points[dragIndex];
                                    points.splice(dragIndex, 1)
                                    points.splice(hoverIndex, 0, dragItem)*/
                                    points.splice(hoverIndex, 0, points.splice(dragIndex, 1)[0]);
                                    const uniqueArray = points.filter(function(item: object, pos: number) {
                                        // @ts-ignore
                                        return points.indexOf(item) === pos;
                                    })
                                    dispatch(sortItemItemAction(uniqueArray))
                                }
                                }/>
                        })}
                    </section>
                }
            </DndProvider>
            {setBun('bottom', 'низ')}
        </div>
    )
}