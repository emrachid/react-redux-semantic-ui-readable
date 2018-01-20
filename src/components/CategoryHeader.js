import React from 'react'
import PropTypes from 'prop-types'
import { Header, Grid, Dropdown, Button, Divider } from 'semantic-ui-react'

const CategoryHeader = ({ title, onSelect, options, defaultValue }) => (
  <div>
    <Grid stackable columns={3}>
       <Grid.Column width={2}>
         <Header as="h2">{title}</Header>
       </Grid.Column>
       <Grid.Column width={3}>
         <Button color={"grey"} basic circular compact size={"tiny"}>
           Add new post
         </Button>
       </Grid.Column>
       <Grid.Column width={2} verticalAlign={"bottom"} floated={"right"}>
         <Dropdown
           onChange={onSelect}
           options={options}
           defaultValue={defaultValue}
         />
       </Grid.Column>
    </Grid>
    <Divider/>
  </div>
);

CategoryHeader.propTypes = {
  title: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  defaultValue: PropTypes.string.isRequired,
};

export default CategoryHeader;
