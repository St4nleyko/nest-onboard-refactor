import { create } from 'zustand';
import {PostsService, PostResponse, Create_Post_Schema_Requirements} from '../api';

interface PostStore {
    posts: PostResponse[];
    loading: boolean;
    selectedPost: PostResponse | null;

    fetchPosts: () => Promise<void>;
    fetchPost: (id:string) => Promise<void>;

    deletePost: (id: string) => Promise<void>;
    addPost: (post: Create_Post_Schema_Requirements) => Promise<void>;
    updatePost: (id, post: Create_Post_Schema_Requirements) => Promise<void>;

    setPosts: (posts: PostResponse[]) => void;


}

export const usePostStore = create<PostStore>((set, get) => ({
    posts: [],
    loading: false,
    selectedPost: null,

    fetchPosts: async () => {
        set({ loading: true });
        const data = await PostsService.postsControllerIndex();
        set({ posts: data, loading: false });
    },

    fetchPost: async (id) => {
        set({ loading: true });
        const data = await PostsService.postsControllerShow(id);
        set({ selectedPost: data, loading: false });
    },


    addPost: async (data) => {
        const createdPost = await PostsService.postsControllerStore(data);
        set((state) => ({
            posts: [createdPost, ...state.posts],
        }));
    },

    updatePost: async (id,data) => {
        const updatedPost = await PostsService.postsControllerUpdate(id,data);
        set((state) => ({
            posts: [updatedPost, ...state.posts],
        }));
    },

    deletePost: async (id) => {
        await PostsService.postsControllerDestroy(id);
        set({
            posts: get().posts.filter((p) => p._id !== id),
        });
    },

    setPosts: (posts) => set({ posts }),
}));
