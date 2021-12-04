import React, { useEffect, useState } from "react";
import style from "./main-list.module.scss";
import Card from "../card/Card";
import UserService from "../../services/UserService";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "./animation.css";
import Loader from "../loader/Loader";
import { useAuth } from "../../hooks/useAuth.hook";

const MainList = (props) => {
	const [rerender, setRerender] = useState(0);
	const [vacations, setVacations] = useState([]);
	const [download, setDownload] = useState(false);
	const {loading} = useAuth();

	useEffect(async () => {
		setDownload(true);
		const data = await UserService.getVacations();
		setVacations(data);
		setDownload(false);
	}, [rerender]);

	const cards = vacations.map((vacation, i) => (
		<CSSTransition in={vacations} key={i} timeout={500} classNames="item">
			<Card
				key={vacation._id}
				vacation={vacation}
				setRerender={setRerender}
				rerender={rerender}
			/>
		</CSSTransition>
	));
	return (
		<div className={style.mainContainer}>
			{download || loading ? <Loader/> : ''}
			<TransitionGroup className={style.mainList}>
				{vacations && cards}
			</TransitionGroup>
		</div>
	);
}

export default MainList;
