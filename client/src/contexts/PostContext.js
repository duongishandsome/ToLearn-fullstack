import { createContext, useReducer, useState } from 'react';
import { postReducer } from '../reducers/postReducer';
import {
    apiUrl,
    POST_LOADED_SUCCESS,
    POST_LOADED_FAIL,
    ADD_POST,
    DELETE_POST,
    UPDATE_POST,
    FIND_POST,
} from './constant';
import axios from 'axios';

export const PostContext = createContext();

function PostContextProvider({ children }) {
    const [postState, dispatch] = useReducer(postReducer, { posts: [], postsLoading: true, post: null });

    const [showAddPostModal, setShowAddPostModal] = useState(false);
    const [showUpdatePostModal, setShowUpdatePostModal] = useState(false);
    const [showToast, setShowToast] = useState({ show: false, message: '', type: null });

    // get all post
    const getPosts = async () => {
        try {
            const response = await axios.get(`${apiUrl}/posts`);
            if (response.data.success) {
                dispatch({ type: POST_LOADED_SUCCESS, payload: response.data.posts });
            }
        } catch (error) {
            dispatch({ type: POST_LOADED_FAIL });
        }
    };

    //add post
    const addPost = async (newPost) => {
        try {
            const response = await axios.post(`${apiUrl}/posts`, newPost);
            if (response.data.success) {
                dispatch({ type: ADD_POST, payload: response.data.post });
                return response.data;
            }
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'server error' };
        }
    };

    // delete post
    const deletePost = async (postId) => {
        try {
            const response = await axios.delete(`${apiUrl}/posts/${postId}`);
            if (response.data.success) {
                dispatch({ type: DELETE_POST, payload: postId });
            }
        } catch (error) {
            console.log(error);
        }
    };

    // find post when user is updating post
    const findPost = (postId) => {
        const post = postState.posts.find((post) => post._id === postId);
        dispatch({ type: FIND_POST, payload: post });
    };

    // update post
    const updatePost = async (updatePost) => {
        try {
            const response = await axios.put(`${apiUrl}/posts/${updatePost._id}`, updatePost);
            if (response.data.success) {
                dispatch({ type: UPDATE_POST, payload: response.data.post });
                return response.data;
            }
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'server error' };
        }
    };

    const postContextData = {
        postState,
        getPosts,
        showAddPostModal,
        setShowAddPostModal,
        addPost,
        showToast,
        setShowToast,
        deletePost,
        updatePost,
        findPost,
        showUpdatePostModal,
        setShowUpdatePostModal,
    };

    return <PostContext.Provider value={postContextData}>{children}</PostContext.Provider>;
}

export default PostContextProvider;
