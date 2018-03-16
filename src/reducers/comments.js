import { removeItemFromArray } from '../utils/ArrayHelper';
import * as actionType from '../actions/types';

export function comments (state = [], action) {
  const { comment } = action;

  switch (action.type) {
    case actionType.CREATE_COMMENTS:
      const { comments } = action;
      return [
        ...state,
        ...comments,
      ];
    case actionType.ADD_COMMENT:
      return [
        ...state,
        comment,
      ];
    case actionType.DELETE_COMMENT:
      return removeItemFromArray(state, comment.id);
    case actionType.UPDATE_COMMENT:
      return removeItemFromArray(state, comment.id).concat(comment);
    default :
      return state;
  }
}
