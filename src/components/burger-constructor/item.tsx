import React, {FunctionComponent} from "react";
import {useDrag, useDrop, DropTargetMonitor} from "react-dnd";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {DELETE_ITEM} from "../../services/actions/burger-constructor";
import {useDispatch, useSelector} from "react-redux";
import { XYCoord } from 'dnd-core'
import {IIngredient} from "../../utils/types";

type TFunctionComponent = IIngredient & {
    index: number;
    moveItem: (dragIndex: number, hoverIndex: number) => void
};

interface DragItem {
    index: number
}

export const Item: FunctionComponent<TFunctionComponent> = ({elem, index, moveItem}) => {
    const dispatch = useDispatch()
    const { points } = useSelector((state: any) => state.constructorBurger)
    const itemRef = React.useRef<HTMLDivElement>(null);
    const { _id } = elem
    const [{ handlerId }, drop] = useDrop({
        accept: 'items',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item: DragItem, monitor: DropTargetMonitor) {
            if (!itemRef.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }
            // @ts-ignore
            const hoverBoundingRect = itemRef.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top
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
                text={elem.name}
                price={elem.price}
                thumbnail={elem.image}
                handleClose={() => {
                    points.splice(index, 1)
                    dispatch({type: DELETE_ITEM, points: points, price: elem.price})
                }}
            />
        </div>
    )
}