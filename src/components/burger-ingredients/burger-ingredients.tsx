import React, {FC, ReactNode} from 'react'
import { useDrag } from "react-dnd";
import { Counter, CurrencyIcon, Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import burgerIngredientsStyles from './burger-ingredients.module.css';
import {useSelector, useDispatch} from '../../utils/hooks'
import {modalOpenAction} from "../../services/actions/burger-ingredients";
import {Link} from "react-router-dom";
import {IIngredient, TElem} from '../../utils/types'

type ITypeOfIngredient = {
    list: Array<IIngredient>,
    type: string
};
const BurgerIngredients: FC<ReactNode> = ({children}) => {
    const { data, modalIngredientOpen } = useSelector((state) => state.ingredients)
    const { points } = useSelector((state) => state.constructorBurger)
    const sectionRef = React.useRef<any>()
    const dispatch = useDispatch()

    const Ingredient: FC<TElem> = ({elem}) => {
        const { _id, type } = elem
        const [, dragRef] = useDrag({
            type: 'products',
            item: { _id, type }
        });
        const fnc = (elem: {type: string}) => {
            let count = points.filter(function (x: object) {
                return x === elem;
            }).length
            if (elem.type === 'bun') {
                return count + 1
            } else {
                return count
            }
        }
        return (
            <Link to={{ pathname: `/ingredients/${_id}`}} className={burgerIngredientsStyles.link}>
                <div
                    onClick={() => dispatch(modalOpenAction(elem))}
                    className={burgerIngredientsStyles.ingredient_section}
                    ref={dragRef}
                >
                    <div className={burgerIngredientsStyles.ingredient_counter}>
                        {points.indexOf(elem) !== -1 &&
                            <Counter count={fnc(elem)} size="default"/>
                        }
                    </div>
                    <img src={elem.image} className={burgerIngredientsStyles.ingredient_photo} alt={elem.name}/>
                    <div className={burgerIngredientsStyles.price_info}>
                        <CurrencyIcon type="primary"/>
                        <p className="text text_type_digits-default">{elem.price}</p>
                    </div>
                    <h4 className={`${burgerIngredientsStyles.ingredient_name} text text_type_main-default`}>{elem.name}</h4>
                </div>
            </Link>
        )
    }


    const TypeOfIngredient: FC<ITypeOfIngredient> = ({ list, type }) => (
        <section>
            <h3 className={`${burgerIngredientsStyles.ingredient_type} text text_type_main-medium`}>{type}</h3>
            <div className={burgerIngredientsStyles.ingredient_container}>
                {list.map((elem: IIngredient) => (
                    <Ingredient elem={elem} key={elem._id}/>
                ))}
            </div>
        </section>
    )

    const TabElement = () => {
        const [current, setCurrent] = React.useState('one')
        React.useEffect(() => {
            const updateScrollPosition = () => {
                if (sectionRef.current.scrollTop <= 270) {
                    setCurrent('one')
                } else if (sectionRef.current.scrollTop <= 700) {
                    setCurrent('two')
                } else {
                    setCurrent('three')
                }
            }
            sectionRef.current.addEventListener('scroll', updateScrollPosition)
            return (
                sectionRef.current.removeEventListener('scroll', updateScrollPosition)
            )
        }, [])
        return (
            <div style={{ display: 'flex' }}>
                <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                    ??????????
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                    ??????????
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                    ??????????????
                </Tab>
            </div>
        )
    }
    // @ts-ignore
    return (
        <section className={burgerIngredientsStyles.windowIngredients}>
            <h2 className={`text text_type_main-large ${burgerIngredientsStyles.constructor__header}`}>???????????????? ????????????</h2>
            <TabElement/>
            <section className={burgerIngredientsStyles.ingredients_section} ref={sectionRef}>
                <TypeOfIngredient list={data.filter((e) => e.type === "bun")} type="??????????"/>
                <TypeOfIngredient list={data.filter((e) => e.type === "sauce")} type="??????????"/>
                <TypeOfIngredient list={data.filter((e) => e.type === "main")} type="??????????????"/>
            </section>
            {modalIngredientOpen && children}
        </section>
    )
}


export default BurgerIngredients