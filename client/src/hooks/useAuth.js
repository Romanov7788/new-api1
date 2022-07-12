import { useContext } from "react";
import { AuthContext } from "../hooks/AuthProvider";

export function useAuth() {
    return useContext(AuthContext);
}