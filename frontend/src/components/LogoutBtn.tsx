import { useAuthStore } from "../stores/AuthStore";
import { useNavigate } from "react-router-dom";

export function LogoutButton() {
    const navigate = useNavigate();

    const logout = useAuthStore((s) => s.logout);

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    );
}
