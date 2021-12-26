import React from 'react';
import styles from "../login.module.css"
import { Button, PasswordInput, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components'
import {Navigate, useLocation, useNavigate} from 'react-router-dom';
import {signIn} from "../../services/actions/login";
import {useDispatch, useSelector} from "react-redux";
export default function LoginPage () {
    const dispatch = useDispatch()
    const [valueEmail, setValueEmail] = React.useState('')
    const [valuePw, setValuePw] = React.useState('')
    const { loginSuccess } = useSelector(state => state.auth)
    const navigate = useNavigate();
    const location = useLocation()
    //console.log(location.state)
    if (loginSuccess) {
        return (
            <Navigate to={location.state !== null ? location.state.path : '/'}/>
        )
    }
    return (
        <div className={styles.container}>
            <h1 className={`text text_type_main-medium`}>Вход</h1>
            <form className={styles.inputContainer} onSubmit={(e) => {
                e.preventDefault()
                dispatch(signIn({
                    email: valueEmail,
                    password: valuePw
                }, 'auth/login'))
                //navigate(location.state !== null ? location.state.path : '/')
            }}>
                <EmailInput onChange={e => setValueEmail(e.target.value)} value={valueEmail} name={'email'} />
                <PasswordInput
                    onChange={e => setValuePw(e.target.value)}
                    value={valuePw}
                    name={'password'}
                />
                <Button type="primary" size="medium">
                    Войти
                </Button>
            </form>
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
        </div>
    )
}