import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PostsService } from '../api';
import { Create_Post_Schema_Requirements } from '../api';

function PostForm() {
    const navigate = useNavigate();
    type PostType = Create_Post_Schema_Requirements['type'];

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [type, setType] = useState<PostType>('Article' as PostType);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await PostsService.postsControllerStore({ title, content, type });
            navigate('/');
        } catch (err) {
            console.error('Failed to create post:', err);
        }
    };

    return (
        <div>
            <h2>Create New Post</h2>
            <form onSubmit={handleSubmit}>
                <input
                    required
                    placeholder="Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <br />
                <textarea
                    placeholder="Content"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                />
                <br />
                <select value={type} onChange={e => setType(e.target.value as any)}>
                    <option value="Article">Article</option>
                    <option value="Announcement">Announcement</option>
                    <option value="Tutorial">Tutorial</option>
                </select>
                <br />
                <button type="submit">Create</button>
            </form>
        </div>
    );
}

export default PostForm;
