import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.hook";

function RequireAuth({ children }) {
	const { authStatus } = useAuth();

	if (!authStatus) {
		return <Navigate to={"/login"} />;
	}
	return children;
}

export default RequireAuth;
