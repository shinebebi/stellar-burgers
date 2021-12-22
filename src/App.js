import {BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom';
import AppHeader from "./components/app-header/app-header";
import { ConstructorPage, LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, ProfilePage } from "./pages/index"
import {ProtectedAuthorized} from "./components/protectedRoutes/protectedAuthorized";
import IngredientDetail from "./components/ingredient-details/ingredient-details";
import React from "react";
import Modal from "./components/modal/modal";
import {MODAL_INGREDIENT_CLOSE} from "./services/actions/ingredient-details";
import {useDispatch, useSelector} from "react-redux";
export default function App() {
    const { data, modalIngredientOpen } = useSelector(state => state.ingredients)
    const dispatch = useDispatch()
    return (
        <Router>
            <AppHeader/>
            <Routes>
                <Route path="/" exact={true} element={<ConstructorPage/>}/>
                <Route path="/login" exact={true} element={<LoginPage/>}/>
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
                            }}>
                                <IngredientDetail/>
                            </Modal>
                        </ConstructorPage> : <IngredientDetail/>
                    }
                />
            </Routes>
        </Router>
    );
}