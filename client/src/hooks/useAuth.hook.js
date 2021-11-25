import React, {useState, useEffect, createContext, useContext, useCallback} from "react";
import DataBase from "../ajax/ajax";
import axios from "axios";
import {useLocation, useNavigate} from "react-router";

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
    const {state} = useLocation();
    const [user, setUser] = useState("guest");
    const [authStatus, setAuthStatus] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const refreshToken = async () => {
            if (localStorage.getItem("accessToken")) {
                try {
                    const response = await axios.get(
                        `http://localhost:5000/api/refreshToken`,
                        {withCredentials: true}
                    );
                    console.log(response);
                    if (response.status == 200) {
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
                    }
                } catch (e) {
                    console.log(e.response?.data?.message);
                    setAuthStatus(e.response?.data?.message);
                } finally {
                    setLoading(false);
                }
            }
        };
        refreshToken();
    }, []);

    async function login(userdata) {
        setLoading(true);
        try {
            const response = await DataBase.login(userdata);
            // console.log(response);
            if (response.status == 200) {
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
            console.log(e.response?.data?.message);
            setAuthStatus(e.response?.data?.message);
            setLoading(false);
        }
    }

    const registration = async (userdata) => {
        setLoading(true);
        try {
            const response = await DataBase.registration(userdata);
            console.log(response);
            if (response.status == 200) {
                setUser(response.data.user)
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
            console.log(e.response?.data?.message);
            console.log(e.response?.data?.message);
            setAuthStatus(e.response?.data?.message);
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);
        try {
            const response = await DataBase.logout();
            if (response.status == 200) {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("user");
                setUser("guest");
                setAuthStatus("");
                navigate("/");
            }
        } catch (e) {
            console.log(e.response?.data?.message);
            setAuthStatus(e.response?.data?.message);
            setLoading(false);
        }
    };

    return { login, registration, logout, authStatus, loading, user };
};
