import React from 'react';
import styles from "../login.module.css"
import {Button, EmailInput} from '@ya.praktikum/react-developer-burger-ui-components'
import { useNavigate, Navigate } from 'react-router-dom';
import { emailRequest } from "../../services/api";
import {getUserInfo} from "../../services/actions/profile";
import {useDispatch, useSelector} from "react-redux";
export default function ForgotPasswordPage () {
    const [valueEmail, setValueEmail] = React.useState('')
    const [eSuccess, setESuccess] = React.useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { hasError, name } = useSelector(state => state.auth)
    React.useEffect(() => {
        dispatch(getUserInfo())
    }, [])
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
    } else if (!hasError && name) {
        return (
            <Navigate to="/"/>
        )
    }
    return (
        <div className={styles.container}>
            <h1 className={`text text_type_main-medium`}>Восстановление пароля</h1>
            <div className={styles.inputContainer}>
                <EmailInput onChange={e => setValueEmail(e.target.value)} value={valueEmail} name={'email'} />
            </div>
            <Button type="primary" size="medium" onClick={(e) => {
                e.preventDefault()
                restorePW()
            }}>
                Восстановить
            </Button>
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