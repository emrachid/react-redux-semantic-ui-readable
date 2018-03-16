import { combineReducers } from 'redux';
import { comments } from './comments';
import { posts } from './posts';

export default combineReducers({ posts, comments });
