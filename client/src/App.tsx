import {BrowserRouter, Routes, Route, useNavigate, Outlet} from 'react-router-dom';
import PostList from './pages/PostList';
import PostForm from "./pages/PostForm";
import PostEdit from "./pages/PostEdit";
import LoginPage from "./pages/auth/LoginPage";
import AuthGuard from   "./components/AuthGuard"
import RegisterPage from "./pages/auth/RegisterPage";
import {MainLayout} from "./layouts/MainLayout";

function App() {
    return (

        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                <Route element={<AuthGuard />}>
                    <Route element={<MainLayout />}>

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