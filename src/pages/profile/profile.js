import {Button, EmailInput, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import styles from "./profile.module.css"
import {useDispatch, useSelector} from "react-redux";
import {postLogout} from "../../services/actions/logout";
import {Navigate} from "react-router-dom";
import {getUserInfo, patchUserInfo} from "../../services/actions/profile";

export default function ProfilePage() {
    const { name, hasError, isLoading, email } = useSelector(state => state.auth)
    const [profileBtn, setProfileBtn] = React.useState(true)
    const [valueEmail, setValueEmail] = React.useState(email)
    const [valueName, setValueName] = React.useState(name)
    const [valuePw, setValuePw] = React.useState('')
    const [historyBtn, setHistoryBtn] = React.useState(false)
    const [logoutBtn, setLogoutBtn] = React.useState(false)
    const dispatch = useDispatch()
    const inputNameRef = React.useRef(null)
    const inputPwRef = React.useRef(null)
    const typographyActive = `text text_type_main-medium ${styles.btnActive}`
    const typographyInActive = `text text_type_main-medium ${styles.btnInactive}`
    const updateClickBtn = (btn) => {
        if (btn === 'profile') {
            setProfileBtn(true)
            setHistoryBtn(false)
            setLogoutBtn(false)
        } else if (btn === 'history') {
            setProfileBtn(false)
            setHistoryBtn(true)
            setLogoutBtn(false)
        } else {
            setProfileBtn(false)
            setHistoryBtn(false)
            setLogoutBtn(true)
            dispatch(postLogout())
        }
    }
    if (!hasError && !isLoading && !name) {
        return (
            <Navigate to="/login"/>
        )
    }
    return (
        <section className={styles.container}>
            <div className={styles.navContainer}>
                <div className={styles.navBar}>
                    <button onClick={() => updateClickBtn('profile')} className={`${styles.btn} ${profileBtn ? typographyActive : typographyInActive}`}>Профиль</button>
                    <button onClick={() => updateClickBtn('history')} className={`${styles.btn} ${historyBtn ? typographyActive : typographyInActive}`}>История заказов</button>
                    <button onClick={() => updateClickBtn('logout')} className={`${styles.btn} ${logoutBtn ? typographyActive : typographyInActive}`}>Выход</button>
                </div>
                <p className='text text_type_main-default text_color_inactive'>
                    В этом разделе вы можете
                    изменить свои персональные данные
                </p>
            </div>
            <div className={styles.inputContainer}>
                <Input
                    type='text'
                    placeholder={'Имя'}
                    onChange={e => setValueName(e.target.value)}
                    value={valueName}
                    name={'name'}
                    error={false}
                    ref={inputNameRef}
                    errorText={'Ошибка'}
                    size={'default'}
                    onIconClick={()=>inputNameRef.current.disabled = false}
                    icon={'EditIcon'}
                    disabled={true}
                />
                <EmailInput onChange={e => setValueEmail(e.target.value)} value={valueEmail} name={'email'} />
                <Input
                    type={'text'}
                    placeholder={'Пароль'}
                    onChange={e => setValuePw(e.target.value)}
                    value={valuePw}
                    name={'password'}
                    error={false}
                    //ref={inputNameRef}
                    errorText={'Ошибка'}
                    size={'default'}
                    onIconClick={()=>inputPwRef.current.disabled = false}
                    icon={'EditIcon'}
                    disabled={true}
                />
                <Button type="primary" size="medium" onClick={(e) => {
                    e.preventDefault()
                    dispatch(patchUserInfo(valueName, valueEmail, valuePw))
                }}>Сохранить</Button>
                <Button type="primary" size="medium" onClick={(e) => {
                    e.preventDefault()
                    setValueName(name)
                    setValueEmail(email)
                    setValuePw('')
                }}>Отменить</Button>
            </div>
        </section>
    )
}