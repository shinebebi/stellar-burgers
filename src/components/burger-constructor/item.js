import React from "react";
import {useDrag, useDrop} from "react-dnd";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {DELETE_ITEM} from "../../services/actions/burger-constructor";
import {useDispatch, useSelector} from "react-redux";
import PropTypes from "prop-types";

export const Item = ({e, index, moveItem}) => {
    const dispatch = useDispatch()
    const { points } = useSelector(state => state.constructorBurger)
    const ind = index
    const itemRef = React.useRef();
    const [{ isHover }, drop] = useDrop({
        accept: 'items',
        collect: monitor => ({
            isHover: monitor.isOver()
        }),
        drop(item) {
            if (!itemRef.current) {
                return;
            }
            const dragIndex = item.ind;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }
            moveItem(dragIndex, hoverIndex)
            item.ind = hoverIndex;
        }
    });
    const [, drag] = useDrag({
        type: 'items',
        item: () => {
            return { ind };
        }
    });
    drag(drop(itemRef));
    const marginTop = isHover ? '20px' : '0px'
    return (
        <div ref={itemRef} style={{ marginTop }}>
            <DragIcon type="primary"/>
            <ConstructorElement
                text={e.name}
                price={e.price}
                thumbnail={e.image}
                handleClose={() => {
                    points.splice(index, 1)
                    dispatch({type: DELETE_ITEM, points: points, price: e.price})
                }}
            />
        </div>
    )
}
Item.propTypes = {
    index: PropTypes.number.isRequired,
    moveItem: PropTypes.func.isRequired,
    e: PropTypes.object.isRequired
}