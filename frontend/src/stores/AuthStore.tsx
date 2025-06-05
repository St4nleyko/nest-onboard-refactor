import { create } from 'zustand';
import { Api } from '../../Api';

const token = localStorage.getItem('token');

// 🔹 Single global instance of API
export const api = new Api({
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:8000',
    baseApiParams: {
        secure: true,
    },
    securityWorker: (token) =>
        token ? { headers: { Authorization: `Bearer ${token}` } } : {},
});

api.setSecurityData(token);

interface AuthState {
    token: string | null;
    setToken: (token: string) => void;
    clearToken: () => void;
    isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
    token,

    setToken: (token) => {
        localStorage.setItem('token', token);
        api.setSecurityData(token);
        set({ token });
    },

    clearToken: () => {
        localStorage.removeItem('token');
        api.setSecurityData(null);
        set({ token: null });
    },

    isAuthenticated: () => !!get().token,
}));
