import React from 'react';

import PizzaIcon from '../../Assets/pizza.svg';
import PizzaSlice from '../../Assets/slice.svg';

export default () => (
  <div>
    <div id="page-loader" className="bg-pattern bg-white">
      <div className="page-loader-content">
        <div id="loader-pizza-corpus">{PizzaIcon}</div>

        <div id="loader-pizza-piece">{PizzaSlice}</div>
        <div className="page-loader-text">Yükleniyor</div>
      </div>
    </div>
    <div id="screen-cover" />
  </div>
);
