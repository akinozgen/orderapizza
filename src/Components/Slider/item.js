import React from 'react';

export default (props) => {
  // eslint-disable-next-line
  const { image, price, content, button } = props;

  return (
    <div className="offer">
      <img alt="product" src={image} />
      <div className="offer-price-small">
        ₺<span className="offer-price-val1">{price.major}</span>
        <span className="offer-price-val2">{price.minor}</span>
      </div>
      <div className="offer-detail">
        <div className="offer-detail-inner">
          <div className="offer-detail-content">
            <h6>{content.title}:</h6>
            <h3>{content.ingredients}</h3>
            <div className="price-huge clearfix">
              <div className="pull-left">
                <span className="price-currency">₺</span>
                <span className="price-val-1">{price.major}</span>
              </div>
              <div className="pull-left">
                <span className="price-val-2">{price.minor}</span>
                <br />
                <a href={button.href} className="button-red button-text-big cart-trigger">
                  {button.title}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
