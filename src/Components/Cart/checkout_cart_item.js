import React from 'react';
import './cartitem.css';

export default (props) => {
  const {
    image_path,
    name,
    menu_options,
    price,
    onClick,
  } = props;

  let totalPrice = price;
  menu_options.map((menuOption) => { totalPrice += menuOption.price; return null; });

  return (
    <button
      className="cart-item well well-sm"
      style={{ cursor: 'pointer', width: '100%' }}
      onClick={onClick}
    >
      <section className="image-area">
        <img src={image_path} alt="" />
      </section>

      <section className="content-area" style={{ paddingLeft: '10px' }}>
        <span className="item-name">
          {name} <small>({`${parseFloat(price).toFixed(2)} ₺`})</small>
        </span>
        <ul>
          {menu_options.map(menuOption => (
            <li style={{ borderRadius: 0, textAlign: 'center' }}>
              <span>
                {menuOption.name} <small>({parseFloat(menuOption.price).toFixed(2)} ₺)</small>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="actions-area" style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
        <b><i>{`${parseFloat(totalPrice).toFixed(2)} ₺`}</i></b>
      </section>
    </button>
  );
};
