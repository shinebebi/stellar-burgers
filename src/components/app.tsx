import {BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom';
import {AppHeader} from "./app-header/app-header";
import { ConstructorPage, LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, ProfilePage, FeedPage, ProfileOrders } from "../pages"
import {ProtectedAuthorized} from "./protectedRoutes/protectedAuthorized";
import IngredientDetail from "./ingredient-details/ingredient-details";
import React, {FC, useEffect} from "react";
import Modal from "./modal/modal";
import {modalCloseAction} from "../services/actions/burger-ingredients";
import {useSelector, useDispatch} from '../utils/hooks'
import {getIngredients} from "../services/actions/burger-ingredients";
import {infoOrderCloseAction} from "../services/actions/feed";
import {getUserInfo} from "../services/actions/profile";
import {OrderInfo} from "./order-info/order-info";

export const App: FC = () => {
    const { data, modalIngredientOpen } = useSelector((state) => state.ingredients)
    const { modalInfoOrderOpen } = useSelector(state => state.feed)
    const { orders } = useSelector(state => state.ws)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(getIngredients())
        dispatch(getUserInfo())
    }, [])
    return (
        <>
            <AppHeader/>
            <Routes>
                <Route path="/" element={<ConstructorPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/forgot-password" element={<ForgotPasswordPage/>}/>
                <Route path="/reset-password" element={<ResetPasswordPage/>}/>
                <Route path="/profile" element={
                    <ProtectedAuthorized children={<ProfilePage/>}/>
                }/>
                <Route path="/profile/orders" element={
                    <ProtectedAuthorized>
                        <ProfileOrders/>
                    </ProtectedAuthorized>
                }/>

                <Route
                    path={`/ingredients/:id`}
                    element={modalIngredientOpen && data ?
                        <ConstructorPage>
                            <Modal header="Детали Ингредиента" onClose={() => {
                                dispatch(modalCloseAction())
                                navigate('/')
                            }}>
                                <IngredientDetail/>
                            </Modal>
                        </ConstructorPage> : <IngredientDetail/>
                    }
                />
                <Route path="/feed" element={<FeedPage/>}/>
                <Route
                    path='/feed/:id'
                    element={modalInfoOrderOpen && orders ?
                        <FeedPage>
                            <Modal header='' onClose={() => {
                                dispatch(infoOrderCloseAction())
                                navigate('/feed')
                            }}>
                                <OrderInfo/>
                            </Modal>
                        </FeedPage> : <OrderInfo/>
                    }
                />
                <Route
                    path='/profile/orders/:id'
                    element={modalInfoOrderOpen && orders ?
                        <ProfileOrders>
                            <Modal header='' onClose={() => {
                                dispatch(infoOrderCloseAction())
                                navigate('/profile/orders')
                            }}>
                                <OrderInfo/>
                            </Modal>
                        </ProfileOrders> : <OrderInfo/>
                    }
                />
            </Routes>
        </>
    );
}