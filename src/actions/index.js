export const CREATE_POSTS = 'CREATE_POSTS';
export const ADD_POST = 'ADD_POST';
export const DELETE_POST = 'DELETE_POST';
export const UPDATE_POST = 'UPDATE_POST';

export const CREATE_COMMENTS = 'CREATE_COMMENTS';
export const ADD_COMMENT = 'ADD_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';

export function createPosts ({ posts }) {
  return {
    type: CREATE_POSTS,
    posts,
  }
}

export function addPost ({ post }) {
  return {
    type: ADD_POST,
    post,
  }
}

export function deletePost ({ post }) {
  return {
    type: DELETE_POST,
    post,
  }
}

export function updatePost ({ post }) {
  return {
    type: UPDATE_POST,
    post,
  }
}

export function createComments ({ comments }) {
  return {
    type: CREATE_COMMENTS,
    comments,
  }
}

export function addComment ({ comment }) {
  return {
    type: ADD_COMMENT,
    comment,
  }
}

export function deleteComment ({ comment }) {
  return {
    type: DELETE_COMMENT,
    comment,
  }
}

export function updateComment ({ comment }) {
  return {
    type: UPDATE_COMMENT,
    comment,
  }
}
