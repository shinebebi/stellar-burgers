import React from 'react'
import { Logo, BurgerIcon, ListIcon, ProfileIcon,  } from '@ya.praktikum/react-developer-burger-ui-components'
import appHeaderStyles from './app-header.module.css';
class AppHeader extends React.Component {
    render() {
        const typography = "text text_type_main-default text_color_inactive"
        return (
            <header className={appHeaderStyles.header}>
                <nav className={appHeaderStyles.navigation}>
                    <div className={appHeaderStyles.navigation__point}>
                        <BurgerIcon type="secondary"/>
                        <h3 className={typography}>Конструктор</h3>
                    </div>
                    <div className={appHeaderStyles.navigation__point}>
                        <ListIcon type="secondary"/>
                        <h3 className={typography}>Лента заказов</h3>
                    </div>
                </nav>
                <div className={appHeaderStyles.header__logo}>
                    <Logo/>
                </div>
                <div className={appHeaderStyles.header__pa}>
                    <ProfileIcon type="secondary"/>
                    <h3 className={typography}>Личный кабинет</h3>
                </div>
            </header>
        )
    }
}
export default AppHeader