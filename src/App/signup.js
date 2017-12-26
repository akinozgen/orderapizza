import React, { Component } from 'react';
import SweetAlert from 'sweetalert';
import { Redirect, Link } from 'react-router-dom';
import Register from '../Api/register';

export default class SignUpPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userdata: {},
      redirect: null,
    };

    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  async onFormSubmit() {
    const { email, password, username } = this.state.userdata;

    if (!email || !password || !username) {
      SweetAlert({
        title: 'Hata',
        text: 'Ad soyad, eposta veya şifre boş olamaz.',
        icon: 'error',
        button: { text: 'Tamam' },
      });
      return;
    }

    const response = await Register(this.state.userdata);

    if (response.getResult() === 'success') {
      localStorage.setItem('userdata', JSON.stringify(response.getData().user));
      localStorage.setItem('access_token', response.getData().pure_token);

      SweetAlert({
        title: 'Yönlendiriliyorsunuz',
        text: 'Kayıt Başarılı',
        icon: 'success',
        buttons: false,
        closeOnClickOutside: false,
        closeOnEsc: false,
        timer: 1500,
      }).then(() => this.setState({ redirect: <Redirect to="/" /> }));
    } else {
      SweetAlert({
        title: 'Hata',
        text:
          response.getData().message === 'existing_user'
            ? 'Bu e-posta ile daha önce kayıt olunmuş.'
            : 'İç sunucu hatası meydana geldi. Daha sonra tekrar deneyin',
        icon: 'error',
        button: { text: 'Tamam' },
      });
    }

    this.setState({ userdata: {} });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-sm-12">
            <h3 className="title">Kayıt Ol</h3>

            <div className="form">
              <input
                placeholder="Ad Soyad"
                type="text"
                onChange={x =>
                  this.setState({
                    userdata: {
                      username: x.target.value,
                      email: this.state.userdata.email,
                      password: this.state.userdata.password,
                    },
                  })}
              />
              <input
                placeholder="E-Posta"
                required
                type="email"
                onChange={x =>
                  this.setState({
                    userdata: {
                      username: this.state.userdata.username,
                      email: x.target.value,
                      password: this.state.userdata.password,
                    },
                  })}
              />
              <input
                placeholder="Şifre"
                required
                type="password"
                onChange={x =>
                  this.setState({
                    userdata: {
                      username: this.state.userdata.username,
                      email: this.state.userdata.email,
                      password: x.target.value,
                    },
                  })}
              />
              <button className="btn btn-primary" onClick={this.onFormSubmit}>
                👍 Kayıt Ol
              </button>
            </div>
          </div>

          <div className="col-md-4 col-sm-12">
            <h3 className="title">Giriş Yap</h3>
            <Link to="/signin" className="btn btn-warning">
              Giriş Sayfasına Git
            </Link>
          </div>
        </div>
        {this.state.redirect}
      </div>
    );
  }
}
