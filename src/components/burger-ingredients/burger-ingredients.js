import React from 'react'
import { useDrag } from "react-dnd";
import { Counter, CurrencyIcon, Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import burgerIngredientsStyles from './burger-ingredients.module.css';
import Modal from "../modal/modal";
import IngredientDetail from "../ingredient-details/ingredient-details";
import { useSelector, useDispatch } from 'react-redux';
import { MODAL_INGREDIENT_OPEN, MODAL_INGREDIENT_CLOSE } from "../../services/actions/ingredient-details";


function BurgerIngredients () {
    const { data, modalIngredientOpen } = useSelector(state => state.ingredients)
    const { points } = useSelector(state => state.constructorBurger)
    const sectionRef = React.useRef()
    const dispatch = useDispatch()


    const Ingredient = ({elemInfo}) => {
        const { _id, type } = elemInfo
        const [, dragRef] = useDrag({
            type: 'products',
            item: { _id, type }
        });
        const fnc = (elemInfo) => {
            let count = points.filter(x => x === elemInfo).length
            if (elemInfo.type === 'bun') {
                return count + 1
            } else {
                return count
            }
        }
        return (
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
        )
    }


    const TypeOfIngredient = ({ list, type }) => (
        <section>
            <h3 className={`${burgerIngredientsStyles.ingredient_type} text text_type_main-medium`}>{type}</h3>
            <div className={burgerIngredientsStyles.ingredient_container}>
                {list.map((elem)=>(
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
            return () => {
                sectionRef.current.removeEventListener('scroll', updateScrollPosition)
            }
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
                <TypeOfIngredient list={data.filter(e => e.type === "bun")} type="Булки"/>
                <TypeOfIngredient list={data.filter(e => e.type === "sauce")} type="Соусы"/>
                <TypeOfIngredient list={data.filter(e => e.type === "main")} type="Начинки"/>
            </section>
            {modalIngredientOpen &&
                <Modal header="Детали ингредиента" onClose={() => dispatch({type: MODAL_INGREDIENT_CLOSE})}>
                    <IngredientDetail/>
                </Modal>
            }
        </section>
    )
}


export default BurgerIngredients