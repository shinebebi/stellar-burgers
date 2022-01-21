import React, {FC} from 'react';
import styles from "../login.module.css"
import {RESET_PASSWORD} from "../../services/actions";
import {Button, EmailInput} from '@ya.praktikum/react-developer-burger-ui-components'
import { useNavigate, Navigate } from 'react-router-dom';
import { emailRequest } from "../../services/api";
import {useDispatch, useSelector} from "react-redux";
export const ForgotPasswordPage: FC = () => {
    const {name} = useSelector((state: any) => state.auth)
    const [valueEmail, setValueEmail] = React.useState<string>('')
    const [eSuccess, setESuccess] = React.useState<boolean>(false)
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const restorePW = () => {
        emailRequest(valueEmail)
            .then(data => {
                if (data.success) {
                    console.log(data)
                    setESuccess(true)
                }
            })
            .catch(err => console.log(err))
    }
    if (eSuccess && !name) {
        return (
            <Navigate to="/reset-password"/>
        )
    } else if (name) {
        return <Navigate to="/"/>
    }
    return (
        <div className={styles.container}>
            <h1 className={`text text_type_main-medium`}>Восстановление пароля</h1>
            <form className={styles.inputContainer} onSubmit={(e) => {
                e.preventDefault()
                dispatch({type: RESET_PASSWORD})
                restorePW()
            }}>
                <EmailInput onChange={e => setValueEmail(e.target.value)} value={valueEmail} name={'email'} />
                <Button type="primary" size="medium">
                    Восстановить
                </Button>
            </form>
                <p className="text text_type_main-default text_color_inactive" style={{marginTop: 80}}>
                    Вспомнили пароль?
                    <span style={{marginLeft: -15}}>
                        <Button type="secondary" size="medium" onClick={() => navigate('/login')}>
                           Войти
                        </Button>
                    </span>
                </p>
        </div>
    )
}