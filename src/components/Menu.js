import React from 'react';
import { Link } from 'react-router-dom';

const Menu = ({ activeItem, categories }) => (
  <div className="ui secondary pointing menu">
    <Link
      className={'item ' + (activeItem ? '':'active')}
      to="/">
      all
    </Link>
    {categories.map((category, index) => (
      <Link
        key={index}
        className={'item ' + ((activeItem && activeItem === category.name) ? 'active':'')}
        to={'/' + category.name}>
        {category.name}
      </Link>
    ))}
  </div>
);

export default Menu;
