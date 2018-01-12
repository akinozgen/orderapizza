import React from 'react';

import SliderItem from './item';
import './index.css';

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
          title={sliderItem.title}
          ingredients={sliderItem.ingredients}
          button_href={sliderItem.button_href}
          button_title={sliderItem.button_title}
        />
      ))}
    </div>
  );
};
