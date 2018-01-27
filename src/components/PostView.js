import React from 'react';
import CategoryItem from './CategoryItem';
import PropTypes from 'prop-types'
import { Container, Comment, Header, Icon } from 'semantic-ui-react'

import dateFromTime from '../utils/ConvertTimeToDate'
import { removeItemFromArray } from '../utils/ArrayHelper.js'
import PostForm from './PostForm'
import history from '../utils/history'
import * as ServerAPI from '../utils/ServerAPI'

class PostView extends React.Component {
  static propTypes = {
    postId: PropTypes.string.isRequired,
    onVote: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      postId: props.postId,
    };
  }

  componentDidMount() {
    this.updatePost();
  	ServerAPI.getPostComments(this.state.postId).then((comments) => {
  		this.setState({ comments });
    });
  }

  updatePost = () => {
    ServerAPI.getPost(this.state.postId).then((post) => {
      this.setState({ post });
    });
  }

  updateComment = (comment) => {
    this.setState((prevState) => ({
      comments: removeItemFromArray(prevState.comments, comment.id)
        .concat([ comment ])
    }));
  }

  onVoteComment = (id, isLike) => {
    ServerAPI.voteComment(id, isLike).then((newComment) => {
      this.updateComment(newComment);
    });
  }

  deleteComment = (id) => {
    ServerAPI.deleteComment(id).then((deletedComment) => {
      if (deletedComment.deleted) {
        this.setState((prevState) => ({
          comments: removeItemFromArray(prevState.comments, deletedComment.id),
          post: {
            ...prevState.post,
            commentCount: (prevState.post.commentCount - 1),
          }
        }));
      }
    });
  }

  editComment = (id) => {
    const comment = this.state.comments.find((comment) => comment.id === id);
    document.getElementById('formAuthor').value = comment.author;
    document.getElementById('formAuthor').setAttribute('disabled', null);
    document.getElementById('formBody').value = comment.body;
    document.getElementById('formId').value = comment.id;
  }

  handleSubmit = (values) => {
    /* if form id is not empty, it is an update command.
     * Otherwise, it is an add command.
     */
    if (values.formId) {
      ServerAPI.updateComment(values.formId, values.formBody)
        .then((newComment) => {
          this.updateComment(newComment);
        });
    } else {
      const commentToAdd = {
        body: values.formBody,
        author: values.formAuthor,
        parentId: this.state.post.id,
      };

      ServerAPI.addPostComment(commentToAdd)
      .then((newComment) => {
        this.setState((prevState) => ({
          comments: removeItemFromArray(prevState.comments, newComment.id)
            .concat([ newComment ]),
          post: {
            ...prevState.post,
            commentCount: (prevState.post.commentCount + 1),
          }
        }));
      });

    }
  }

  state = {
    comments: [],
    post: {},
    postId: '',
  };

  render() {
    const { onVote, onDelete } = this.props;
    return (
      <div>
        <Container>

          {(this.state.post) && (
            <CategoryItem
              postItem={this.state.post}
              onVote={(id, isLike) => {
                onVote(id, isLike);
                this.updatePost();
              }}
              detailedView={true}
              onDelete={onDelete}
            />
          )}

          <Comment.Group>
            <Header as='h3' dividing>Comments</Header>
            {(this.state.comments) && this.state.comments
              .sort((a, b) => (b.timestamp - a.timestamp))
              .map((comment, index) => (
              <Comment key={index}>
                <Comment.Avatar src={require('../icons/avatar.svg')} />
                <Comment.Content>
                  <Comment.Author>{comment.author}</Comment.Author>
                  <Comment.Metadata>
                    <div>{dateFromTime(comment.timestamp)}</div>
                  </Comment.Metadata>
                  <Comment.Text>{comment.body}</Comment.Text>
                  <Comment.Actions>
                    <Comment.Action
                      onClick={() => this.editComment(comment.id)}>
                      Edit
                    </Comment.Action>
                    <Comment.Action
                      onClick={() => this.deleteComment(comment.id)}>
                      Delete
                    </Comment.Action>
                    <span className="category-votes">Votes {comment.voteScore}</span>
                    <Icon name="thumbs up"
                      link
                      onClick={() => this.onVoteComment(comment.id, true)}/>
                    <Icon name="thumbs down"
                      link
                      onClick={() => this.onVoteComment(comment.id, false)}
                      flipped={'horizontally'}/>
                  </Comment.Actions>
                </Comment.Content>
              </Comment>
            ))}

            <PostForm onSubmit={this.handleSubmit} />

          </Comment.Group>

          <a href="" onClick={(e) => {e.preventDefault(); history.goBack()}}>
            <Icon name="angle left"/> back</a>

        </Container>

      </div>
    );
  }
}

export default PostView;
