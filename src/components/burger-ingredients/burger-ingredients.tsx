import React, {FC, ReactNode} from 'react'
import { useDrag } from "react-dnd";
import { Counter, CurrencyIcon, Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import burgerIngredientsStyles from './burger-ingredients.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { MODAL_INGREDIENT_OPEN } from "../../services/actions/ingredient-details";
import {Link} from "react-router-dom";

interface IIngredient {
    elemInfo: {
        _id: string
        type: string
        image: string
        price: number
        name: string
    }
}

interface ITypeOfIngredient {
    list: Array<IIngredient>
    type: string
}
const BurgerIngredients: FC<ReactNode> = ({children}) => {
    const { data, modalIngredientOpen } = useSelector((state: any) => state.ingredients)
    const { points } = useSelector((state: any) => state.constructorBurger)
    const sectionRef = React.useRef<any>()
    const dispatch = useDispatch()

    const Ingredient: FC<IIngredient> = ({elemInfo}) => {
        const { _id, type } = elemInfo
        const [, dragRef] = useDrag({
            type: 'products',
            item: { _id, type }
        });
        const fnc = (elemInfo: {type: string}) => {
            let count = points.filter(function (x: object) {
                return x === elemInfo;
            }).length
            if (elemInfo.type === 'bun') {
                return count + 1
            } else {
                return count
            }
        }
        return (
            <Link to={{ pathname: `/ingredients/${_id}`}} className={burgerIngredientsStyles.link}>
                <div
                    onClick={() => dispatch({type: MODAL_INGREDIENT_OPEN, elemInfo: elemInfo})}
                    className={burgerIngredientsStyles.ingredient_section}
                    ref={dragRef}
                >
                    <div className={burgerIngredientsStyles.ingredient_counter}>
                        {points.indexOf(elemInfo) !== -1 &&
                        <Counter count={fnc(elemInfo)} size="default"/>
                        }
                    </div>
                    <img src={elemInfo.image} className={burgerIngredientsStyles.ingredient_photo} alt={elemInfo.name}/>
                    <div className={burgerIngredientsStyles.price_info}>
                        <CurrencyIcon type="primary"/>
                        <p className="text text_type_digits-default">{elemInfo.price}</p>
                    </div>
                    <h4 className={`${burgerIngredientsStyles.ingredient_name} text text_type_main-default`}>{elemInfo.name}</h4>
                </div>
            </Link>
        )
    }


    const TypeOfIngredient: FC<ITypeOfIngredient> = ({ list, type }) => (
        <section>
            <h3 className={`${burgerIngredientsStyles.ingredient_type} text text_type_main-medium`}>{type}</h3>
            <div className={burgerIngredientsStyles.ingredient_container}>
                {list.map((elem: any) => (
                    <Ingredient elemInfo={elem} key={elem._id}/>
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
                    Булки
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
        )
    }
    return (
        <section className={burgerIngredientsStyles.windowIngredients}>
            <h2 className={`text text_type_main-large ${burgerIngredientsStyles.constructor__header}`}>Соберите бургер</h2>
            <TabElement/>
            <section className={burgerIngredientsStyles.ingredients_section} ref={sectionRef}>
                <TypeOfIngredient list={data.filter((e: ITypeOfIngredient) => e.type === "bun")} type="Булки"/>
                <TypeOfIngredient list={data.filter((e: ITypeOfIngredient) => e.type === "sauce")} type="Соусы"/>
                <TypeOfIngredient list={data.filter((e: ITypeOfIngredient) => e.type === "main")} type="Начинки"/>
            </section>
            {modalIngredientOpen && children}
        </section>
    )
}


export default BurgerIngredients