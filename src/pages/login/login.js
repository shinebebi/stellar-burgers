import React from 'react';
import styles from "../login.module.css"
import { Button, PasswordInput, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components'
import {Navigate, useNavigate} from 'react-router-dom';
import {signIn} from "../../services/actions/login";
import {useDispatch, useSelector} from "react-redux";
import {getUserInfo} from "../../services/actions/profile";
export default function LoginPage () {
    const dispatch = useDispatch()
    const [valueEmail, setValueEmail] = React.useState('')
    const [valuePw, setValuePw] = React.useState('')
    const { hasError, name } = useSelector(state => state.auth)
    const navigate = useNavigate();
    React.useEffect(() => {
        dispatch(getUserInfo())
    }, [])
    if (!hasError && name) {
        return (
            <Navigate to="/"/>
        )
    }
    return (
        <form className={styles.container}>
            <h1 className={`text text_type_main-medium`}>Вход</h1>
            <div className={styles.inputContainer}>
                <EmailInput onChange={e => setValueEmail(e.target.value)} value={valueEmail} name={'email'} />
                <PasswordInput
                    onChange={e => setValuePw(e.target.value)}
                    value={valuePw}
                    name={'password'}
                />
            </div>
            <Button type="primary" size="medium" onClick={(e) => {
                e.preventDefault()
                dispatch(signIn({
                    email: valueEmail,
                    password: valuePw
                }, 'auth/login'))
            }}>
                Войти
            </Button>
            <div className={styles.support}>
                <p className="text text_type_main-default text_color_inactive">
                    Вы — новый пользователь?
                    <span style={{marginLeft: -30}}>
                        <Button type="secondary" size="medium" onClick={() => navigate('/register')}>
                            Зарегистрироваться
                        </Button>
                    </span>
                </p>
                <p className="text text_type_main-default text_color_inactive">
                    Забыли пароль?
                    <span style={{marginLeft: -30}}>
                        <Button type="secondary" size="medium" onClick={() => navigate('/forgot-password')}>
                            Восстановить пароль
                        </Button>
                    </span>
                </p>
            </div>
        </form>
    )
}