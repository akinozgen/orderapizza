import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => {
  const { href, title } = props;
  return (
    <li>
      <Link to={href}>{title}</Link>
    </li>
  );
};
