import React, { Component } from 'react';
import $ from 'jquery';
import SweetAlert from 'sweetalert';
import GetAddresses from '../Api/get_addresses';
import UpdateProfile from '../Api/update_profile';
import RemoveAddress from '../Api/remove_address';
import AddressSelector from '../Components/AddressSelector';
import GetUserOrders from '../Api/get_user_orders';
import Order from '../Components/Order';

export default class ProfilePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userdata: JSON.parse(localStorage.getItem('userdata')),
      addresses: [],
      orders: [],
    };

    this.getAddresses = this.getAddresses.bind(this);
    this.removeAddress = this.removeAddress.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
    this.getUserOrders = this.getUserOrders.bind(this);

    this.getAddresses();
    this.getUserOrders();
  }

  async getUserOrders() {
    const response = await GetUserOrders(this.state.userdata.id);

    if (response.getResult() === 'success') {
      this.setState({ orders: response.getData() });
    }
  }

  async getAddresses() {
    const response = await GetAddresses(this.state.userdata.id);
    console.log(response.getStatus());

    if (response.getResult() === 'success') {
      this.setState({ addresses: response.getData() });
    }
  }

  async removeAddress(id) {
    const response = await RemoveAddress(id);

    if (response.getResult() === 'success') {
      SweetAlert({
        icon: 'success',
        title: 'Başarılı',
        text: 'Adres silindi',
        button: 'Tamam',
      });
    }

    this.getAddresses();
  }

  async updateProfile() {
    const formData = $(this.form).serializeArray();
    const data = {};

    formData.map((d) => {
      if (d.name === 'password' && d.value === '') return;
      return data[d.name] = d.value;
    });

    const response = await UpdateProfile(this.state.userdata.id, data);

    if (response.getResult() === 'success') {
      SweetAlert({
        icon: 'success',
        title: 'Başarılı',
        text: 'Profilin kaydedildi.',
        button: 'Tamam',
      });
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">Profil Bilgilerim</h3>
              </div>
              <div className="panel-body">
                <form ref={form => this.form = form}>
                  <div className="form-group">
                    <label>
                      Ad soyad
                    </label>
                    <input type="text" name="username" defaultValue={this.state.userdata.username} />
                  </div>

                  <div className="form-group">
                    <label>
                      Telefon
                    </label>
                    <input type="text" name="phone" defaultValue={this.state.userdata.phone} />
                  </div>

                  <div className="form-group">
                    <label>
                      E-Posta
                    </label>
                    <input type="text" name="email" defaultValue={this.state.userdata.email} />
                  </div>

                  <div className="form-group">
                    <label>
                      Şifre
                    </label>
                    <input type="password" name="password" />
                  </div>

                  <div>
                    <button className="btn btn-sm btn-default" type="button" onClick={this.updateProfile}>
                      <i className="fa fa-save" /> Kaydet
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="form-group">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title">Adreslerim</h3>
                </div>
                <div className="panel-body">
                  <AddressSelector
                    removeAddress={this.removeAddress}
                    title="Adreslerim"
                    addressData={this.state.addresses}
                    selectAddress={() => { }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title pull-left">Geçmiş Siparişlerim</h3>
                <button onClick={this.getUserOrders} className="btn btn-default pull-right">
                  <i className="fa fa-refresh" />
                </button>
                <div style={{ clear: 'both' }} />
              </div>

              <div className="panel-body">
                <Order data={this.state.orders} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
