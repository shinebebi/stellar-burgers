import IngredientDetailsStyles from "./ingredient-details.module.css"
import {useSelector, useDispatch} from '../../utils/hooks'
import {useParams} from "react-router-dom";
import React, {useEffect} from "react";
import {linkOpenAction} from "../../services/actions/burger-ingredients";

interface IIngredientDetail {
    _id: string
}
function IngredientDetail() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { data } = useSelector((state) => state.ingredients)
    const { ingredientDetails } = useSelector((state) => state.ingredients)
    useEffect(() => {
        dispatch(linkOpenAction(data.filter((e: IIngredientDetail) => e._id === id)[0]))
    }, [data])
    return (
        <>
            {ingredientDetails !== undefined &&
                <div className={IngredientDetailsStyles.details__container}>
                    <img src={ingredientDetails.image} alt={ingredientDetails.name}/>
                    <h3 className="text text_type_main-medium" data-cy='ingredient-name'>{ingredientDetails.name}</h3>
                    <div className={IngredientDetailsStyles.details_worth}>
                        <p className="text text_type_main-default text_color_inactive" data-cy='calories'>Калории,ккал {ingredientDetails.calories}</p>
                        <p className="text text_type_main-default text_color_inactive" data-cy='proteins'>Белки, г <br/>{ingredientDetails.proteins}</p>
                        <p className="text text_type_main-default text_color_inactive" data-cy='fat'>Жиры, г <br/>{ingredientDetails.fat}</p>
                        <p className="text text_type_main-default text_color_inactive" data-cy='carbohydrates'>Углеводы, г {ingredientDetails.carbohydrates}</p>
                    </div>
                </div>
            }
        </>
    )
}

export default IngredientDetail