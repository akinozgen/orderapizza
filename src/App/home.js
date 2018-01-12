import React from 'react';

import Slider from '../Components/Slider';
import SpecialBanner from '../Components/Banner';
import Divider from '../Components/Divider';
import CardContent from '../Components/CardContent';

import GetMenus from '../Api/get_menus';

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

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sliderData: [
        {
          image: 'slider/1.jpg',
          price: '5.00',
          title: 'Parmak Patates',
          ingredients: '',
          button_href: '',
          button_title: '',
        },
        {
          image: 'slider/2.jpg',
          price: '',
          title: '',
          ingredients: '',
          button_href: '',
          button_title: '',
        },
        {
          image: 'slider/3.jpg',
          price: '',
          title: '',
          ingredients: '',
          button_href: '',
          button_title: '',
        },
      ],
      specialBanners: [{}, {}],
    };

    this.getMenus = this.getMenus.bind(this);

    this.getMenus();
  }

  async getMenus() {
    const response = await GetMenus();

    if (response.getResult() === 'success') { this.setState({ specialBanners: response.getData() }); }
  }

  render() {
    return (
      <div>
        <section>
          <div className="container">
            <Slider data={this.state.sliderData} />
          </div>
          <div className="container">
            <div className="row">
              <SpecialBanner
                image={this.state.specialBanners[0].image_path}
                title={this.state.specialBanners[0].name}
                content={this.state.specialBanners[0].description}
                url="#!"
              />
              <SpecialBanner
                image={this.state.specialBanners[1].image_path}
                title={this.state.specialBanners[1].name}
                content={this.state.specialBanners[1].description}
                url="#!"
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
  }
}
