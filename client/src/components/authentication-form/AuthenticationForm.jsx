import React, {useEffect} from 'react';
import Login from "./Login";
import style from "./authentification.module.scss";
import {useNavigate, Outlet} from "react-router-dom";
import AuthService from "../../services/authService";

function AuthenticationForm() {
    let navigate = useNavigate();
    useEffect(async () => {
        if (localStorage.getItem('accessToken')) {
            const isAuth = await AuthService.checkAuth();
            console.log(isAuth);
            if (isAuth) {
                navigate('/main');
            }
        }
    }, []);
    return (
        <div className={style.background}>
            <div className={style.welcome}>
                <h1>We are happy to see you visiting BonVoyage service!</h1>
                <p><a onClick={() => navigate('/login')}>Click here</a> see most beautiful destinations for your next voyage</p>
            </div>
            <Outlet />
        </div>
    );
}

export default AuthenticationForm;