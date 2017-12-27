import React from 'react';

export default (props) => {
  const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

  return (
    <li>
      <div {...props} className="menu-item has-small-label cart-trigger">
        <i className="fa fa-shopping-cart" />
        <span className="small-label">
          <span>{cart.length}</span>
        </span>
      </div>
    </li>
  );
};
