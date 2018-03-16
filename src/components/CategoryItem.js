import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Icon, Grid, Divider, Item } from 'semantic-ui-react';
import dateFromTime from '../utils/ConvertTimeToDate';

const CategoryItem = ({ postItem, onVote, detailedView, onDelete }) => (
  <div>
    <Item.Group divided>
      <Item>
        <Item.Content>
          <Item.Header>{postItem.title}</Item.Header>
          <Item.Meta>
            <span>{dateFromTime(postItem.timestamp)}</span>
          </Item.Meta>
          <Item.Description>{postItem.body}</Item.Description>
          <Item.Extra>
            <Grid stackable columns={4} verticalAlign={'bottom'}>
              <Grid.Column>
                <Icon name="user"/> {postItem.author}
              </Grid.Column>
              <Grid.Column>
                  <Icon name="star"/>
                  <span className="category-votes">Votes {postItem.voteScore}</span>
                  <Icon name="thumbs up"
                    link
                    onClick={() => onVote(postItem.id, true)}/>
                  <Icon name="thumbs down"
                    link
                    onClick={() => onVote(postItem.id, false)}
                    flipped={'horizontally'}/>
              </Grid.Column>
              <Grid.Column>
                <Icon name="comments"/> Comments {postItem.commentCount}
              </Grid.Column>
              <Grid.Column>
                <Commands
                  postId={postItem.id}
                  postCategory={postItem.category}
                  detailedView={detailedView}
                  onDelete={onDelete} />
              </Grid.Column>
            </Grid>
          </Item.Extra>
        </Item.Content>
      </Item>
    </Item.Group>
    <Divider/>
  </div>
);

const Commands = ({postId, postCategory, detailedView, onDelete}) => (
  <div>
    <Link to={{
      pathname: '/' + postCategory + '/' + postId + '/editpost'
    }}><Icon name="edit"/> Edit </Link>
    |
    <Link to="/" onClick={() => onDelete(postId)}> Delete </Link>
    {detailedView || (
      <span>
        {'| '}
        <Link to={{
          pathname: '/' + postCategory + '/' + postId
        }}><Icon name="talk"/> View <Icon name="angle right"/></Link>
      </span>
    )}
  </div>
);

CategoryItem.propTypes = {
  postItem: PropTypes.object.isRequired,
  onVote: PropTypes.func.isRequired,
};

export default CategoryItem;
