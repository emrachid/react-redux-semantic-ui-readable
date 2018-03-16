import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Grid, Dropdown, Divider } from 'semantic-ui-react';
import '../App.css';

const CategoryHeader = ({ title, onSelect, options, defaultValue }) => (
  <div>
    <Grid stackable columns={3}>
       <Grid.Column width={2}>
         <Link to={{
           pathname: '/' + title
         }}><h2 className="category-header">{title}</h2></Link>
       </Grid.Column>
       <Grid.Column width={3}>
         <Link to={'/' + title + '/post/add'}>
           Add new post
         </Link>
       </Grid.Column>
       <Grid.Column width={2} verticalAlign={"bottom"} floated={"right"}>
         <Dropdown
           onChange={onSelect}
           options={options}
           defaultValue={defaultValue}
         />
       </Grid.Column>
    </Grid>
    <Divider />
  </div>
);

CategoryHeader.propTypes = {
  title: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  defaultValue: PropTypes.string.isRequired,
};

export default CategoryHeader;
