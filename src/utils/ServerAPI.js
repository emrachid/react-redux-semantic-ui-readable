/*
Server APIs:
- GET /categories - Get all of the categories
- GET /:category/posts - Get all of the posts for a particular category
- GET /posts - Get all of the posts
- POST /posts - Add a new post
- GET /posts/:id - Get the details of a single post
- POST /posts/:id - Used for voting on a post
- PUT /posts/:id - Edit the details of an existing post
- DELETE /posts/:id - Delete post and its comments
- GET /posts/:id/comments - Get all the comments for a single post
- POST /comments - Add a comment to a post
- GET /comments/:id - Get the details for a single comment
- POST /comments/:id - Used for voting on a comment
- PUT /comments/:id - Edit the details of an existing comment
- DELETE /comments/:id - Delete a comment

Serve implementation can be found in Github:
	https://github.com/udacity/reactnd-project-readable-starter

*/

const api = process.env.SERVER_API_URL || 'http://localhost:3001';

let token = localStorage.token;

if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8);

const headers = {
  'Accept': 'application/json',
  'Authorization': token,
};

export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories);

export const getPostsByCategory = (category) =>
  fetch(`${api}/${category}/posts`, { headers })
    .then(res => res.json());

export const getPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json());

export const addPost = (post) =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  }).then(res => res.json());

export const getPost = (id) =>
  fetch(`${api}/posts/${id}`, { headers })
    .then(res => res.json());

export const votePost = (id, isLike) =>
  fetch(`${api}/posts/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'option': (isLike ? 'upVote' : 'downVote'),
    }),
  }).then(res => res.json());

export const updatePost = (id, title, body) =>
  fetch(`${api}/posts/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'title': title,
      'body': body,
    }),
  }).then(res => res.json());

export const deletePost = (id) =>
  fetch(`${api}/posts/${id}`, { method: 'DELETE', headers })
    .then(res => res.json());

export const getPostComments = (id) =>
  fetch(`${api}/posts/${id}/comments`, { headers })
    .then(res => res.json());

export const addPostComment = (comment) =>
  fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comment),
  }).then(res => res.json());

export const getComment = (id) =>
  fetch(`${api}/comments/${id}`, { headers })
    .then(res => res.json());

export const voteComment = (id, isLike) =>
  fetch(`${api}/comments/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'option': (isLike ? 'upVote' : 'downVote'),
    }),
  }).then(res => res.json());

export const updateComment = (id, timestamp, body) =>
  fetch(`${api}/comments/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'timestamp': timestamp,
      'body': body,
    }),
  }).then(res => res.json());

export const deleteComment = (id) =>
  fetch(`${api}/comments/${id}`, { method: 'DELETE', headers })
    .then(res => res.json());
