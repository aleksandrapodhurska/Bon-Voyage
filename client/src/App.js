import React from 'react';
import style from './app.module.scss';
import Header from "./components/header/Header";
import MainList from "./components/main-list/MainList";
import AuthenticationForm from "./components/authentication-form/AuthenticationForm";
import VacationForm from "./components/vacation-form/VacationForm";

const App = () => {
    return (
        <div className={style.app}>
            <div className={style.container}>
                <Header/>
                {/*<MainList/>*/}
                {/*<AuthenticationForm/>*/}
                <VacationForm/>
            </div>
        </div>
    );
};

export default App;
