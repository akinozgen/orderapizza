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

  render() {
    this.getMenus();
    return (
      <div className="menu-elements">
        <div className="container">
          <div className="row">
            {this.state.menus.map((menu, index) => (
              <MenuElement {...menu} key={index.toString()} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
