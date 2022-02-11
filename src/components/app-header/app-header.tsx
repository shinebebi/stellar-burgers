import React, {FunctionComponent} from 'react'
import { Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import { useLocation, Link } from 'react-router-dom'
import appHeaderStyles from './app-header.module.css';
export const AppHeader: FunctionComponent = () => {
    const location = useLocation();
    const setActive = (url: string) => {
        if ((location.pathname === '/profile' || location.pathname === '/profile/orders') && (url === '/profile/orders' || url === '/profile')) {
            return true
        }
    }
    const setActiveFeed = (url: string) => {
        if (location.pathname === '/feed' && url === '/feed') {
            return true
        }
    }
    const typographyActive: string = `text text_type_main-default ${appHeaderStyles.link_active}`
    const typographyInActive: string = "text text_type_main-default text_color_inactive"
    return (
        <header className={appHeaderStyles.header}>
            <Link className={appHeaderStyles.navigation__point} to={{pathname: '/'}}>
                <BurgerIcon type={!setActive(location.pathname) && !setActiveFeed(location.pathname) ? 'primary' : 'secondary'}/>
                <h3 className={!setActive(location.pathname) && !setActiveFeed(location.pathname) ? typographyActive : typographyInActive}>Конструктор</h3>
            </Link>
            <Link className={appHeaderStyles.navigation__point} style={{marginRight: 130}} to={{pathname: '/feed'}}>
                <ListIcon type={setActiveFeed(location.pathname) ? 'primary' : 'secondary'}/>
                <h3 className={setActiveFeed(location.pathname) ? typographyActive : typographyInActive}>Лента заказов</h3>
            </Link>
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