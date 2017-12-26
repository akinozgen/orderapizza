import React from 'react';

import Slider from '../Components/Slider';
import SpecialBanner from '../Components/Banner';
import Divider from '../Components/Divider';
import CardContent from '../Components/CardContent';

const sliderData = [
  {
    image: 'assets/images/slider/2.jpg',
    price: { major: 7, minor: 99 },
    content: { title: 'Napoli', ingredients: 'mantar fln.' },
    button: { title: 'Sipariş Ver', href: '#' },
  },
  {
    image: 'assets/images/slider/2.jpg',
    price: { major: 7, minor: 99 },
    content: { title: 'Napoli', ingredients: 'mantar fln.' },
    button: { title: 'Sipariş Ver', href: '#' },
  },
  {
    image: 'assets/images/slider/2.jpg',
    price: { major: 7, minor: 99 },
    content: { title: 'Napoli', ingredients: 'mantar fln.' },
    button: { title: 'Sipariş Ver', href: '#' },
  },
];

const cardsData = [
  {
    svg: require('../Assets/circle-pizza.svg'),
    classProp: 'col-md-3',
    title: 'Pizza Slices',
    content:
      'When gliding by the Bashee isles we emerged at last upon the great South Sea, were it not for other things, I could have greeted.',
  },
  {
    svg: require('../Assets/circle-tomato.svg'),
    classProp: 'col-md-3',
    title: 'Tomato CSS',
    content:
      'When gliding by the Bashee isles we emerged at last upon the great South Sea, were it not for other things, I could have greeted.',
  },
  {
    svg: require('../Assets/circle-mush.svg'),
    classProp: 'col-md-3',
    title: 'Mushroom HTML',
    content:
      'When gliding by the Bashee isles we emerged at last upon the great South Sea, were it not for other things, I could have greeted.',
  },
  {
    svg: require('../Assets/circle-olive.svg'),
    classProp: 'col-md-3',
    title: 'Olives',
    content:
      'When gliding by the Bashee isles we emerged at last upon the great South Sea, were it not for other things, I could have greeted.',
  },
];

export default () => (
  <div>
    <section>
      <div className="container">
        <Slider data={sliderData} />
      </div>
      <div className="container">
        <div className="row">
          <SpecialBanner
            image="assets/images/banners/1.jpg"
            title="Deneme"
            content="lorem lorem lorem"
            url="#"
          />
          <SpecialBanner
            image="assets/images/banners/1.jpg"
            title="Deneme"
            content="lorem lorem lorem"
            url="#"
          />
        </div>
      </div>
    </section>

    <Divider />

    <section>
      <div className="container">
        <div className="row">
          <div className="col-sm-12 responsive-column">
            <div className="row">
              {cardsData.map((cardData, index) => (
                <CardContent key={index.toString()} {...cardData} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);
