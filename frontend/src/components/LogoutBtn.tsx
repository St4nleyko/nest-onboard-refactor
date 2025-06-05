import {useAuthStore} from "../stores/AuthStore";
import {useNavigate} from "react-router-dom";

export function LogoutButton() {
    const navigate = useNavigate();

    const clearToken = useAuthStore((s) => s.clearToken);
    const handleLogout = () => {
        clearToken();
        navigate('/login');
    };
    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    );
}
