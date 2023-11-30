import React, { useState, useEffect } from "react";
import FormInput from "../../elements/form-input/FormInput";
import FormButton from "../../elements/form-button/FormButton";
import style from "./vacation-form.module.scss";
import AdminService from "../../services/AdminService";
import Modal from "../modal/Modal";
import { useAuth } from "../../hooks/useAuth.hook";
import UserService from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import Loader from "../loader/Loader";

function VacationForm(props) {
	const navigate = useNavigate();

	const { vacationToUpdate, setVacationToUpdate } = useAuth();
	const [action, setAction] = useState("create");
	const [loading, setLoading] = useState(false);

	useEffect(async () => {
		if (vacationToUpdate) {
			setLoading(true);
			setAction("update");
			const data = await UserService.getVacation(vacationToUpdate);
			setVacationData({
				...data,
				dateTo: data?.dateTo.slice(0, 10),
				dateFrom: data?.dateFrom.slice(0, 10),
			});
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		return () => {
			setVacationToUpdate(null);
			setVacationData(initialState);
		};
	}, []);

	const initialState = {
		destination: "",
		country: "",
		description: "",
		image: "",
		price: "",
		dateFrom: "",
		dateTo: "",
	};

	const [vacationData, setVacationData] = useState(initialState);

	const vacationDataHandler = (e) => {
		setVacationData({
			...vacationData,
			[e.target.name]: e.target.value,
		});
	};

	const [added, setAdded] = useState(false);

	const saveChanges = async () => {
		let data;
		if (vacationToUpdate) {
			setLoading(true);
			data = await AdminService.updateVacation(
				vacationData,
				vacationToUpdate
			);
			setLoading(false);
		} else {
			setLoading(true);
			data = await AdminService.createVacation(vacationData);
			setLoading(false);
		}
		if (!data) {
			setAdded(false);
		} else if (data.status === 201) {
			setAdded(true);
		}
		setVacationToUpdate(null);
	};

	const leaveWithoutChanges = () => {
		setVacationToUpdate(null);
		setVacationData(initialState);
		navigate("/main");
	};

	const today = new Date().toISOString().split("T")[0];

	return (
		<div className={style.background}>
			<div className={style.formContainer}>
				{loading && <Loader/>}
				{!loading && added && <Modal action={action} />}
				{action === "create" && <h3>Create new Vacation</h3>}
				{action === "update" && <h3>Update Vacation</h3>}
				<form
					className={style.form}
					onSubmit={(e) => e.preventDefault()}
				>
					<FormInput
						type="text"
						placeholder="Destination"
						name="destination"
						onChange={vacationDataHandler}
						value={vacationData.destination}
					/>
					<FormInput
						type="text"
						placeholder="Country"
						name="country"
						onChange={vacationDataHandler}
						value={vacationData.country}
					/>
					<FormInput
						input="textarea"
						type="text"
						placeholder="Description"
						name="description"
						onChange={vacationDataHandler}
						value={vacationData.description}
					/>
					<FormInput
						type="url"
						placeholder="Image URL"
						name="image"
						onChange={vacationDataHandler}
						value={vacationData.image}
					/>
					<FormInput
						type="date"
						placeholder="Date From"
						name="dateFrom"
						min={today}
						step={1}
						onChange={vacationDataHandler}
						value={vacationData.dateFrom ? vacationData.dateFrom : ''}
					/>
					<FormInput
						type="date"
						placeholder="Date To"
						name="dateTo"
						min={today}
						step={1}
						onChange={vacationDataHandler}
						value={vacationData.dateTo ? vacationData.dateTo : ''}
					/>
					<FormInput
						type="number"
						placeholder="Price (USD)"
						name="price"
						min={10}
						onChange={vacationDataHandler}
						value={vacationData.price}
					/>
					<FormButton
						button="Save"
						narrow="true"
						onClick={saveChanges}
						disabled={loading}
					/>
					<FormButton
						button="Leave without changes"
						narrow="true"
						onClick={leaveWithoutChanges}
						disabled={loading}
					/>
				</form>
			</div>
		</div>
	);
}

export default VacationForm;
