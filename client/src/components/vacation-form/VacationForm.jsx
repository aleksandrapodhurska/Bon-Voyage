import React from 'react';
import FormInput from "../../elements/FormInput";
import FormButton from "../../elements/FormButton";
import style from './vacationForm.module.scss';

function VacationForm(props) {
    return (
        <div className={style.formContainer}>
            <h1>Create new Vacation</h1>
            <form className="form">
                <FormInput type="text" placeholder="Destination"/>
                <FormInput input="textarea" type="text" placeholder="Destination"/>
                <FormInput type="url" placeholder="Image URL"/>
                <FormInput type="date" placeholder="Date From"/>
                <FormInput type="date" placeholder="Date To"/>
                <FormInput type="text" placeholder="Price (USD)"/>
                <FormButton button="Save" narrow='true'/>

            </form>
        </div>
    );
}

export default VacationForm;