import React from 'react';
import style from './header.module.scss';
import man from '../../assets/icons/man.png';
import woman from '../../assets/icons/woman.png';

function Header(props) {
    return (
        <div className={style.header}>
            <div className={style.user}>
                <div className={style.profileIcon}>
                    <img src={woman}/>
                </div>
                <div>Hi Alex!</div>
            </div>
            <div className={style.logo}>BonVoyage</div>
            <div className={style.logout}><p>Logout</p></div>
        </div>
    );
}

export default Header;