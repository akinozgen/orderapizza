import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import SweetAlert from 'sweetalert';

export default class LogoutPage extends Component {
  constructor(props) {
    super(props);

    localStorage.removeItem('access_token');
    localStorage.removeItem('userdata');

    this.state = {
      redirect: null,
    };

    SweetAlert({
      title: 'Yönlendiriliyorsunuz.',
      text: 'Çıkış yapıldı.',
      timer: 1500,
      closeOnClickOutside: false,
      icon: 'success',
      closeOnEsc: false,
      buttons: false,
    }).then(() => this.setState({ redirect: <Redirect to="/" /> }));
  }

  render() {
    return <div>{this.state.redirect}</div>;
  }
}
