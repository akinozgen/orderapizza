import React from 'react';
import './cartitem.css';

export default (props) => {
  const {
    image_path, name, description, price, menu_options, removeItem, updateItem, index, id,
  } = props;
  let { count } = props;

  return (
    <article className="cart-item well well-sm">
      <section className="image-area">
        <img src={image_path} alt="" />
      </section>

      <section className="content-area">
        <span className="item-name">
          {name} <small>({parseFloat(price).toFixed(2)} ₺)</small>
        </span>
        <span className="item-description">{description}</span>
        <ul>
          {menu_options.map(menuOption => (
            <li>
              <span>
                {menuOption.name} <small>({parseFloat(price).toFixed(2)} ₺)</small>
              </span>
              <button className="close" type="button">
                &times;
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="actions-area">
        <div className="form-group">
          <input
            type="number"
            defaultValue={count}
            onChange={(x) => { count = parseInt(x.target.value); }}
            className="form-control"
            max={20}
            min={1}
          />
          <button
            className="btn btn-success"
            type="button"
            onClick={() => {
              updateItem(index, {
                id,
                name,
                price,
                description,
                image_path,
                count,
                menu_options,
              });
            }}
          >
            Güncelle
          </button>
        </div>
        <button className="close" type="button" onClick={() => removeItem(index)}>
          &times;
        </button>
      </section>
    </article>
  );
};
