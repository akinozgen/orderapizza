import React from 'react';

import SliderItem from './item';

export default (props) => {
  // eslint-disable-next-line
  const { data } = props;

  return (
    <div id="product-slider" className="owl-pagination-dash owl-navigation-box">
      {data.map((sliderItem, index) => (
        <SliderItem
          key={index.toString()}
          image={sliderItem.image}
          price={sliderItem.price}
          content={sliderItem.content}
          button={sliderItem.button}
        />
      ))}
    </div>
  );
};
