// src/layouts/MainLayout.tsx
import { Outlet } from 'react-router-dom';
import { LogoutButton } from '../components/LogoutBtn';

export function MainLayout() {
    return (
        <>
            <div style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
                <LogoutButton />
            </div>
            <Outlet />
        </>
    );
}
