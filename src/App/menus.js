import React, { Component } from 'react';

import GetMenus from '../Api/get_menus';
import MenuElement from '../Components/Menu';

export default class MenusPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
    };

    this.getMenus();
  }

  async getMenus() {
    const response = await GetMenus();

    if (response.getResult() === 'success') {
      this.setState({ menus: response.getData() });
    }
  }

  componenDidUpdate() {
    this.cart = JSON.parse(localStorage.getItem('cart'));
    this.price = parseFloat('0');

    this.cart.map((item) => {
      this.price += item.price * item.count;
      item.menu_options.map((menuOption) => {
        this.price += menuOption.price;

        return true;
      });

      return true;
    });
  }

  render() {
    return (
      <div className="menu-elements">
        <div className="container">
          <div className="row">
            {this.state.menus.map((menu, index) => (
              <MenuElement addToCart={this.addToCart} {...menu} key={index.toString()} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
