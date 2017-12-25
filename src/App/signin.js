import React, { Component } from 'react';
import SweetAlert from 'sweetalert';
import { Redirect, Link } from 'react-router-dom';
import GetToken from '../Api/get_token';

export default class SignInPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      redirect: null,
    };

    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  async onFormSubmit() {
    const { email, password } = this.state;
    const response = await GetToken(email, password);

    if (!email || !password) {
      SweetAlert({
        title: 'Hata',
        text: 'Eposta veya şifre boş olamaz.',
        icon: 'error',
        button: { text: 'Tamam' },
      });
      return;
    }

    if (response.getResult() === 'success') {
      localStorage.setItem('userdata', JSON.stringify(response.getData().user));
      localStorage.setItem('access_token', response.getData().pure_token);
      this.setState({ redirect: <Redirect to="/" /> });
    } else {
      SweetAlert({
        title: 'Hata',
        text: 'Eposta veya şifre hatalı.',
        icon: 'error',
        button: { text: 'Tamam' },
      });
    }

    this.setState({ email: null, password: null });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-sm-12">
            <h3 className="title">Giriş Yap</h3>

            <div className="form">
              <input
                placeholder="E-Posta"
                type="email"
                onChange={x => this.setState({ email: x.target.value })}
              />
              <input
                placeholder="Şifre"
                type="password"
                onChange={x => this.setState({ password: x.target.value })}
              />
              <button className="btn btn-warning" onClick={this.onFormSubmit}>
                👍 Giriş Yap
              </button>
            </div>
          </div>

          <div className="col-md-8 col-sm-12">
            <h3 className="title">Kayıt Ol</h3>
            <Link to="/signup" className="btn btn-primary">
              Kayıt Ol Sayfasına Git
            </Link>
          </div>
        </div>
        {this.state.redirect}
      </div>
    );
  }
}
