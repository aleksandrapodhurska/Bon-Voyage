import React, { useState } from "react";
import style from "./header.module.scss";
import profileIcon from "../../assets/images/user.png";
import { useAuth } from "../../hooks/useAuth.hook";
import { Link, useLocation } from "react-router-dom";
import BurgerMenu from "../../elements/burger-menu/BurgerMenu";

function Header() {
	const { logout, authStatus, user } = useAuth();

	const submit = () => {
		setOpen(false);
		logout();
	};
	const location = useLocation();

	const [isOpen, setOpen] = useState(false);

	const handleIsOpen = () => {
		setOpen(!isOpen);
	};

	const closeSideBar = () => {
		setOpen(false);
	};

	const adminNav = (
		<>
			<Link to="/main" className="bm-item" onClick={closeSideBar}>
				Main
			</Link>
			<Link to="/new-vacation" className="bm-item" onClick={closeSideBar}>
				Add vacation
			</Link>
			<Link to="/report" className="bm-item" onClick={closeSideBar}>
				Report
			</Link>
		</>
	);

	const notLogged = (
		<>
			{location.pathname == "/login" ? (
				<Link to="/registration">Registration</Link>
			) : (
				<Link to="/login">Login</Link>
			)}
		</>
	);

	return (
		<div className={style.header}>
			<div className={style.user}>
				{user.username && (
					<div className={style.profileIcon}>
						<img src={profileIcon} />
					</div>
				)}
				<div className={style.profileName}>
					Hi {user.username ? user.username : user}!
				</div>
			</div>
			<div className={style.logo}>BonVoyage</div>

			<div className={style.nav}>
				{!authStatus && notLogged}
				{authStatus == 200 && user.role == "admin" && (
					<BurgerMenu
						isOpen={isOpen}
						handleIsClose={handleIsOpen}
						handleIsOpen={handleIsOpen}
						submit={submit}
					>
						{adminNav}
					</BurgerMenu>
				)}
				{authStatus == 200 && user.role == "user" && (
					<a onClick={() => logout()}>Logout</a>
				)}
			</div>
		</div>
	);
}

export default Header;
