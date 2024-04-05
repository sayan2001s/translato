import { useEffect } from "react";
import { useUserStore } from "../store/user-store";

const AuthProvider = ({ children }) => {
    const { user, fetchUser } = useUserStore();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            fetchUser(token);
        }
    }, [fetchUser]);

    return <>{user && children}</>;
};

export default AuthProvider;