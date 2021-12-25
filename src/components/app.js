import {BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom';
import AppHeader from "./app-header/app-header";
import { ConstructorPage, LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, ProfilePage } from "../pages"
import {ProtectedAuthorized} from "./protectedRoutes/protectedAuthorized";
import IngredientDetail from "./ingredient-details/ingredient-details";
import React, {useEffect} from "react";
import Modal from "./modal/modal";
import {MODAL_INGREDIENT_CLOSE} from "../services/actions/ingredient-details";
import {useDispatch, useSelector} from "react-redux";
import {getIngredients} from "../services/actions/burger-ingredients";
export default function App() {
    const { data, modalIngredientOpen } = useSelector(state => state.ingredients)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(getIngredients())
    }, [])
    return (
        <>
            <AppHeader/>
            <Routes>
                <Route path="/" exact={true} element={<ConstructorPage/>}/>
                <Route path="/login" exact={false} element={<LoginPage/>}/>
                <Route path="/register" exact={true} element={<RegisterPage/>}/>
                <Route path="/forgot-password" exact={true} element={<ForgotPasswordPage/>}/>
                <Route path="/reset-password" exact={true} element={<ResetPasswordPage/>}/>
                <Route path="/profile" exact={true} element={
                    <ProtectedAuthorized>
                        <ProfilePage/>
                    </ProtectedAuthorized>
                }/>

                <Route
                    path={`/ingredients/:id`}
                    exact
                    element={modalIngredientOpen && data ?
                        <ConstructorPage>
                            <Modal header="Детали Ингредиента" onClose={() => {
                                dispatch({type: MODAL_INGREDIENT_CLOSE})
                                navigate('/')
                            }}>
                                <IngredientDetail/>
                            </Modal>
                        </ConstructorPage> : <IngredientDetail/>
                    }
                />
            </Routes>
        </>
    );
}