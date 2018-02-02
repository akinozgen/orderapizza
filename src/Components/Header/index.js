import React from 'react';
import './index.css';

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
                Telefon: (0286) 217 77 47
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
                    <div className="page-logo" />
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
