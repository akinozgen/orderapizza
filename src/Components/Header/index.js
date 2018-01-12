import React from 'react';

import NavigationItem from './navigationitem';
import LoginLinks from './loginlinks';
import CartButton from './cartbutton';

export default (props) => {
  const { navigationList, authState, toggleCartModal } = props;

  return (
    <header className="page-header page-header-normal">
      <div className="page-top">
        <div className="container">
          <div className="row">
            <div className="col-xs-6">
              <em>
                Call now: 0 800 - <span className="text-uppercase">Pizza delivery</span>
              </em>
            </div>
            <LoginLinks authState={authState} />
          </div>
        </div>
      </div>
      <div id="main-navigation-container">
        <div id="main-navigation-inner">
          <div className="container">
            <div className="relative-container clearfix">
              <div id="main-navigation-button">
                <i className="fa fa-reorder" />
              </div>
              <div className="pull-left">
                <div className="centered-columns">
                  <div className="centered-column">
                    <img className="page-logo" alt="logo" src="assets/napolipizzalogo.png" />
                  </div>
                </div>
              </div>
              <nav id="main-navigation">
                <ul id="one-page-nav">
                  {navigationList.map(nav => <NavigationItem {...nav} />)}
                  <CartButton onClick={toggleCartModal} />
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div id="main-navigation-placeholder" />
    </header>
  );
};
