import React, { Component } from 'react';
import GetToken from '../Api/get_token';

export default class SignInPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };

    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  async onFormSubmit() {
    const { email, password } = this.state;
    const response = await GetToken(email, password);
    alert(response);
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
          </div>
        </div>
      </div>
    );
  }
}
