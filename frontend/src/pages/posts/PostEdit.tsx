import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {api, useAuthStore} from '../../stores/AuthStore';
import type {
    CreatePostSchemaRequirements,
    PostResponse,
} from '../../../Api';

function PostEdit() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [type, setType] = useState<CreatePostSchemaRequirements['type']>('Article');

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Load post by ID on mount
    useEffect(() => {
        if (!id) return;
        const load = async () => {
            try {
                const res = await api.posts.postsControllerShow(id);
                const post: PostResponse = res.data;
                setTitle(post.title);
                setContent(post.content ?? '');
                setType(post.type);
            } catch (err) {
                console.error('Failed to fetch post:', err);
                setError('Post not found');
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [id]);

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id) return;
        try {
            const csrfToken = useAuthStore.getState().csrfToken;

            await api.posts.postsControllerUpdate(id, { title, content, type },{
                headers: {
                    'X-CSRF-Token': csrfToken,
                }
            });
            navigate('/');
        } catch (err) {
            console.error('Update failed:', err);
            alert('Failed to update post');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Edit Post</h2>
            <form onSubmit={handleSubmit}>
                <input
                    required
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <br />
                <textarea
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <br />
                <select value={type} onChange={(e) => setType(e.target.value as any)}>
                    <option value="Article">Article</option>
                    <option value="Announcement">Announcement</option>
                    <option value="Tutorial">Tutorial</option>
                </select>
                <br />
                <button type="submit">Update</button>
            </form>
        </div>
    );
}

export default PostEdit;
