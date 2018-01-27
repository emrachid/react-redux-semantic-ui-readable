import React, { Component } from 'react';
import { Container, Icon } from 'semantic-ui-react';
import { Route, Link } from 'react-router-dom'
import CategoryHeader from './CategoryHeader'
import CategoryItem from './CategoryItem'
import PostView from './PostView'
import PostForm from './PostForm'
import history from '../utils/history'
import { removeItemFromArray } from '../utils/ArrayHelper.js'
import '../App.css';

import * as ServerAPI from '../utils/ServerAPI'

class App extends Component {
  componentDidMount() {
  	ServerAPI.getCategories().then((categories) => {
  		this.setState({ categories });
    });

    ServerAPI.getPosts().then((posts) => {
      this.setState({ posts });
    });
  }

  onDeletePost = (id) => {
    ServerAPI.deletePost(id).then((removedPost) => {
      this.setState((prevState) => ({
        posts: removeItemFromArray(prevState.posts, removedPost.id)
      }));
    });
  }

  onVote = (id, isLike) => {
    ServerAPI.votePost(id, isLike).then((newPost) => {
      this.setState((prevState) => ({
        posts: removeItemFromArray(prevState.posts, newPost.id)
          .concat([ newPost ])
      }));
    });
  }

  handleAddUpdatePost = (values, category) => {
    /* if form id is not empty, it is an update command.
     * Otherwise, it is an add command.
     */
    if (values.formId) {
      ServerAPI.updatePost(values.formId, values.formTitle, values.formBody)
        .then((newPost) => {
          this.setState((prevState) => ({
            comments: removeItemFromArray(prevState.posts, newPost.id)
              .concat([ newPost ])
          }));
        });
    } else {
      const postToAdd = {
        body: values.formBody,
        author: values.formAuthor,
        title: values.formTitle,
        category: category,
      };

      ServerAPI.addPost(postToAdd)
        .then((newPost) => {
          this.setState((prevState) => ({
            post: removeItemFromArray(prevState.posts, newPost.id)
              .concat([ newPost ]),
          }));
        });

    }
    // Avoid user going back to form because the form state will be invalid.
    history.replace('/')
    history.goBack();
  }

  state = {
    sortByValue: 'n',
    categories: [],
    posts: [],
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
              className="category-header"
              title={category.name}
              onSelect={onSortByClick}
              options={sortByOptions}
              defaultValue={this.state.sortByValue}
            />
            {this.state.posts
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
                />
            ))}
          </div>
        ))}
        {(filterByTitle) && (<Link to={'/'}><Icon name="angle left"/> back</Link>)}
      </Container>
    );

    const getValue = (key, query) => (
      // Check whether query is valid. If so, get value from query.
      (query.indexOf(`?${key}=`) === 0) ?
        query.slice(`?${key}=`.length) : ''
    );

    return (
      <div>
        <div className = "app-header">
          <h1 className = "app-title">Readable</h1>
          <h4>Read, post, comment and vote. Share your ideas to the world.</h4>
        </div>

        <Route exact path="/" render={() => body('')}/>
        <Route path="/category" render={({ location }) => (
          body(getValue('title', location.search))
        )}/>
        <Route path="/post" render={({ location }) => (
          <PostView
            postId={getValue('id', location.search)}
            onVote={this.onVote}
            onDelete={this.onDeletePost}
          />
        )}/>
        <Route path="/editpost" render={({ location }) => (
          <PostForm
            onSubmit={this.handleAddUpdatePost}
            showTitle={true}
            values={this.state.posts.find((post) => (
              post.id === getValue('id', location.search)
            ))}
          />
        )}/>
        <Route path="/newpost" render={({ location }) => (
          <PostForm
            onSubmit={this.handleAddUpdatePost}
            showTitle={true}
            category={getValue('category', location.search)}
          />
        )}/>
      </div>
    );
  }
}

export default App;
