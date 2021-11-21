import React from 'react';
import style from './main-list.module.scss';
import Card from "../Card/Card";

function MainList(props) {
    return (
        <div className={style.mainContainer}>
            <div className={style.mainList}>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
            </div>
        </div>
    );
}

export default MainList;