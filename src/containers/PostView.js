import React from 'react';
import { withRouter } from 'react-router-dom';
import CategoryItem from '../components/CategoryItem';
import { Container, Comment, Header, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import dateFromTime from '../utils/ConvertTimeToDate';
import PostForm from '../containers/PostForm';
import * as CommentActions from '../actions/comment';
import * as PostActions from '../actions/post';
import * as ServerAPI from '../utils/ServerAPI';

class PostView extends React.Component {
  onDeletePost = (id) => {
    ServerAPI.deletePost(id).then((removedPost) => {
      this.props.deletePost(removedPost);
    });
  }

  onVotePost = (id, isLike) => {
    ServerAPI.votePost(id, isLike).then((newPost) => {
      this.props.updatePost(newPost);
    });
  }

  onVoteComment = (id, isLike) => {
    ServerAPI.voteComment(id, isLike).then((newComment) => {
      this.props.updateComment(newComment);
    });
  }

  deleteComment = (id) => {
    ServerAPI.deleteComment(id).then((deletedComment) => {
      if (deletedComment.deleted) {
        this.props.deleteComment(deletedComment);
      }
    });
  }

  editComment = (id) => {
    const comment = this.props.comments.find((comment) => comment.id === id);
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
          this.props.updateComment(newComment);
        });
    } else {
      const commentToAdd = {
        body: values.formBody,
        author: values.formAuthor,
        parentId: this.props.post.id,
      };

      ServerAPI.addPostComment(commentToAdd)
      .then((newComment) => {
        this.props.addComment(newComment);
      });
    }
  }

  render() {
    return (
      <div>
        <Container>

          {(this.props.post) && (
            <CategoryItem
              postItem={this.props.post}
              onVote={(id, isLike) => {
                this.onVotePost(id, isLike);
              }}
              detailedView={true}
              onDelete={this.onDeletePost}
            />
          )}

          {(this.props.post) && (
            <Comment.Group>
              <Header as='h3' dividing>Comments</Header>
              {(this.props.comments) &&
                this.props.comments.sort((a, b) => (b.timestamp - a.timestamp))
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
              <PostForm onSubmit={this.handleSubmit} category={this.props.post.category}/>
            </Comment.Group>
          )}

          {(!this.props.post) && (
            <Header as='h4'>Error: 404 Page not found</Header>
          )}

          <a
            href=""
            onClick={(e) => {e.preventDefault(); this.props.history.goBack();}}>
            <Icon name="angle left"/> back
          </a>

        </Container>

      </div>
    );
  }
}

function mapStateToProps(storeState, ownProps) {
  return {
    post: storeState.posts.filter((post) => (post.id === ownProps.postId))[0],
    comments: storeState.comments.filter((comment) => (
      comment.parentId === ownProps.postId
    )),
  };
}

export default withRouter(
  connect(mapStateToProps, { ...PostActions, ...CommentActions })(PostView)
);
