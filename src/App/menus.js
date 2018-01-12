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
    this.getMenus();
    return (
      <div className="menu-elements">
        <div className="container">
          {this.state.menus.map((menu, index) => {
            if ((index + 1) % 3 === 0) {
              return (
                <div className="row">
                  {this.state.menus.map((menuItem, indexItem) => {
                    if (index >= indexItem && index <= indexItem + 3) {
                      return <MenuElement addToCart={this.addToCart} {...menuItem} key={indexItem.toString()} />;
                    }
                  })}
                </div>
              );
            }
          })}
        </div>
      </div>
    );
  }
}
