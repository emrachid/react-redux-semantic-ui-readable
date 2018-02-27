import React, { Component } from 'react';
import { Container, Icon } from 'semantic-ui-react';
import { Route, Link } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import CategoryHeader from './CategoryHeader';
import CategoryItem from './CategoryItem';
import PostView from './PostView';
import PostForm from './PostForm';
import { addPost, deletePost, updatePost, createPosts, createComments } from '../actions';
import '../App.css';

import * as ServerAPI from '../utils/ServerAPI'

class App extends Component {
  componentDidMount() {
  	ServerAPI.getCategories().then((categories) => {
  		this.setState({ categories });
    });

    ServerAPI.getPosts().then((posts) => {
      this.props.createPosts(posts);
      posts.forEach((post) => {
        ServerAPI.getPostComments(post.id).then((comments) => {
          this.props.createComments(comments);
        });
      });
    });
  }

  onVote = (id, isLike) => {
    ServerAPI.votePost(id, isLike).then((newPost) => {
      this.props.updatePost(newPost);
    });
  }

  onDeletePost = (id) => {
    ServerAPI.deletePost(id).then((removedPost) => {
      this.props.deletePost(removedPost);
    });
  }

  handleAddUpdatePost = (values, category) => {
    /* if form id is not empty, it is an update command.
     * Otherwise, it is an add command.
     */
    if (values.formId) {
      ServerAPI.updatePost(values.formId, values.formTitle, values.formBody)
        .then((newPost) => {
          this.props.updatePost(newPost);
        });
      window.location.href='/' + category + '/' + values.formId;
    } else {
      const postToAdd = {
        body: values.formBody,
        author: values.formAuthor,
        title: values.formTitle,
        category: category,
      };

      ServerAPI.addPost(postToAdd)
        .then((newPost) => {
          this.props.addPost(newPost);
        });
      window.location.href='/';
    }
  }

  state = {
    sortByValue: 'n',
    categories: [],
  };

  render() {
    const onSortByClick = (e, data) => {
      if (this.state.sortByValue !== data.value) {
        this.setState({ sortByValue: data.value });
      }
    };

    const sortByOptions = [
      { key: 'n', text: 'newer', value: 'n' },
      { key: 'v', text: 'votes', value: 'v' },
    ];

    const body = (filterByTitle) => (
      <Container>
        {this.state.categories
          .filter(category => filterByTitle ? category.name === filterByTitle : true)
          .map((category, index) => (
          <div key={index}>
            <CategoryHeader
              title={category.name}
              onSelect={onSortByClick}
              options={sortByOptions}
              defaultValue={this.state.sortByValue}
            />
            {this.props.posts
              .filter((postItem) => (postItem.category === category.name))
              .sort((postA, postB) => {
                switch (this.state.sortByValue) {
                  default:
                  case 'n':
                    return postB.timestamp - postA.timestamp;
                  case 'v':
                    return postB.voteScore - postA.voteScore;
                }
              })
              .map((postItem, index) => (
                <CategoryItem
                  key={index}
                  postItem={postItem}
                  onVote={this.onVote}
                  onDelete={this.onDeletePost}
                />
            ))}
          </div>
        ))}
        {(filterByTitle) && (<Link to={'/'}><Icon name="angle left"/> back</Link>)}
      </Container>
    );

    return (
      <BrowserRouter>
        <div>
          <div className = "app-header">
            <h1 className = "app-title">Readable</h1>
            <h4>Read, post, comment and vote. Share your ideas to the world.</h4>
          </div>

          <Route exact path="/" render={() => body('')}/>
          <Route exact path="/:category" render={({ location }) => (
            body(location.pathname.slice(1))
          )}/>
          <Route exact path="/:category/:post_id" component={PostView}/>
          <Route exact path="/:category/:post_id/editpost" render={({ location }) => (
            <PostForm
              onSubmit={this.handleAddUpdatePost}
              showTitle={true}
              values={this.props.posts.find((post) => (
                post.id === location.pathname.split('/')[2]
              ))}
              category={location.pathname.split('/')[1]}
            />
          )}/>
          <Route exact path="/:category/post/add" render={({ location }) => (
            <PostForm
              onSubmit={this.handleAddUpdatePost}
              showTitle={true}
              category={location.pathname.split('/')[1]}
            />
          )}/>
        </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps(storeState) {
  return {
    posts: storeState.posts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createPosts: (posts) => dispatch(createPosts({ posts })),
    addPost: (post) => dispatch(addPost({ post })),
    updatePost: (post) => dispatch(updatePost({ post })),
    deletePost: (post) => dispatch(deletePost({ post })),
    createComments: (comments) => dispatch(createComments({ comments })),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
