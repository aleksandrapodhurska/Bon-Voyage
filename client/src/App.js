import React, {useEffect, useState} from 'react';
import style from './app.module.scss';
import Header from "./components/header/Header";
import MainList from "./components/main-list/MainList";
import AuthenticationForm from "./components/authentication-form/AuthenticationForm";
import VacationForm from "./components/vacation-form/VacationForm";
import AuthService from "./services/authService";
import UserService from "./services/UserService";
import {Route, Routes, useNavigate} from "react-router-dom";
import Login from "./components/authentication-form/Login";
import Registration from "./components/authentication-form/Registration";

const App = () => {
    const [isAuth, setIsAuth] = useState(false);
    let navigate = useNavigate();

    useEffect(async () => {
        if (localStorage.getItem('accessToken')) {
            const isAuth = await AuthService.checkAuth();
            console.log(isAuth);
            if (isAuth) {
                setIsAuth(true);
                navigate("/main")
            }
            else {
                setIsAuth(false);
            }
        }
    }, []);


    return (
        <div className={style.app}>
            <div className={style.container}>
                <Header setIsAuth={setIsAuth}/>
                <Routes>
                    <Route path='/' element={<AuthenticationForm/>}/>
                        <Route path='login' element={<Login/>}/>
                        <Route path='registration' element={<Registration/>}/>
                    <Route path='/main' element={<MainList/>}/>
                    <Route path='/new-vacation' element={<VacationForm/>}/>
                </Routes>

            </div>
        </div>
    );
};

export default App;
