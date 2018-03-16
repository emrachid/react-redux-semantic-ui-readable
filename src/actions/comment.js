import * as actionType from './types';

export const createComments = (comments) => ({
  type: actionType.CREATE_COMMENTS,
  comments,
});

export const addComment = (comment) => ({
  type: actionType.ADD_COMMENT,
  comment,
});

export const deleteComment = (comment) => ({
  type: actionType.DELETE_COMMENT,
  comment,
});

export const updateComment = (comment) => ({
  type: actionType.UPDATE_COMMENT,
  comment,
});
