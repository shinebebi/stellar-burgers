import {BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom';
import {AppHeader} from "./app-header/app-header";
import { ConstructorPage, LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, ProfilePage } from "../pages"
import {ProtectedAuthorized} from "./protectedRoutes/protectedAuthorized";
import IngredientDetail from "./ingredient-details/ingredient-details";
import React, {FC, useEffect} from "react";
import Modal from "./modal/modal";
import {MODAL_INGREDIENT_CLOSE} from "../services/actions/ingredient-details";
import {useDispatch, useSelector} from "react-redux";
import {getIngredients} from "../services/actions/burger-ingredients";
import {getUserInfo} from "../services/actions/profile";
export const App: FC = () => {
    const { data, modalIngredientOpen } = useSelector((state: any) => state.ingredients)
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
                    <ProtectedAuthorized>
                        <ProfilePage/>
                    </ProtectedAuthorized>
                }/>

                <Route
                    path={`/ingredients/:id`}
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