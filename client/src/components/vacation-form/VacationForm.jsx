import React from 'react';
import FormInput from "../../elements/form-input/FormInput";
import FormButton from "../../elements/form-button/FormButton";
import style from './vacation-form.module.scss';

function VacationForm(props) {
    return (
        <div className={style.background}>
            <div className={style.formContainer}>
                <h1>Create new Vacation</h1>
                <form className={style.form}>
                    <FormInput type="text" placeholder="Destination"/>
                    <FormInput input="textarea" type="text" placeholder="Destination"/>
                    <FormInput type="url" placeholder="Image URL"/>
                    <FormInput type="date" placeholder="Date From"/>
                    <FormInput type="date" placeholder="Date To"/>
                    <FormInput type="text" placeholder="Price (USD)"/>
                    <FormButton button="Save" narrow='true'/>

                </form>
            </div>
        </div>
    );
}

export default VacationForm;