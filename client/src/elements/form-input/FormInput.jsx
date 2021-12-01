import React from "react";
import style from "./formInput.module.scss";

function FormInput(props) {
	return (
		<div
			className={`${style.inputArea} ${
				props.type === "date" ? style.narrow : ""
			}`}
		>
			{props.input === "textarea" ? (
				<textarea
					className={style.effect}
					required
					name={props.name}
					onChange={props.onChange}
					value={props.value}
				></textarea>
			) : (
				<input
					type={props.type}
					className={style.effect}
					required
					name={props.name}
					onChange={props.onChange}
					value={props.value}
					min={props.min}
				/>
			)}
			<span className={style.floatingLabel}>{props.placeholder}</span>
			<span className={style.focusBorder}>
				<i></i>
			</span>
		</div>
	);
}

export default FormInput;
