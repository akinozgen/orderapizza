import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Cart from '../Components/Cart';

import Header from '../Components/Header';
import Footer from '../Components/Footer';
import HomePage from './home';
import AboutPage from './about';
import MenusPage from './menus';
import ProfilePage from './profile';
import TrackOrderPage from './trackorder';
import SignInPage from './signin';
import SignUpPage from './signup';
import LogoutPage from './logout';
import CheckoutPage from './checkout';

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
    href: '/checkout',
    title: 'Ödeme',
  },
];

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authState: false,
      modalState: false,
      cart: [],
      mounted: false,
    };

    this.changeAuthState = this.changeAuthState.bind(this);
    this.toggleCartModal = this.toggleCartModal.bind(this);
    this.updateCart = this.updateCart.bind(this);
    this.authMiddleware = new AuthMiddleware();
    this.checkAuth();
    this.updateCart();
  }

  componentDidMount() {
    // eslint-disable-next-line
    this.setState({ mounted: true });
  }

  updateCart() {
    if (localStorage.getItem('cart')) {
      this.setState({ cart: JSON.parse(localStorage.getItem('cart')) });
    }
  }

  async checkAuth() {
    const response = await this.authMiddleware.checkAuth();

    if (response.getResult() === 'success') {
      this.setState({ authState: true });
    } else {
      this.setState({ authState: false });
    }
  }

  toggleCartModal() {
    this.updateCart();
    this.setState({ modalState: !this.state.modalState });
  }

  changeAuthState(value) {
    this.setState({ authState: value });
  }

  render() {
    if (this.state.mounted) {
      this.cart.state.totalPrice = this.cart.__proto__.calculateTotalPrice(this.state.cart);
    }

    return (
      <div>
        <Router basename="/orderapizza/">
          <div>
            <Header
              navigationList={navigationList}
              authState={this.state.authState}
              toggleCartModal={this.toggleCartModal}
            />
            <Route exact path="/" component={HomePage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/menus" component={MenusPage} />
            <Route path="/profile" component={ProfilePage} />
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
            <Route
              path="/checkout"
              component={() => <CheckoutPage toggleCartModal={this.toggleCartModal} />}
            />
            <Cart
              ref={(cart) => { this.cart = cart; }}
              modalState={this.state.modalState}
              toggleCartModal={this.toggleCartModal}
              cart={this.state.cart}
              updateCart={this.updateCart}
            />
          </div>
        </Router>

        <Footer {...footerData} />
      </div>
    );
  }
}
