import React from 'react';

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import appStyles from "./app.module.css"

import data from '../../utils/data'

class App extends React.Component {
    state = {
        ingredientsList: data
    }
    render() {
        return (
            <>
                <AppHeader/>
                <div className={appStyles.main}>
                    <BurgerIngredients buns={this.state.ingredientsList.filter(e => e.type === "bun")} mains={this.state.ingredientsList.filter(e => e.type === "main")} sauces={this.state.ingredientsList.filter(e => e.type === "sauce")}/>
                    <BurgerConstructor points={this.state.ingredientsList}/>
                </div>
            </>
        );
    }
}
export default App