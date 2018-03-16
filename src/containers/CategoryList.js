import React, { Component } from 'react';
import { connect } from 'react-redux';
import CategoryHeader from '../components/CategoryHeader';
import CategoryItem from '../components/CategoryItem';
import { updatePost, deletePost } from '../actions/post';
import * as ServerAPI from '../utils/ServerAPI';

class CategoryList extends Component {
  state = {
    sortByValue: 'n',
  };

  onVotePost = (id, isLike) => {
    ServerAPI.votePost(id, isLike).then((newPost) => {
      this.props.updatePost(newPost);
    });
  }

  onDeletePost = (id) => {
    ServerAPI.deletePost(id).then((removedPost) => {
      this.props.deletePost(removedPost);
    });
  }

  render() {
    const sortByOptions = [
      { key: 'n', text: 'newer', value: 'n' },
      { key: 'v', text: 'votes', value: 'v' },
    ];

    const onSortByClick = (e, data) => {
      if (this.state.sortByValue !== data.value) {
        this.setState({ sortByValue: data.value });
      }
    };

    const { filterByTitle, categories, posts } = this.props;

    return (
      <div>
        {categories
        .filter(category => filterByTitle ? category.name === filterByTitle : true)
        .map((category, index) => (
          <div key={index}>
            <CategoryHeader
              title={category.name}
              onSelect={onSortByClick}
              options={sortByOptions}
              defaultValue={this.state.sortByValue}
            />
            {posts
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
                  onVote={this.onVotePost}
                  onDelete={this.onDeletePost}
                />
              ))}
          </div>
        ))}
      </div>
    );
  }
}

function mapStateToProps(storeState) {
  return {
    posts: storeState.posts
  };
}

export default connect(mapStateToProps, { updatePost, deletePost })(CategoryList);
