import { useLogout } from '../hooks/logoutFn';

export function LogoutButton() {
    const logout = useLogout();

    return (
        <button onClick={logout}>
            Logout
        </button>
    );
}
