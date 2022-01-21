import React, {FC} from 'react';
import styles from "../login.module.css"
import {Button, Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components'
import {Navigate, useLocation, useNavigate} from 'react-router-dom';
import { passwordReset } from "../../services/api";
import {getUserInfo} from "../../services/actions/profile";
import {useDispatch, useSelector} from "react-redux";
import {RESET_PASSWORD} from "../../services/actions";
export const ResetPasswordPage: FC = () => {
    const [valueECode, setValueECode] = React.useState<string>('')
    const inputEmailRef = React.useRef<HTMLInputElement>(null)
    const dispatch = useDispatch()
    const [valuePw, setValuePw] = React.useState<string>('')
    const { name, resetPw } = useSelector((state: any) => state.auth)
    const [request, setRequest] = React.useState<boolean>(false)
    const navigate = useNavigate();
    const location = useLocation()
    console.log(location)
    React.useEffect(() => {
        dispatch(getUserInfo())
    }, [])
    const onChange = (e: { target: HTMLInputElement; }) => {
        setValuePw(e.target.value)
    }
    const restorePW = () => {
        passwordReset(valuePw, valueECode)
            .then(data => {
                if (data.success) {
                    setRequest(true)
                }
            })
            .catch(err => console.log(err))
    }
    if (request) {
        return (
            <Navigate to="/login"/>
        )
    } else if (name || !resetPw) {
        return (
            <Navigate to="/"/>
        )
    }

    return (
        <div className={styles.container}>
            <h1 className={`text text_type_main-medium`}>Восстановление пароля</h1>
            <form className={styles.inputContainer} onSubmit={(e) => {
                e.preventDefault()
                restorePW()
            }}>
                <PasswordInput
                    onChange={onChange}
                    value={valuePw}
                    name={'password'}
                />
                <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    onChange={e => setValueECode(e.target.value)}
                    value={valueECode}
                    name={'email-code'}
                    error={false}
                    ref={inputEmailRef}
                    errorText={'Ошибка'}
                    size={'default'}
                />
                <Button type="primary" size="medium">
                    Сохранить
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