import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
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

    return (
      <div>
        <div className = "app-header">
          <h1 className = "app-title">Readable</h1>
          <h4>Read, post, comment and vote. Share your ideas to the world.</h4>
        </div>

        <Container>
          {this.state.categories.map(category => (
            <div>
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
                    key={postItem.id}
                    id={postItem.id}
                    title={postItem.title}
                    description={postItem.body}
                    author={postItem.author}
                    timestamp={postItem.timestamp}
                    votes={postItem.voteScore}
                    comments={postItem.commentCount}
                  />
              ))}
            </div>
          ))}
        </Container>

      </div>
    );
  }
}

export default App;
