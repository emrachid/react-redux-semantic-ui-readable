import React, { Component } from 'react';
import { Container, Divider } from 'semantic-ui-react';
import CategoryHeader from './CategoryHeader'
import CategoryItem from './CategoryItem'
import '../App.css';


class App extends Component {
  state = {
    sortByValue: 'n',
    posts: [
      {
        title: 'Life is good',
        category: 'React',
        description: 'Everyone says so after all. ' +
          'Amy is a violinist with 2 years experience in the wedding industry. ' +
          'She enjoys the outdoors and currently resides in upstate New York. ',
        author: 'Euler Rachid',
        timestamp: 1316416373686,
        votes: 0,
        comments: 0,
      },
      {
        title: 'Udacity is the best place to learn React',
        category: 'React',
        description: 'Everyone says so after all. ' +
          'Amy is a violinist with 2 years experience in the wedding industry. ' +
          'She enjoys the outdoors and currently resides in upstate New York. ',
        author: 'Euler Rachid',
        timestamp: 1416416373686,
        votes: 6,
        comments: 2,
      },
      {
        title: 'Immigrate to Canada',
        category: 'React',
        description: 'Everyone says so after all. ' +
          'Amy is a violinist with 2 years experience in the wedding industry. ' +
          'She enjoys the outdoors and currently resides in upstate New York. ',
        author: 'Euler Rachid',
        timestamp: 1516416373686,
        votes: 4,
        comments: 2,
      },
    ],
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
          <Divider hidden />
          <CategoryHeader
            title={'React'}
            onSelect={onSortByClick}
            options={sortByOptions}
            defaultValue={this.state.sortByValue}
          />
          {this.state.posts
            .filter((postItem) => (postItem.category === 'React'))
            .sort((postA, postB) => {
              switch (this.state.sortByValue) {
                default:
                case 'n':
                  return postB.timestamp - postA.timestamp;
                case 'v':
                  return postB.votes - postA.votes;
              }
            })
            .map((postItem, index) => (
            <CategoryItem
              id={index}
              title={postItem.title}
              description={postItem.description}
              author={postItem.author}
              timestamp={postItem.timestamp}
              votes={postItem.votes}
              comments={postItem.comments}
            />
          ))}
        </Container>

      </div>
    );
  }
}

export default App;
