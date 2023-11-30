import React, { useEffect, useState } from "react";
import style from "./main-list.module.scss";
import Card from "../card/Card";
import UserService from "../../services/UserService";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "./animation.css";
import Loader from "../loader/Loader";
import { useAuth } from "../../hooks/useAuth.hook";
import SearchBar from "../../elements/search-bar/SearchBar";

const MainList = (props) => {
	const [rerender, setRerender] = useState(0);
	const [vacations, setVacations] = useState([]);
	const [filteredVacations, setFilteredVacations] = useState([]);
	const [download, setDownload] = useState(false);
	const [searchValue, setSearchValue] = useState("");
	const { loading } = useAuth();

	const getVacations = async () => {
		const data = await UserService.getVacations();
		setVacations(data);
		setFilteredVacations(data);
	};

	useEffect(async () => {
		setDownload(true);
		getVacations();
		setDownload(false);
	}, [rerender]);

	const filterVacation = () => {
		setFilteredVacations(
			vacations.filter((vacation) =>
				vacation.description
					.toLowerCase()
					.includes(searchValue.toLowerCase()) ||
				vacation.country
					.toLowerCase()
					.includes(searchValue.toLowerCase())
					? vacation
					: ""
			)
		);
	};

	const clearSearch = () => {
		setSearchValue("");
		getVacations();
	};

	const cards = filteredVacations.map((vacation, i) => (
		<CSSTransition in={!!vacations.length} key={i} timeout={500} classNames="item">
			<Card
				key={vacation._id}
				vacation={vacation}
				setRerender={setRerender}
				rerender={rerender}
				searchValue={searchValue}
			/>
		</CSSTransition>
	));
	return (
		<div className={style.mainContainer}>
			<SearchBar
				setSearchValue={setSearchValue}
				searchValue={searchValue}
				filterVacation={filterVacation}
				clearSearch={clearSearch}
			/>
			{download || loading ? <Loader /> : ""}
			<TransitionGroup className={style.mainList}>
				{filteredVacations && cards}
			</TransitionGroup>
		</div>
	);
};

export default MainList;
