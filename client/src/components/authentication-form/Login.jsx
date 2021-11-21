import React from 'react';
import style from './authentification.module.scss';
import FormInput from "../../elements/form-input/FormInput";
import FormButton from "../../elements/form-button/FormButton";

function Login(props) {
    return (
        <form className={style.form}>
            <FormInput type="text" placeholder="Username"/>
            <FormInput type="password" placeholder="Password"/>
            <FormButton button="Log In"/>
        </form>
    );
}

export default Login;