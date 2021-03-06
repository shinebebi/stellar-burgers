import React, {FC} from "react";
import done from "../../images/done.png"
import OrderDetailsStyles from "./order-details.module.css"
import {useSelector, useDispatch} from '../../utils/hooks'
import { getOrderDetails } from "../../services/actions/order-details";

const OrderDetails: FC = () => {
    const { orderNumber, isLoading, hasError } = useSelector((state) => state.constructorBurger)
    const dispatch = useDispatch()
    React.useEffect(() => {
        dispatch(getOrderDetails())
    }, [dispatch])
    return (
        <div className={OrderDetailsStyles.main}>
            {isLoading && 'Идет загрузка... Подождите 15 секунд'}
            {hasError && 'Произошла ошибка'}
            {!isLoading && !hasError &&
                <div className={OrderDetailsStyles.infoOrder__container}>
                    <p className={`${OrderDetailsStyles.order_number} text text_type_digits-large`}>{orderNumber}</p>
                    <p className={`${OrderDetailsStyles.id_description} text text_type_main-default`}>идентификатор заказа</p>
                    <img src={done} className={OrderDetailsStyles.done_img} alt='done img'/>
                    <p className={`${OrderDetailsStyles.order_startCooking} text text_type_main-default`}>Ваш заказ начали готовить</p>
                    <p className={`${OrderDetailsStyles.order_instruction} text text_type_main-default text_color_inactive`}>Дождитесь готовности на орбитальной станции</p>
                </div>
            }
        </div>
    )
}

export default OrderDetails