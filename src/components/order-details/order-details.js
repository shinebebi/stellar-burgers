import React from "react";
import Modal from "../modal/modal"
import done from "../../images/done.png"
import OrderDetailsStyles from "./order-details.module.css"
function OrderDetails (props) {
    return (
        <Modal header='' onClose={props.onClose}>
            <div className={OrderDetailsStyles.infoOrder__container}>
                <p className={`${OrderDetailsStyles.order_number} text text_type_digits-large`}>034536</p>
                <p className={`${OrderDetailsStyles.id_description} text text_type_main-default`}>идентификатор заказа</p>
                <img src={done} className={OrderDetailsStyles.done_img}/>
                <p className={`${OrderDetailsStyles.order_startCooking} text text_type_main-default`}>Ваш заказ начали готовить</p>
                <p className={`${OrderDetailsStyles.order_instruction} text text_type_main-default text_color_inactive`}>Дождитесь готовности на орбитальной станции</p>
            </div>
        </Modal>
    )
}

export default OrderDetails