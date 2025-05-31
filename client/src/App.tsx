import {BrowserRouter, Routes, Route, useNavigate, Outlet} from 'react-router-dom';
import PostList from './pages/PostList';
import PostForm from "./pages/PostForm";
import PostEdit from "./pages/PostEdit";
import LoginPage from "./pages/auth/LoginPage";
import AuthGuard from   "./components/AuthGuard"
import RegisterPage from "./pages/auth/RegisterPage";
import "./api/utils/axios";




function LogoutLayer() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <>
            {token && (
                <div style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            )}
            <Outlet />
        </>
    );
}
function App() {
    return (

        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                <Route element={<AuthGuard />}>
                    <Route element={<LogoutLayer/>}>

                        <Route path="/" element={<PostList />} />
                        <Route path="/create" element={<PostForm />} />
                        <Route path="/edit/:id" element={<PostEdit />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;