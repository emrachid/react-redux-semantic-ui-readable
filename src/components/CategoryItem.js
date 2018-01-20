import React from 'react';
import PropTypes from 'prop-types'
import { Icon, Grid, Divider, Button, Item } from 'semantic-ui-react'

const onLike = (id) => {
  const likeIcon = document.getElementById(id);
  const iconStyle = likeIcon.getAttribute('style');
  console.log(iconStyle);
  // if color not set or another color is set, set black
  if (!iconStyle || (iconStyle.indexOf('black') === -1)) {
    likeIcon.setAttribute('style', 'color: black');
  } else {
    // clear style
    likeIcon.setAttribute('style', null);
  }
};

const dateFromTime = (time) => {
  const date = new Date(time);
  const months = [
    'Jan',
    'Fev',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Set',
    'Out',
    'Nov',
    'Dec',
  ];

  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

const CategoryItem = ({ title, timestamp, description, author, votes, comments, id }) => (
  <div>
    <Item.Group divided>
      <Item>
        <Item.Content>
          <Item.Header as="a">{title}</Item.Header>
          <Item.Meta>
            <span>{dateFromTime(timestamp)}</span>
          </Item.Meta>
          <Item.Description>{description}</Item.Description>
          <Item.Extra>
            <Grid stackable columns={4} verticalAlign={'bottom'}>
              <Grid.Column>
                <Icon name="user"/> {author}
              </Grid.Column>
              <Grid.Column>
                  <Icon link id={'like'+id} onClick={()=>onLike('like'+id)} name="thumbs up"/>
                Votes {votes}
              </Grid.Column>
              <Grid.Column>
                <Icon name="comments"/> Comments {comments}
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
  title: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  votes: PropTypes.number.isRequired,
  comments: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
};

export default CategoryItem;
