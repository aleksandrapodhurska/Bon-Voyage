import React from 'react';
import Login from "./Login";
import style from "./authentification.module.scss";
import Registration from "./Registration";

function AuthenticationForm(props) {
    return (
        <div className={style.background}>
            <div className={style.formContainer}>
                <h1>Sign Up</h1>
                {/*<Login/>*/}
                <Registration/>
            </div>
        </div>
    );
}

export default AuthenticationForm;