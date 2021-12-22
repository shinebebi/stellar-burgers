import React from "react";
import {useDrag, useDrop} from "react-dnd";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {DELETE_ITEM} from "../../services/actions/burger-constructor";
import {useDispatch, useSelector} from "react-redux";
import PropTypes from "prop-types";

export const Item = ({e, index, moveItem}) => {
    const dispatch = useDispatch()
    const { points } = useSelector(state => state.constructorBurger)
    const itemRef = React.useRef();
    const { _id } = e
    const [{ handlerId }, drop] = useDrop({
        accept: 'items',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item, monitor) {
            if (!itemRef.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }
            const hoverBoundingRect = itemRef.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            moveItem(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });
    const [{ isDragging }, drag] = useDrag({
        type: 'items',
        item: () => {
            return { _id, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const opacity = isDragging ? 0 : 1;
    drag(drop(itemRef));
    return (
        <div ref={itemRef} style={{ opacity, cursor: 'move' }} data-handler-id={handlerId}>
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