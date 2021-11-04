import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useDrop, useDrag } from "react-dnd";
import {
    ConstructorElement,
    DragIcon,
    Button,
    CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components'
import burgerConstructorStyles from './burger-constructor.module.css';
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import { useSelector, useDispatch } from 'react-redux';
import {
    MODAL_ORDER_OPEN,
    MODAL_ORDER_CLOSE
} from "../../services/actions/order-details";
import {
    GET_INITIAL_POINTS, getFinalAmount, DELETE_ITEM, SORT_ITEMS
} from "../../services/actions/burger-constructor";

function BurgerConstructor ({onDropHandler}) {
    const dispatch = useDispatch()
    const { points, modalOrderOpen, finalAmount } = useSelector(state => state.constructorBurger)
    const { data } = useSelector(state => state.ingredients)
    React.useEffect(() => {
        const initialPointsArray = []
        const initialPoints = [
            "Краторная булка N-200i",
            "Соус традиционный галактический",
            "Мясо бессмертных моллюсков Protostomia",
            "Плоды Фалленианского дерева",
            "Хрустящие минеральные кольца",
            "Хрустящие минеральные кольца"
        ]
        initialPoints.forEach(name => {
            initialPointsArray.push(data.filter(item => item.name === name)[0])
        })
        dispatch({type: GET_INITIAL_POINTS, points: initialPointsArray})
        dispatch(getFinalAmount())
    }, [data, dispatch])

    const FinalAmount = () => {
        return (
            <div className={burgerConstructorStyles.finalPrice}>
                <p className="text text_type_digits-medium">{finalAmount}</p>
                <CurrencyIcon type="primary"/>
            </div>
        )
    }

    const Points = ({onDropHandler}) => {
        const [, dropTarget] = useDrop({
            accept: 'products',
            drop(itemId) {
                onDropHandler(itemId);
            }
        });
        const Bun = ({type, direction, elem}) => {
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

        const Item = ({e, index, moveItem}) => {
            const ind = index
            const itemRef = React.useRef();
            const [, drop] = useDrop({
                accept: 'items',
                collect(monitor) {
                    return {
                        handlerId: monitor.getHandlerId(),
                    };
                },
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
                },
            });
            const [, drag] = useDrag({
                type: 'items',
                item: () => {
                    return { ind };
                }
            });
            drag(drop(itemRef));
            return (
                <div ref={itemRef}>
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
            )}

        const setBun = (type, direction) => {
            for (let i = 0; i < points.length; i++) {
                if (points[i].type === 'bun') {
                    return <Bun type={type} direction={direction} elem={points[i]}/>;
                    break
                }
            }
        }

        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} ref={dropTarget}>
                {setBun('top', 'верх')}
                <DndProvider backend={HTML5Backend}>
                    <section className={burgerConstructorStyles.constructor_mains}>
                        {points.map(function (e, index) {
                            return (e.type !== 'bun') &&
                                <Item e={e} key={index} index={index} moveItem={(dragIndex, hoverIndex) => {
                                    const dragItem = points[dragIndex];
                                    points.splice(dragIndex, 1)
                                    points.splice(hoverIndex, 0, dragItem)
                                    dispatch({type: SORT_ITEMS, points: points})
                                }
                                }/>
                        })}
                    </section>
                </DndProvider>
                {setBun('bottom', 'низ')}
            </div>
        )
    }
    return (
        <section className={burgerConstructorStyles.windowConstructor}>
            <Points onDropHandler={onDropHandler}/>
            <div className={burgerConstructorStyles.makeOrder__container}>
                <FinalAmount/>
                <Button type="primary" size="large" onClick={() => dispatch({type: MODAL_ORDER_OPEN})}>
                    Оформить заказ
                </Button>
                {modalOrderOpen &&
                    <Modal header='' onClose={() => dispatch({type: MODAL_ORDER_CLOSE})}>
                        <OrderDetails/>
                    </Modal>
                }
            </div>
        </section>
    )
}

export default BurgerConstructor