import loginStyles from "../login.module.css";
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import {Navigate, useNavigate} from 'react-router-dom';
import {signIn} from "../../services/actions/login";
import {useDispatch, useSelector} from "react-redux";
import {getUserInfo} from "../../services/actions/profile";

export default function RegisterPage () {
    const navigate = useNavigate();
    const { hasError, name } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const [valueEmail, setValueEmail] = React.useState('')
    const [valueName, setValueName] = React.useState('')
    const inputNameRef = React.useRef(null)
    const [valuePw, setValuePw] = React.useState('')
    React.useEffect(() => {
        dispatch(getUserInfo())
    }, [])
    const onChange = e => {
        setValuePw(e.target.value)
    }
    if (!hasError && name) {
        return (
            <Navigate to="/"/>
        )
    }
    return (
        <div className={loginStyles.container}>
            <h1 className={`text text_type_main-medium`}>Регистрация</h1>
            <form className={loginStyles.inputContainer} onSubmit={(e) => {
                e.preventDefault()
                dispatch(signIn({
                    email: valueEmail,
                    password: valuePw,
                    name: valueName
                }, 'auth/register'))
            }}>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={e => setValueName(e.target.value)}
                    value={valueName}
                    name={'valueName'}
                    error={false}
                    ref={inputNameRef}
                    errorText={'Ошибка'}
                    size={'default'}
                />
                <EmailInput onChange={e => setValueEmail(e.target.value)} value={valueEmail} name={'email'} />
                <PasswordInput
                    onChange={onChange}
                    value={valuePw}
                    name={'password'}
                />
                <Button type="primary" size="medium">
                    Зарегистрироваться
                </Button>
            </form>
            <p className="text text_type_main-default text_color_inactive" style={{marginTop: 80}}>
                Уже зарегистрированы?
                <span>
                    <Button type="secondary" size="small" onClick={() => navigate('/login')}>
                        Войти
                    </Button>
                </span>
            </p>
        </div>
    )
}