import React from 'react'
import { Counter, CurrencyIcon, Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import burgerIngredientsStyles from './burger-ingredients.module.css';
import PropTypes from 'prop-types';
<<<<<<< HEAD
=======
import Modal from "../modal/modal";
>>>>>>> main
import IngredientDetail from "../ingredient-details/ingredient-details";


function BurgerIngredients (props) {
    const [state, setState] = React.useState({
        isOpen:false,
        data: {}
    })
    const toggleModal = (elemInfo) => (
        setState({...state, isOpen: !state.isOpen, data: elemInfo})
    )

    const Ingredient = ({elemInfo}) => (
        <>
            <div onClick={() => toggleModal(elemInfo)}>
<<<<<<< HEAD
                <img src={elemInfo.image} className={burgerIngredientsStyles.ingredient_photo}/>
=======
                <img src={elemInfo.image} className={burgerIngredientsStyles.ingredient_photo} alt={elemInfo.name}/>
>>>>>>> main
                <div className={burgerIngredientsStyles.price_info}>
                    <CurrencyIcon type="primary"/>
                    <p className="text text_type_digits-default">{elemInfo.price}</p>
                </div>
                <h4 className={`${burgerIngredientsStyles.ingredient_name} text text_type_main-default`}>{elemInfo.name}</h4>
            </div>
        </>
    )


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
    const { data, isOpen } = state;
    return (
        <section className={burgerIngredientsStyles.windowIngredients}>
            <h2 className={`text text_type_main-large ${burgerIngredientsStyles.constructor__header}`}>Соберите бургер</h2>
            <TabElement/>
            <section className={burgerIngredientsStyles.ingredients_section}>
                <TypeOfIngredient list={props.buns} type="Булки"/>
                <TypeOfIngredient list={props.sauces} type="Соусы"/>
                <TypeOfIngredient list={props.mains} type="Начинки"/>
            </section>
            {isOpen &&
<<<<<<< HEAD
                <IngredientDetail onClose={toggleModal} data={data}/>
=======
                <Modal header="Детали ингредиента" onClose={toggleModal}>
                    <IngredientDetail data={data}/>
                </Modal>
>>>>>>> main
            }
        </section>
    )
}

BurgerIngredients.propTypes = {
    buns: PropTypes.arrayOf(PropTypes.object).isRequired,
    mains: PropTypes.arrayOf(PropTypes.object).isRequired,
    sauces: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default BurgerIngredients