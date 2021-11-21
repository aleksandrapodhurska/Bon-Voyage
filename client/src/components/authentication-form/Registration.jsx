import React from 'react';
import style from "./authentification.module.scss";
import FormInput from "../../elements/form-input/FormInput";
import FormButton from "../../elements/form-button/FormButton";

function Registration(props) {
    return (
        <form className={style.form}>
            <FormInput type="text" placeholder="First Name"/>
            <FormInput type="text" placeholder="Family Name"/>
            <FormInput type="text" placeholder="Username"/>
            <FormInput type="text" placeholder="Password"/>
            <FormInput type="text" placeholder="Email"/>
            <FormButton button="Register"/>
        </form>

    );
}

export default Registration;