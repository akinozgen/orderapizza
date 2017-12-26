import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from '../Components/Header';
import Footer from '../Components/Footer';
import HomePage from './home';
import AboutPage from './about';
import MenusPage from './menus';
import SpecialsPage from './special';
import TrackOrderPage from './trackorder';
import SignInPage from './signin';
import SignUpPage from './signup';
import LogoutPage from './logout';

import AuthMiddleware from '../Middleware/CheckAuth';

import './index.css';

const footerData = {
  addressInfo: {
    addressDescription: 'Adres açıklamsı',
    workingHours: '09:00 - 23:00',
    phoneNumber: '+90 850 254 25 52',
    emailAddress: 'info@orderapizza.com.tr',
  },
  brandInfo: {
    companyName: 'Order-@-Pizza',
    companyDescription: 'Make an online pizza order',
  },
  siteInfo: {
    copyrightText: (
      <div>
        2017 Tüm Hakları Saklıdır. By{' '}
        <a href="http://infusion.com.tr" target="_blank">
          Infusion
        </a>
        .💖 la yapıldı.
      </div>
    ),
    facebookAddress: '#',
    twitterAddress: '#',
    instagramAddress: '#',
  },
};

const navigationList = [
  {
    href: '/',
    title: 'Ana Sayfa',
  },
  {
    href: '/about',
    title: 'Hakkımızda',
  },
  {
    href: '/menus',
    title: 'Menüler',
  },
  {
    href: '/special',
    title: 'Spesiyaller',
  },
  {
    href: '/track-order',
    title: 'Sipariş Takibi',
  },
];

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authState: false,
    };

    this.changeAuthState = this.changeAuthState.bind(this);
    this.authMiddleware = new AuthMiddleware();
    this.checkAuth();
  }

  async checkAuth() {
    const response = await this.authMiddleware.checkAuth();

    if (response.getResult() === 'success') {
      this.setState({ authState: true });
    } else {
      this.setState({ authState: false });
    }
  }

  changeAuthState(value) {
    this.setState({ authState: value });
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <Header navigationList={navigationList} authState={this.state.authState} />
            <Route exact path="/" component={HomePage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/menus" component={MenusPage} />
            <Route path="/special" component={SpecialsPage} />
            <Route path="/track-order" component={TrackOrderPage} />
            <Route
              path="/signin"
              component={() => <SignInPage changeAuthState={this.changeAuthState} />}
            />
            <Route
              path="/signup"
              component={() => <SignUpPage changeAuthState={this.changeAuthState} />}
            />
            <Route
              path="/logout"
              component={() => <LogoutPage changeAuthState={this.changeAuthState} />}
            />
          </div>
        </Router>

        <Footer {...footerData} />
      </div>
    );
  }
}
