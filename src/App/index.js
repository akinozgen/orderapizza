import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from '../Components/Header';
import Footer from '../Components/Footer';
import HomePage from './home';
import AboutPage from './about';

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

export default () => (
  <div>
    <Router>
      <div>
        <Header navigationList={navigationList} />
        <Route exact path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
      </div>
    </Router>

    <Footer {...footerData} />
  </div>
);
