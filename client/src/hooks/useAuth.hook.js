import React, { useState, useEffect, createContext, useContext } from "react";
import DataBase from "../ajax/ajax";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Context = createContext();

export const ProvideAuth = ({ children }) => {
	const auth = useProvideAuth();
	return <Context.Provider value={auth}>{children}</Context.Provider>;
};

export const useAuth = () => {
	return useContext(Context);
};

const useProvideAuth = () => {
	const navigate = useNavigate();
	const [user, setUser] = useState("guest");
	const [authStatus, setAuthStatus] = useState("");
	const [loading, setLoading] = useState(false);
	const [vacationToUpdate, setVacationToUpdate] = useState(null);

	useEffect(() => {
		setLoading(false);
		const refreshToken = async () => {
			if (localStorage.getItem("accessToken")) {
				try {
					setLoading(true);
					const response = await axios.get(
						`http://localhost:5000/api/refreshToken`,
						{ withCredentials: true }
					);
					if (response.status === 200) {
						setUser(response.data.user);
						setAuthStatus(200);
						localStorage.setItem(
							"accessToken",
							response.data.accessToken
						);
						localStorage.setItem(
							"user",
							JSON.stringify(response.data.user)
						);
						navigate("/main");
						setLoading(false);
					}
				} catch (e) {
					setAuthStatus(e.response?.data?.message);
				} finally {
					setLoading(false);
				}
			}
		};
		refreshToken();
	}, []);

	const login = async (userdata) => {
		setLoading(true);
		try {
			setAuthStatus("");
			const response = await DataBase.login(userdata);
			if (response.status === 200) {
				setUser(response.data.user);
				setAuthStatus(200);
				localStorage.setItem("accessToken", response.data.accessToken);
				localStorage.setItem(
					"user",
					JSON.stringify(response.data.user)
				);
				setLoading(false);
				navigate("/main");
			}
		} catch (e) {
			setAuthStatus(e.response?.data?.message);
			setLoading(false);
		}
	};

	const registration = async (userdata) => {
		setLoading(true);
		try {
			setAuthStatus("");
			const response = await DataBase.registration(userdata);
			if (response.status === 200) {
				setUser(response.data.user);
				setAuthStatus(200);
				localStorage.setItem("accessToken", response.data.accessToken);
				localStorage.setItem(
					"user",
					JSON.stringify(response.data.user)
				);
				setLoading(false);
				navigate("/main");
			}
		} catch (e) {
			setAuthStatus(e.response?.data?.message);
			setLoading(false);
		}
	};

	const logout = async () => {
		setLoading(true);
		try {
			const response = await DataBase.logout();
			if (response.status === 200) {
				localStorage.removeItem("accessToken");
				localStorage.removeItem("user");
				setAuthStatus("");
				setUser("guest");
				navigate("/");
				setLoading(false);
			}
		} catch (e) {
			setAuthStatus(e.response?.data?.message);
			setLoading(false);
		}
	};

	return {
		login,
		registration,
		logout,
		authStatus,
		setAuthStatus,
		loading,
		user,
		setVacationToUpdate,
		vacationToUpdate,
	};
};
