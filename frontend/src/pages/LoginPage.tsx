import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore, api } from '../stores/AuthStore';

export function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const setToken = useAuthStore((s) => s.setToken);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await api.auth.authControllerLogin({ email, password });
            setToken(res.data.access_token);
            navigate('/');
        } catch (error) {
            alert('Login failed');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
            <button type="submit">Login</button>
        </form>
    );
}
