import React from 'react';

import Slider from '../Components/Slider';
import SpecialBanner from '../Components/Banner';
import Divider from '../Components/Divider';
import CardContent from '../Components/CardContent';

import GetMenus from '../Api/get_menus';
import GetSliders from '../Api/get_sliders';
import RandomInt from '../Api/random_int';

const cardsData = [
  {
    svg: require('../Assets/circle-pizza.svg'),
    classProp: 'col-md-3',
    title: 'Taze Malzeme',
    content:
      'Pizzalarımızın lezzeti tazeliğinde saklı! Sizler için özenle seçtiğimiz sebzelerimiz ve etlerimiz pizzlarımızı eşsiz kılıyor.',
  },
  {
    svg: require('../Assets/circle-tomato.svg'),
    classProp: 'col-md-3',
    title: 'Helal Etler',
    content:
      'Kullandığımız etler helal et sertifikasına sahiptir. Sizleri kesinlikle rahatsız etmez. Yani güvenle yiyebilirsiniz!',
  },
  {
    svg: require('../Assets/circle-mush.svg'),
    classProp: 'col-md-3',
    title: 'Uzman Ekip',
    content:
      'Ustalarımız, garsonlarımız ve kuryelerimiz tecrübelerini sizlere en iyi hizmeti verebilmek için kullanıyorlar...',
  },
  {
    svg: require('../Assets/circle-olive.svg'),
    classProp: 'col-md-3',
    title: 'Temiz Mutfak',
    content:
      'Tertemiz bir fırında, hijyen kurallarına dikkat edilen bir mutfakta, sağlıklı bir ortamda, hem lezzetli hem de sizi düşünen bir pizza...',
  },
];

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sliderData: [],
      specialBanners: [{}, {}],
    };

    this.getMenus = this.getMenus.bind(this);
    this.getSliders = this.getSliders.bind(this);

    this.getMenus();
    this.getSliders();
  }

  async getSliders() {
    const response = await GetSliders();

    if (response.getResult() === 'success') {
      this.setState({ sliderData: response.getData() });
    }
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
              {(() => {
                const random = RandomInt(0, this.state.specialBanners.length);
                return (
                  <SpecialBanner
                    image={this.state.specialBanners[random].image_path}
                    title={this.state.specialBanners[random].name}
                    content={this.state.specialBanners[random].description}
                    url="#!"
                  />
                );
              })()}
              {(() => {
                const random = RandomInt(0, this.state.specialBanners.length);
                return (
                  <SpecialBanner
                    image={this.state.specialBanners[random].image_path}
                    title={this.state.specialBanners[random].name}
                    content={this.state.specialBanners[random].description}
                    url="#!"
                  />
                );
              })()}
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
