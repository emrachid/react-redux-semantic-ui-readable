import { removeItemFromArray } from '../utils/ArrayHelper';
import * as actionType from '../actions/types';

export function posts (state = [], action) {
  const { post, comment } = action;

  switch (action.type) {
    case actionType.CREATE_POSTS:
      const { posts } = action;
      return [
        ...state,
        ...posts,
      ];
    case actionType.ADD_POST:
      return [
        ...state,
        post,
      ];
    case actionType.DELETE_POST:
      return removeItemFromArray(state, post.id);
    case actionType.UPDATE_POST:
      return removeItemFromArray(state, post.id).concat(post);
    case actionType.ADD_COMMENT:
      return state.map((post) => {
          if (post.id === comment.parentId) post.commentCount++;
          return post;
        });
    case actionType.DELETE_COMMENT:
      return state.map((post) => {
          if (post.id === comment.parentId) post.commentCount--;
          return post;
        });
    default :
      return state;
  }
}
