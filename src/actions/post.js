import * as actionType from './types';
import * as ServerAPI from '../utils/ServerAPI';
import {createComments} from './comment';

export const fetchPosts = () => dispatch => (
  ServerAPI.getPosts().then((posts) => {
    dispatch(createPosts(posts));
    posts.forEach((post) => {
      ServerAPI.getPostComments(post.id).then((comments) => {
        dispatch(createComments(comments));
      });
    });
  })
);

export const createPosts = posts => ({
  type: actionType.CREATE_POSTS,
  posts,
});

export const addPost = post => ({
  type: actionType.ADD_POST,
  post,
});

export const deletePost = post => ({
  type: actionType.DELETE_POST,
  post,
});

export const updatePost = post => ({
  type: actionType.UPDATE_POST,
  post,
});
