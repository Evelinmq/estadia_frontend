import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Auth/AuthContext.jsx";


function ProtectedRoutes({ allowedRoles }) {
    const {user} = useContext(AuthContext);
    
    if (!user) {
        return <Navigate to="/" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.tipoUsuario)) {
        return <Navigate to="/" replace />
    }

    return <Outlet/>
}

export default ProtectedRoutes;