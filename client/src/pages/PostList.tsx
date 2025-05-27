import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PostsService, PostResponse } from '../api';
import {usePostStore} from "../stores/usePostStore";

function PostList() {
    const { posts, fetchPosts, deletePost } = usePostStore();
    const navigate = useNavigate();
    useEffect(() => {
        fetchPosts();
    }, []);

    const handleDelete = async (id: string) => {
        await deletePost(id);
    };

    return (
        <div>
            <h1>Posts</h1>
            <Link to="/create">+ New Post</Link>
            <ul>
                {posts.map(post => (
                    <li key={post._id}>
                        <span>{post._id}</span>
                        <strong>{post.title}</strong>
                        <button onClick={() => navigate(`/edit/${post._id}`)}>Edit</button>
                        <button onClick={() => handleDelete(post._id)}>Delete</button>
                    </li>
                ))}
            </ul>

        </div>
    );
}

export default PostList;
