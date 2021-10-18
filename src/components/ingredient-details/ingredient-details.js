import IngredientDetailsStyles from "./ingredient-details.module.css"
import PropTypes from 'prop-types';
import React from "react";

function IngredientDetail(props) {
    return (
        <div className={IngredientDetailsStyles.details__container}>
            <img src={props.data.image} alt={props.data.name}/>
            <h3 className="text text_type_main-medium">{props.data.name}</h3>
            <div className={IngredientDetailsStyles.details_worth}>
                <p className="text text_type_main-default text_color_inactive">Калории,ккал {props.data.calories}</p>
                <p className="text text_type_main-default text_color_inactive">Белки, г <br/>{props.data.proteins}</p>
                <p className="text text_type_main-default text_color_inactive">Жиры, г <br/>{props.data.fat}</p>
                <p className="text text_type_main-default text_color_inactive">Углеводы, г {props.data.carbohydrates}</p>
            </div>
        </div>
    )
}

IngredientDetail.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
}
export default IngredientDetail