import { useLocation, Navigate } from "react-router-dom";
import {useAuth} from "./useAuth";

export const RequireAuth = ({ children }) => {
    const location = useLocation();
    const {user} = useAuth();

    if (!user) {
        return <Navigate to="/api/login" state={{ from: location }} replace />

    }
    return children;
}

// export { RequireAuth };