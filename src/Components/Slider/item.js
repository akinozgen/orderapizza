import React from 'react';

export default (props) => {
  // eslint-disable-next-line
  const { image, price, title, ingredients, button_href, button_title } = props;

  return (
    <div className="offer">
      <img alt="product" src={image} />
      <div className="offer-price-small">
        ₺<span className="offer-price-val1">{String(price).split('.')[0]}</span>
        <span className="offer-price-val2">{String(price).split('.')[1]}</span>
      </div>
      <div className="offer-detail">
        <div className="offer-detail-inner">
          <div className={!title ? 'offer-detail-content hidden' : 'offer-detail-content'}>
            <h6>{title ? `${title}:` : ''}</h6>
            <h3>{ingredients}</h3>
            <div className="price-huge clearfix">
              <div className="pull-left">
                <span className="price-currency">{price ? '₺' : ''}</span>
                <span className="price-val-1">{String(price).split('.')[0]}</span>
              </div>
              <div className="pull-left">
                <span className="price-val-2">{String(price).split('.')[1]}</span>
                <br />
                <a href={button_href} className="button-red button-text-big cart-trigger">
                  {button_title}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
