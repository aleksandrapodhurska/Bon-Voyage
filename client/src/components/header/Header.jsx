import React from "react";
import style from "./header.module.scss";
import profileIcon from "../../assets/images/user.png";
import { useAuth } from "../../hooks/useAuth.hook";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Header() {
	const { logout, authStatus, user } = useAuth();

	const navigate = useNavigate();
	const submit = () => {
		logout();
	};
	const location = useLocation();

	const adminNav = (
		<>
			<Link to="/main">Main</Link>
			<Link to="/new-vacation">Add vacation</Link>
			<Link to="/report">Report</Link>
		</>
	);

	const notLogged = (
		<>
			{location.pathname == '/login' ? 
				<Link to="/registration">Registration</Link> :
				<Link to="/login">Login</Link>
			}
		</>
	);

	return (
		<div className={style.header}>
			<div className={style.user}>
				<div className={style.profileIcon}>
					<img src={profileIcon} />
				</div>
				<div>Hi {user.username ? user.username : user}!</div>
			</div>
			<div className={style.logo}>BonVoyage</div>

			<div className={style.nav}>
				<nav className={style.links}>
					{authStatus && user.role == "admin" && adminNav}
					{!authStatus && notLogged}
					{authStatus && <a onClick={submit}>Logout</a>}
				</nav>
			</div>
		</div>
	);
}

export default Header;
