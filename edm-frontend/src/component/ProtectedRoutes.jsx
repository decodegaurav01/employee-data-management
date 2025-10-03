import React from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoutes = ({ children }) => {
    const user = localStorage.getItem("company_name"); // or "token"

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoutes;
