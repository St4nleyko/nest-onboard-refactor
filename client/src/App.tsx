import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PostList from './pages/PostList';
import PostForm from "./pages/PostForm";
import PostEdit from "./pages/PostEdit";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PostList />} />
                <Route path="/create" element={<PostForm />} />
                <Route path="/edit/:id" element={<PostEdit />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;