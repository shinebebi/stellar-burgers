import {IIngredient, IOrders} from "./types";
import React, {FC} from "react";
import styles from "../pages/profile/profile.module.css";
import {postLogout} from "../services/actions/logout";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "./hooks";

export const finalPrice = (ingredients: any) => {
    let price = 0
    ingredients.forEach((e: any) => {
        if (e.type === 'bun') {
            price += (2 * e.price)
        } else {
            price += e.price
        }
    })
    return price
}

export const fullArray = (orders: Array<IOrders>, data: Array<IIngredient>) => {
    let ingred: any = []
    const ordersArray: any = []
    orders.forEach(o => {
        o.ingredients.forEach(i => {
            ingred.push(data.filter((e) => e._id === i)[0])
        })
        ordersArray.push({
            ...o,
            ingredients: ingred,
        })
        ingred = []
    })
    return ordersArray
}

interface IProfileTab {
    text: string,
    btn: string
}

export const ProfileTab: FC<IProfileTab> = ({text, btn}) => {
    const [profileBtn, setProfileBtn] = React.useState<boolean>(btn === 'profile')
    const [historyBtn, setHistoryBtn] = React.useState<boolean>(btn === 'history')
    const [logoutBtn, setLogoutBtn] = React.useState<boolean>(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const updateClickBtn = (btn: string) => {
        if (btn === 'profile') {
            setProfileBtn(true)
            setHistoryBtn(false)
            setLogoutBtn(false)
            navigate('/profile')
        } else if (btn === 'history') {
            setProfileBtn(false)
            setHistoryBtn(true)
            setLogoutBtn(false)
            navigate('/profile/orders')
        } else {
            setProfileBtn(false)
            setHistoryBtn(false)
            setLogoutBtn(true)
            dispatch(postLogout())
        }
    }
    const typographyActive: string = `text text_type_main-medium ${styles.btnActive}`
    const typographyInActive: string = `text text_type_main-medium ${styles.btnInactive}`
    return (
        <div className={styles.navContainer}>
            <div className={styles.navBar}>
                <button onClick={() => updateClickBtn('profile')} className={`${styles.btn} ${profileBtn ? typographyActive : typographyInActive}`}>Профиль</button>
                <button onClick={() => updateClickBtn('history')} className={`${styles.btn} ${historyBtn ? typographyActive : typographyInActive}`}>История заказов</button>
                <button onClick={() => updateClickBtn('logout')} className={`${styles.btn} ${logoutBtn ? typographyActive : typographyInActive}`}>Выход</button>
            </div>
            <p className='text text_type_main-default text_color_inactive'>
                {text}
            </p>
        </div>
    )
}