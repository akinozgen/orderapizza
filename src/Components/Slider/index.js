import React from 'react';
import OwlCarousel from 'react-owl-carousel';

import SliderItem from './item';
import './index.css';

export default (props) => {
  const { data } = props;

  const renderItems = () => data.map((sliderItem, index) => (
    <SliderItem
      key={index.toString()}
      image={sliderItem.url}
    />
  ));

  return (
    <OwlCarousel
      loop
      nav
      smartSpeed={1200}
      navText={[null, null]}
      autoplay
      autoplayHoverPause
      items={1}
    >{renderItems()}
    </OwlCarousel>
  );
};
