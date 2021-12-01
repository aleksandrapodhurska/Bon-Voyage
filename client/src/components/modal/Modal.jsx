import React from "react";
import style from "./modal.module.scss";
import { useNavigate } from "react-router-dom";
import FormButton from "../../elements/form-button/FormButton";

function Modal({ action }) {
	const navigate = useNavigate();

	return (
		<div className={style.modal}>
			<div className={style.modalDialog}>
				<div className={style.modalContent}>
					<p className={style.modalTitle}>
						Vacation {action == "created" ? "created" : "updated"}
					</p>
					<FormButton button="Ok" onClick={() => navigate("/main")} />
				</div>
			</div>
		</div>
	);
}

export default Modal;
