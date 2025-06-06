import { create } from 'zustand';
import { Api } from '../../Api';

export const api = new Api({
    baseUrl: 'http://localhost:8000',
    baseApiParams: {
        credentials: 'include',
    },
});

interface AuthState {
    login: (credentials: { email: string; password: string }) => Promise<void>;
    logout: () => Promise<void>;
    isAuthenticated: boolean;
    loading: boolean;
    checkSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    loading: true,

    login: async (credentials) => {
        const { csrfToken } = await api.auth.authControllerGetCsrfToken().then(r => r.data);
        await api.auth.authControllerLogin(credentials, {
            headers: { 'X-CSRF-Token': csrfToken }
        });

        set({ isAuthenticated: true });
    },


    logout: async () => {
        const { csrfToken } = await api.auth.authControllerGetCsrfToken().then(r => r.data);

        await api.auth.authControllerLogout({
            credentials: 'include',
            headers: {
                'X-CSRF-Token': csrfToken,
            },
        });
        set({ isAuthenticated: false });
    },

    checkSession: async () => {
        set({ loading: true });
        try {
            const {
                data: { csrfToken },
            } = await api.auth.authControllerGetCsrfToken();
            set({ csrfToken });

            const response  = await api.auth.authControllerMe();
            const user = await response.json(); // ✅ THIS is what you're missing

            console.log('[checkSession] User is authenticated:', user);

            set({ isAuthenticated: true });
        } catch (err) {
            console.warn('[checkSession] failed:', err);
            set({ isAuthenticated: false });
        } finally {
            set({ loading: false });
        }
    },


}));
