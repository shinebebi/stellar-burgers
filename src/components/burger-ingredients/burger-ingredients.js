import React from 'react'
import { Counter, CurrencyIcon, Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import burgerIngredientsStyles from './burger-ingredients.module.css';
import PropTypes from 'prop-types';



const Ingredient = ({ name, image, price }) => (
    <div>
        <img src={image} className={burgerIngredientsStyles.ingredient_photo}/>
        <div className={burgerIngredientsStyles.price_info}>
            <CurrencyIcon type="primary"/>
            <p className="text text_type_digits-default">{price}</p>
        </div>
        <h4 className={`${burgerIngredientsStyles.ingredient_name} text text_type_main-default`}>{name}</h4>
    </div>
)


const TypeOfIngredient = ({ list, type }) => (
    <section>
        <h3 className={`${burgerIngredientsStyles.ingredient_type} text text_type_main-medium`}>{type}</h3>
        <div className={burgerIngredientsStyles.ingredient_container}>
            {list.map((elem)=>(
                <Ingredient name={elem.name} image={elem.image} price={elem.price} key={elem._id}/>
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


class BurgerIngredients extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section className={burgerIngredientsStyles.windowIngredients}>
                <h2 className={`text text_type_main-large ${burgerIngredientsStyles.constructor__header}`}>Соберите бургер</h2>
                <TabElement/>
                <TypeOfIngredient list={this.props.buns} type="Булки"/>
                <TypeOfIngredient list={this.props.sauces} type="Соусы"/>
                <TypeOfIngredient list={this.props.mains} type="Начинки"/>
            </section>
        )
    }
}

BurgerIngredients.propTypes = {
    buns: PropTypes.arrayOf(PropTypes.object),
    main: PropTypes.arrayOf(PropTypes.object),
    sauces: PropTypes.arrayOf(PropTypes.object)
}

export default BurgerIngredients