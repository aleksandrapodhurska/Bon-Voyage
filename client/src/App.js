import React from "react";
import style from "./app.module.scss";
import Header from "./components/header/Header";
import MainList from "./components/main-list/MainList";
import AuthenticationForm from "./components/authentication-form/AuthenticationForm";
import VacationForm from "./components/vacation-form/VacationForm";
import { Route, Routes } from "react-router-dom";
import Login from "./components/authentication-form/Login";
import Registration from "./components/authentication-form/Registration";
import Report from "./components/report/Report";
import RequireAuth from "./components/require-auth/RequireAuth";

const App = () => {
	return (
		<div className={style.app}>
			<div className={style.container}>
				<Header />
				<Routes>
					<Route
						path="/main"
						element={
							<RequireAuth>
								<MainList />
							</RequireAuth>
						}
					/>
					<Route path="/" element={<AuthenticationForm />} />
					<Route path="login" element={<Login />} />
					<Route path="registration" element={<Registration />} />
					<Route
						path="/new-vacation"
						element={
							<RequireAuth>
								<VacationForm />
							</RequireAuth>
						}
					/>
					<Route
						path="/report"
						element={
							<RequireAuth>
								<Report />
							</RequireAuth>
						}
					/>
				</Routes>
			</div>
		</div>
	);
};

export default App;
