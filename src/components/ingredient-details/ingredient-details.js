import IngredientDetailsStyles from "./ingredient-details.module.css"
import { useSelector } from "react-redux";

function IngredientDetail() {
    const { ingredientDetails } = useSelector(state => state.ingredients)
    return (
        <div className={IngredientDetailsStyles.details__container}>
            <img src={ingredientDetails.image} alt={ingredientDetails.name}/>
            <h3 className="text text_type_main-medium">{ingredientDetails.name}</h3>
            <div className={IngredientDetailsStyles.details_worth}>
                <p className="text text_type_main-default text_color_inactive">Калории,ккал {ingredientDetails.calories}</p>
                <p className="text text_type_main-default text_color_inactive">Белки, г <br/>{ingredientDetails.proteins}</p>
                <p className="text text_type_main-default text_color_inactive">Жиры, г <br/>{ingredientDetails.fat}</p>
                <p className="text text_type_main-default text_color_inactive">Углеводы, г {ingredientDetails.carbohydrates}</p>
            </div>
        </div>
    )
}

export default IngredientDetail