import {DndProvider , useDrop} from "react-dnd";
import burgerConstructorStyles from "./burger-constructor.module.css";
import React from "react";
import { Bun } from './bun'
import {Item} from "./item";
import { SORT_ITEMS } from "../../services/actions/burger-constructor";
import {HTML5Backend} from "react-dnd-html5-backend";
import {useDispatch, useSelector} from "react-redux";
import PropTypes from "prop-types";

export const Points = ({onDropHandler}) => {
    const dispatch = useDispatch()
    const { points } = useSelector(state => state.constructorBurger)
    const [, dropTarget] = useDrop({
        accept: 'products',
        drop(itemId) {
            onDropHandler(itemId);
        }
    });

    const setBun = (type, direction) => {
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
                        {points.map(function (e, index) {
                            return (e.type !== 'bun') &&
                                <Item e={e} key={e._id} index={index} moveItem={(dragIndex, hoverIndex) => {
                                    /*const dragItem = points[dragIndex];
                                    points.splice(dragIndex, 1)
                                    points.splice(hoverIndex, 0, dragItem)*/
                                    points.splice(hoverIndex, 0, points.splice(dragIndex, 1)[0]);
                                    const uniqueArray = points.filter(function(item, pos) {
                                        return points.indexOf(item) === pos;
                                    })
                                    dispatch({type: SORT_ITEMS, points: uniqueArray})
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
Points.propTypes = {
    onDropHandler: PropTypes.func.isRequired
}