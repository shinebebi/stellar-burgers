import {Button, EmailInput, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import styles from "./profile.module.css"
import {useSelector, useDispatch} from '../../utils/hooks'
import {Navigate} from "react-router-dom";
import {patchUserInfo} from "../../services/actions/profile";
import {FC} from "react";
import {ProfileTab} from "../../components/profile-tab/profile-tab";

export const ProfilePage: FC = () => {
    const { name, hasError, isLoading, email } = useSelector((state) => state.auth)
    const [valueEmail, setValueEmail] = React.useState<string>(email)
    const [valueName, setValueName] = React.useState<string>(name)
    const [valuePw, setValuePw] = React.useState<string>('')
    const dispatch = useDispatch()
    const inputNameRef = React.useRef<any>(null)
    const inputPwRef = React.useRef<any>(null)
    if (!hasError && !isLoading && !name) {
        return (
            <Navigate to="/login"/>
        )
    }
    return (
        <section className={styles.container}>
            <ProfileTab text='В этом разделе вы можете изменить свои персональные данные' btn='profile'/>
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