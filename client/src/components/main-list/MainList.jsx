import React from 'react';
import style from './main-list.module.scss';

function MainList(props) {
    return (
        <div className={style.mainContainer}>
            <div className={style.mainList}>
            Main
            </div>
        </div>
    );
}

export default MainList;