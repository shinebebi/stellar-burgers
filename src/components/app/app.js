import React from 'react';

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import appStyles from "./app.module.css"

function App () {

    const urlIngredients = 'https://norma.nomoreparties.space/api/ingredients'


    const [state, setState] = React.useState({
        isLoading: false,
        hasError: false,
        data: []
    })

    const getIngredients = () => {
        setState({ ...state, hasError: false, isLoading: true });
        fetch(urlIngredients)
            .then(res => res.json())
            .then(data => setState({ ...state, data: data.data, isLoading: false }))
            .catch(e => {
                setState({ ...state, hasError: true, isLoading: false });
            });
    }

    React.useEffect (() => {
        getIngredients()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const { data, isLoading, hasError } = state;
    return (
        <div>
            <AppHeader/>
            <div className={appStyles.main}>
                {isLoading && 'Загрузка...'}
                {hasError && 'Произошла ошибка'}
                {!isLoading && !hasError && data.length &&
                <BurgerIngredients
                    buns={data.filter(e => e.type === "bun")}
                    mains={data.filter(e => e.type === "main")}
                    sauces={data.filter(e => e.type === "sauce")}/>
                    && <BurgerConstructor points={data}/>
                }
            </div>
        </div>
    );
}
export default App