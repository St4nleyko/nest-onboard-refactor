import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PostList from "./pages/posts/PostList";
import AuthGuard from "./components/AuthGuard";
import {LoginPage} from "./pages/LoginPage";
import PostForm from "./pages/posts/PostForm";
import PostEdit from "./pages/posts/PostEdit";
import {useEffect} from "react";
import {useAuthStore} from "./stores/AuthStore";

function App() {

    const checkSession = useAuthStore((s) => s.checkSession);
    const loading = useAuthStore((s) => s.loading);

    useEffect(() => {
        checkSession();
    }, []);

    if (loading) return <div>Loading session...</div>;
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route element={<AuthGuard />}>
                    <Route path="/" element={<PostList />} />
                    <Route path="/create" element={<PostForm />} />
                    <Route path="/edit/:id" element={<PostEdit />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
export default App;