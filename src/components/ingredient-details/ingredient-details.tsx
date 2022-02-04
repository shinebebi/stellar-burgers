import IngredientDetailsStyles from "./ingredient-details.module.css"
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import React, {useEffect} from "react";
import {LINK_INGREDIENT_OPEN, MODAL_INGREDIENT_OPEN} from "../../services/actions/ingredient-details";
import {getIngredients} from "../../services/actions/burger-ingredients";

interface IIngredientDetail {
    _id: string
}
function IngredientDetail() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { data } = useSelector((state: any) => state.ingredients)
    const { ingredientDetails } = useSelector((state: any) => state.ingredients)
    useEffect(() => {
        dispatch({type: LINK_INGREDIENT_OPEN, elemInfo: data.filter((e: IIngredientDetail) => e._id === id)[0]})
    }, [data])
    return (
        <>
            {ingredientDetails !== undefined &&
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
            }
        </>
    )
}

export default IngredientDetail