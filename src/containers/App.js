import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import CategoryList from '../containers/CategoryList';
import PostView from '../containers/PostView';
import PostForm from '../containers/PostForm';
import Menu from '../components/Menu';
import '../App.css';
import { addPost, updatePost, fetchPosts } from '../actions/post';
import * as ServerAPI from '../utils/ServerAPI';

class App extends Component {
  componentDidMount() {
  	ServerAPI.getCategories().then((categories) => {
  		this.setState({ categories });
    });

    this.props.fetchPosts();
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
      this.props.history.push('/' + category + '/' + values.formId);
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
      this.props.history.push('/' + category);
    }
  }

  state = {
    categories: [],
  };

  render() {
    return (
      <div>
        <div>
          <div className = "app-header">
            <h1 className = "app-title">Readable</h1>
            <h4>Read, post, comment and vote. Share your ideas to the world.</h4>
          </div>

          <Route exact path="/" render={() => (
            <Container>
              <Menu categories={this.state.categories} />
              <div className="ui segment">
                <CategoryList categories={this.state.categories} />
              </div>
            </Container>
          )}/>
          <Route exact path="/:category" render={({ location }) => (
            <Container>
              <Menu
                activeItem={location.pathname.slice(1)}
                categories={this.state.categories} />
              <div className="ui segment">
                <CategoryList
                  filterByTitle={location.pathname.slice(1)}
                  categories={this.state.categories}
                />
              </div>
            </Container>
          )}/>
          <Route exact path="/:category/:post_id" render={({ location }) => (
            <Container>
              <Menu
                activeItem={location.pathname.split('/')[1]}
                categories={this.state.categories}/>
              <div className="ui segment">
                <PostView postId={location.pathname.split('/')[2]} />
              </div>
            </Container>
          )}/>
          <Route exact path="/:category/:post_id/editpost" render={({ location }) => (
            <Container>
              <Menu
                activeItem={location.pathname.split('/')[1]}
                categories={this.state.categories}/>
              <div className="ui segment">
                <PostForm
                  onSubmit={this.handleAddUpdatePost}
                  showTitle={true}
                  values={this.props.posts.find((post) => (
                    post.id === location.pathname.split('/')[2]
                  ))}
                  category={location.pathname.split('/')[1]}
                />
              </div>
            </Container>
          )}/>
          <Route exact path="/:category/post/add" render={({ location }) => (
            <Container>
              <Menu
                activeItem={location.pathname.split('/')[1]}
                categories={this.state.categories}/>
              <div className="ui segment">
                <PostForm
                  onSubmit={this.handleAddUpdatePost}
                  showTitle={true}
                  category={location.pathname.split('/')[1]}
                />
              </div>
            </Container>
          )}/>
        </div>
      </div>
    );
  }
}

function mapStateToProps(storeState) {
  return {
    posts: storeState.posts
  };
}

export default withRouter(
  connect(mapStateToProps, { addPost, updatePost, fetchPosts })(App)
);
