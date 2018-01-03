import React from 'react';

export default (props) => {
  const {
    name, price, description, index, id,
  } = props;

  return (
    <div className="form-check" key={index.toString()}>
      <label className="form-check-label" htmlFor={index.toString()}>
        <input
          type="checkbox"
          className="form-check-input"
          id={index.toString()}
          value={id}
          name="menu_options[]"
        />{' '}
        {name} <i>{description}</i>
        ({parseFloat(price).toFixed(2)} ₺)
      </label>
    </div>
  );
};
