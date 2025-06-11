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
const getCsrfToken = async () => {
    return await api.auth.authControllerGetCsrfToken().then(r => r.data);
}

export const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    loading: true,

    login: async (credentials) => {
        try {
            const {csrfToken} = await getCsrfToken();
            await api.auth.authControllerLogin(credentials, {
                headers: { 'X-CSRF-Token': csrfToken }
            });
            set({ loading: false, isAuthenticated: true });
        } catch (error) {
            console.error('[login] failed:', error);
            set({ loading: false, isAuthenticated: false });
            throw error;
        }
    },

    logout: async () => {
        try {
            const {csrfToken} = await getCsrfToken();
            await api.auth.authControllerLogout({
                headers: {
                    'X-CSRF-Token': csrfToken,
                },
            });
        } catch (error) {
            console.error('[logout] failed:', error);
        }
        finally {
            set({ isAuthenticated: false });
        }

    },

    checkSession: async () => {
        set({ isAuthenticated: false });
        try {
            const {csrfToken} = await getCsrfToken();
            set({ csrfToken });
            const response  = await api.auth.authControllerMe();
            const user = await response.json();
            if (!user || !user.userId) {
                throw new Error('Invalid user data received');
            }
            set({ isAuthenticated: true });
        }
        catch (err) {
            console.warn('[checkSession] failed:', err);
        }
        finally {
            set({ loading: false });
        }
    },


}));
