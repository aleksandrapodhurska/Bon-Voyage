import React from "react";
import style from "../form-input/formInput.module.scss";

function FormButton(props) {
	return (
		<div className={`${style.inputArea} ${props.narrow && style.narrow}`}>
			<button className={style.formButton} onClick={props.onClick} disabled={props.disabled}>
				{props.button}
			</button>
		</div>
	);
}

export default FormButton;
