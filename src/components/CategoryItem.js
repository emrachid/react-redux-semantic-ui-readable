import React from 'react';
import PropTypes from 'prop-types'
import { Icon, Grid, Divider, Button, Item } from 'semantic-ui-react'
import dateFromTime from '../utils/ConvertTimeToDate'

const CategoryItem = ({ postItem, onVote }) => (
  <div>
    <Item.Group divided>
      <Item>
        <Item.Content>
          <Item.Header as="a">{postItem.title}</Item.Header>
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
                    onClick={() => onVote(postItem.id,true)}/>
                  <Icon name="thumbs down"
                    link
                    onClick={() => onVote(postItem.id, false)}
                    flipped={'horizontally'}/>
              </Grid.Column>
              <Grid.Column>
                <Icon name="comments"/> Comments {postItem.comments}
              </Grid.Column>
              <Grid.Column>
                <Button color={'grey'} basic circular compact  size={'tiny'}>
                  View
                </Button>
              </Grid.Column>
            </Grid>
          </Item.Extra>
        </Item.Content>
      </Item>
    </Item.Group>
    <Divider/>
  </div>
);

CategoryItem.propTypes = {
  postItem: PropTypes.object.isRequired,
  onVote: PropTypes.func.isRequired,
};

export default CategoryItem;
