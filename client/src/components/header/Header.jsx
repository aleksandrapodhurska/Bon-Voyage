import React from 'react';
import style from './header.module.scss';
import man from '../../assets/icons/man.png';
import woman from '../../assets/icons/woman.png';
import AuthService from "../../services/authService";
import {useNavigate} from "react-router-dom";

function Header({setIsAuth}) {
    let navigate = useNavigate();

    const logout = () => {
        AuthService.logout();
        setIsAuth(false);
        navigate('/');
    }
    return (
        <div className={style.header}>
            <div className={style.user}>
                <div className={style.profileIcon}>
                    <img src={woman}/>
                </div>
                <div>Hi Alex!</div>
            </div>
            <div className={style.logo}>BonVoyage</div>
            <div className={style.logout}>
                <a onClick={logout}>Logout</a>
            </div>
        </div>
    );
}

export default Header;