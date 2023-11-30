import React, { useState } from "react";
import style from "./card.module.scss";
import {
	BsFillPencilFill,
	BsHeart,
	BsHeartFill,
	BsXCircleFill,
} from "react-icons/bs";
import UserService from "../../services/UserService";
import { useAuth } from "../../hooks/useAuth.hook";
import "../main-list/animation.css";
import { CSSTransition } from "react-transition-group";
import AdminService from "../../services/AdminService";
import { useNavigate } from "react-router-dom";

function Card({ vacation, setRerender, rerender, searchValue }) {
	const { user, setVacationToUpdate } = useAuth();
	const {_id, destination, country, description, image, price, dateFrom, dateTo, followers } = vacation;
	const [showMore, setShowMore] = useState(false);
	const navigate = useNavigate();

	const initialState = followers.includes(user.id);
	const [like, setLike] = useState(initialState);
	const [followersQty, setFollowersQty] = useState(followers.length);

	const toggleShowMore = () => {
		setShowMore(!showMore);
	};

	const toggleFollowing = async () => {
		const data = await UserService.toggleFollowing(_id, user.id);
		setLike(data.followers.includes(user.id));
		setFollowersQty(data.followers.length);
		if(!searchValue) {
			setRerender(rerender + 1);
		}
	};

	const deleteVacation = async (id) => {
		await AdminService.deleteVacation(id);
		setRerender(rerender + 1);
	};

	const updateVacation = (id) => {
		setVacationToUpdate(id);
		navigate("/new-vacation");
	};

	const likeArea = (
		<>
			<div className={style.likes}>
				<span>{followersQty}</span>
				<button onClick={toggleFollowing}>
					{like ? <BsHeartFill /> : <BsHeart />}
				</button>
			</div>
		</>
	);

	const adminArea = (
		<>
			<div className={style.adminPanel}>
				<button onClick={() => deleteVacation(_id)}>
					<BsXCircleFill />
				</button>
				<button onClick={() => updateVacation(_id)}>
					<BsFillPencilFill />
				</button>
			</div>
		</>
	);

	const backgroundStyle = {
		backgroundImage: `url(${
			image !== "url"
				? image
				: "https://www.voyagesdereve.ch/upload/images/Paris-Tour-Eiffel.jpg"
		})`,
	};

	return (
		<CSSTransition timeout={300} classNames="alert" in={like}>
			<div className={style.card}>
				<div className={`${style.media} ${showMore && style.disable}`}>
					<div className={style.background} style={backgroundStyle}>
						{user.role === "user" ? likeArea : adminArea}
						<div className={style.price}>
							<span>$ {price}</span>
						</div>
					</div>
				</div>
				<div className={`${style.content} ${showMore && style.active}`}>
					<div className={style.contentWrapper}>
						<div className={style.info}>
							<div className={style.title}>{destination}</div>
							<span className={style.subtitle}>{country}</span>
							<div className={style.dates}>
								{dateFrom.slice(0, 10)} - {dateTo.slice(0, 10)}
							</div>
						</div>
						<div className={style.moreInfo}>
							<button onClick={toggleShowMore}>
								{showMore ? "Less details" : "More Details"}
							</button>
						</div>
					</div>
					{showMore && (
						<div className={style.description}>{description}</div>
					)}
				</div>
			</div>
		</CSSTransition>
	);
}

export default Card;
