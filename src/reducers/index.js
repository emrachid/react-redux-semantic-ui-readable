import { removeItemFromArray } from '../utils/ArrayHelper'
import {
  CREATE_POSTS,
  ADD_POST,
  DELETE_POST,
  UPDATE_POST,
  ADD_COMMENT,
  DELETE_COMMENT,
  UPDATE_COMMENT,
  CREATE_COMMENTS,
} from '../actions';

const initialState = {
  posts: [],
  comments: [],
}

function appReducer (state = initialState, action) {
  const { comment, post } = action;

  switch (action.type) {
    case CREATE_POSTS:
      const { posts } = action;
      return {
        ...state,
        posts: state.posts.concat(posts)
      };
    case ADD_POST:
      // Do not change state if element already exists
      if (state.posts.find((e) => (e.id === post.id))) {
        return state;
      }
      return {
        ...state,
        posts: [
          ...state.posts,
          post,
        ],
      };
    case DELETE_POST:
      return {
        ...state,
        posts: removeItemFromArray(state.posts, post.id)
      };
    case UPDATE_POST:
      return {
        ...state,
        posts: removeItemFromArray(state.posts, post.id).concat(post)
      };
    case CREATE_COMMENTS:
      const { comments } = action;
      return {
        ...state,
        comments: state.comments.concat(comments)
      };
    case ADD_COMMENT:
      // Do not change state if element already exists
      if (state.comments.find((e) => (e.id === comment.id))) {
        return state;
      }

      return {
        posts: state.posts.map((post) => {
          if (post.id === comment.parentId) post.commentCount++;
          return post;
        }),
        comments: [
          ...state.comments,
          comment,
        ],
      };
    case DELETE_COMMENT:
      return {
        posts: state.posts.map((post) => {
          if (post.id === comment.parentId) post.commentCount--;
          return post;
        }),
        comments: removeItemFromArray(state.comments, comment.id),
      };
    case UPDATE_COMMENT:
      return {
        ...state,
        comments: removeItemFromArray(state.comments, comment.id).concat(comment)
      };
    default :
      return state;
  }
}

export default appReducer;
