import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {Create_Post_Schema_Requirements, PostsService} from '../api';

function PostEdit() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    type PostType = Create_Post_Schema_Requirements['type'];

    const [type, setType] = useState<PostType>('Article' as PostType);

    useEffect(() => {
        if (id) {
            PostsService.postsControllerShow(id)
                .then(post => {
                    setTitle(post.title);
                    setContent(post.content ?? '');
                    setType(post.type);
                })
                .catch(err => {
                    console.error('Post not found:', err);
                });
        }
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await PostsService.postsControllerUpdate(id!, { title, content, type });
            navigate('/');
        } catch (err) {
            console.error('Update failed:', err);
        }
    };

    return (
        <div>
            <h2>Edit Post</h2>
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
                <button type="submit">Update</button>
            </form>
        </div>
    );
}

export default PostEdit;
