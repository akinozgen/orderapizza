import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class LogoutPage extends Component {
  constructor(props) {
    super(props);

    localStorage.removeItem('access_token');
    localStorage.removeItem('userdata');
  }

  render() {
    return <Redirect to="/" />;
  }
}
