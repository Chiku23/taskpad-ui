import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../features/auth/hooks/useAuth";

export const ProtectedRoute = () => {
    const {isAuthenticated} = useAuth();
    const token = localStorage.getItem("token")

    if(!token || !isAuthenticated){
        return <Navigate to={"/login"} replace/>
    }

    return <Outlet />
}