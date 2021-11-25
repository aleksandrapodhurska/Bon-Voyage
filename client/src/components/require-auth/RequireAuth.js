import React from 'react';
import {Navigate, useLocation} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth.hook";

function RequireAuth({children}) {
    const {authStatus, user} = useAuth();

    const location = useLocation();
    if (!authStatus) {
        return <Navigate to={"/login"}/>
    }
    return children;
}

export default RequireAuth;