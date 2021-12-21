import React from 'react'
import { Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import { useLocation, Link } from 'react-router-dom'
import appHeaderStyles from './app-header.module.css';
export default function AppHeader() {
    const location = useLocation();
    const setActive = (url) => {
        if (location.pathname === '/profile' && url === '/profile') {
            return true
        }
    }
    const typographyActive = `text text_type_main-default ${appHeaderStyles.link_active}`
    const typographyInActive = "text text_type_main-default text_color_inactive"
    return (
        <header className={appHeaderStyles.header}>
            <Link className={appHeaderStyles.navigation__point} to={{pathname: '/'}}>
                <BurgerIcon type={!setActive(location.pathname) ? 'primary' : 'secondary'}/>
                <h3 className={!setActive(location.pathname) ? typographyActive : typographyInActive}>Конструктор</h3>
            </Link>
            <div className={appHeaderStyles.navigation__point} style={{marginRight: 130}}>
                <ListIcon type="secondary"/>
                <h3 className={typographyInActive}>Лента заказов</h3>
            </div>
            <div className={appHeaderStyles.header__logo}>
                <Logo/>
            </div>
            <Link className={appHeaderStyles.header__pa} to={{pathname: '/profile'}}>
                <ProfileIcon type={setActive(location.pathname) ? 'primary' : 'secondary'}/>
                <h3 className={setActive('/profile') ? typographyActive : typographyInActive}>
                    Личный кабинет
                </h3>
            </Link>
        </header>
    )
}