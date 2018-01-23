import React, { Component } from 'react';
import { Container, Icon } from 'semantic-ui-react';
import { Route, Link } from 'react-router-dom'
import CategoryHeader from './CategoryHeader'
import CategoryItem from './CategoryItem'
import '../App.css';

import * as ServerAPI from '../utils/ServerAPI'

class App extends Component {
  componentDidMount() {
  	ServerAPI.getCategories().then((categories) => {
      //console.log(categories);
  		this.setState({ categories });
    });

    ServerAPI.getPosts().then((posts) => {
      //console.log(posts);
      this.setState({ posts });
    });
  }

  onVote = (id, isLike) => {
    ServerAPI.votePost(id, isLike).then((newPost) => {
      this.setState((prevState) => ({
        posts: prevState.posts.filter((post) => (
          post.id !== newPost.id)).concat([ newPost ]
        )
      }))
    });
  }

  state = {
    sortByValue: 'n',
    categories: [],
    posts: [],
  };

  render() {
    const onSortByClick = (e, data) => {
      console.log(data.value);
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

    return (
      <div>
        <div className = "app-header">
          <h1 className = "app-title">Readable</h1>
          <h4>Read, post, comment and vote. Share your ideas to the world.</h4>
        </div>

        <Route exact path="/" render={() => body("")}/>
        <Route path="/category" render={({ location })=>{
          const titleQuery = location.search;
          // Check whether query is valid. If so, get title from query.
          const title = (titleQuery.indexOf("?title=") === 0) ?
            titleQuery.slice("?title=".length) : "";
          return body(title);
        }}/>

      </div>
    );
  }
}

export default App;
