import React from 'react';
import style from "../form-input/formInput.module.scss";

function FormButton(props) {
    return (
        <div className={`${style.inputArea} ${props.narrow && style.narrow}`}>
            <button className={style.formButton}>{props.button}</button>
        </div>
    );
}

export default FormButton;