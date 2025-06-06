import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../stores/AuthStore';
import type { PostResponse } from '../../../Api';
import {LogoutButton} from "../../components/LogoutBtn";

function PostList() {
    const [posts, setPosts] = useState<PostResponse[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await api.posts.postsControllerIndex();
                console.log(res)
                setPosts(res.data);
            } catch (err) {
                console.error('Failed to fetch posts:', err);
            }
        };
        fetchPosts();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await api.posts.postsControllerDestroy(id);
            setPosts((prev) => prev.filter((p) => p.id !== id));
        } catch (err) {
            console.error('Failed to delete post:', err);
        }
    };

    return (
        <div>
            <h1>Posts</h1>
            <Link to="/create">+ New Post</Link>
            <ul>
                {posts.map((post) => (
                    <li key={post._id}>
                        <span>{post._id}</span>
                        <strong>{post.title}</strong>
                        <button onClick={() => navigate(`/edit/${post._id}`)}>Edit</button>
                        <button onClick={() => handleDelete(post._id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <LogoutButton />

        </div>
    );
}

export default PostList;
