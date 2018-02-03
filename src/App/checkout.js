import React, { Component } from 'react';
import SweetAlert from 'sweetalert';
import { toast } from 'react-toastify';
import { Redirect } from 'react-router-dom';

import GetAddresses from '../Api/get_addresses';
import BSPanel from '../Components/BsPanel';
import AddressSelector from '../Components/AddressSelector';
import AddAddressModal from '../Components/AddAddressModal';
import CheckOutCartItem from '../Components/Cart/checkout_cart_item';

import Order from '../Api/order';
import UpdateProfile from '../Api/update_profile';

export default class CheckoutPage extends Component {
  constructor(props) {
    super(props);

    const userdata = JSON.parse(localStorage.getItem('userdata'));

    const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    const totalPrice = this.calculateTotalPrice(cart);

    this.state = {
      cart,
      address: -1,
      addresses: [],
      modalState: false,
      user_id: userdata ? userdata.id : 0,
      totalPrice,
      redirect: null,
      paymentMethod: null,
      userdata: localStorage.getItem('userdata')
        ? JSON.parse(localStorage.getItem('userdata'))
        : undefined,
    };

    this.getAddresses = this.getAddresses.bind(this);
    this.selectAddress = this.selectAddress.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.order = this.order.bind(this);
    this.updateCart = this.updateCart.bind(this);
    this.usePoints = this.usePoints.bind(this);

    this.getAddresses();
  }

  async getAddresses() {
    const response = await GetAddresses(this.state.user_id);

    if (response.getResult() === 'success') {
      this.setState({ addresses: response.getData() });
    }
  }

  async order() {
    const payload = {
      user_id: this.state.user_id,
      address_id: this.state.address,
      menus: JSON.stringify(this.state.cart.map((item) => {
          const menu_options = item.menu_options.map(menuOption => menuOption.id);
          const newItem = { id: item.id };
          newItem.menu_options = menu_options;
          newItem.count = item.count;
          newItem.name = item.name;

          return newItem;
        }),),
      delivery: Date.now() + 45 * 60000,
      price: this.state.totalPrice,
      payment: this.state.paymentMethod,
    };

    if (this.state.user_id === 0) {
      SweetAlert({
        title: 'Hata',
        text: 'Giriş Yapılmamış!',
        icon: 'warning',
        button: 'Tamam',
      });
      return;
    }

    if (payload.address_id < 0) {
      SweetAlert({
        title: 'Hata',
        text: 'Adres seçilmedi!',
        icon: 'warning',
        button: 'Tamam',
      });
      return;
    }

    if (payload.price === 0) {
      SweetAlert({
        title: 'Hata',
        text: 'Sepetinizde ürün bulunmuyor. Kontrol edip tekrar deneyin!',
        icon: 'warning',
        button: 'Tamam',
      });
      return;
    }

    if (payload.payment === null) {
      SweetAlert({
        title: 'Hata',
        text: 'Ödeme tipini seçmediniz.',
        icon: 'warning',
        button: 'Tamam',
      });
      return;
    }

    const response = await Order(payload);

    if (response.getResult() === 'success') {
      const pointFromServer = response.getData().point;
      let point = payload.price / 100;
      point *= 2;
      const userdata = JSON.parse(localStorage.getItem('userdata'));
      userdata.point = pointFromServer;
      localStorage.setItem('userdata', JSON.stringify(userdata));

      SweetAlert({
        title: 'Başarılı',
        text:
          'Siparişiniz alınmıştır. Mümkün olan en kısa zamanda adresinize teslim edilecektir. Bizi seçtiğiniz için teşekkür ederiz.',
        button: 'Tamam',
        icon: 'success',
      }).then(() => {
        toast(`Tebrikler ${parseFloat(point).toFixed(2)} puan kazandınız.`);
        this.setState({ redirect: <Redirect to="/profile" /> });
        localStorage.setItem('cart', JSON.stringify([]));
        localStorage.removeItem('discounted');
      });
    }
  }

  usePoints() {
    const { point } = this.state.userdata;
    // Puan sıfırdan büyük ve toplam fiyattan küçükse
    if (point > 0 && point < this.state.totalPrice) {
      const span = this.state.totalPrice - point;
      const { userdata } = this.state;

      userdata.point = 0;
      localStorage.setItem('userdata', JSON.stringify(userdata));
      localStorage.setItem('discounted', span);

      this.setState({ totalPrice: span });
      this.setState({ userdata });
      // Puan sıfırdan ve toplam fiyattan büyükse
    } else if (point > 0 && point > this.state.totalPrice) {
      const span = point - this.state.totalPrice;
      const { userdata } = this.state;
      userdata.point = span;

      localStorage.setItem('discounted', 0);
      localStorage.setItem('userdata', JSON.stringify(userdata));
      this.setState({ totalPrice: 0, userdata });
    } else if (point > 0 && point === this.state.totalPrice) {
      const { userdata } = this.state;
      userdata.point = 0;
      localStorage.setItem('discounted', 0);
      this.setState({ totalPrice: 0, userdata });
    }

    UpdateProfile(this.state.user_id, { point: this.state.userdata.point });
  }

  updateCart() {
    let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    const totalPrice = this.calculateTotalPrice(cart);

    if (!Array.isArray(cart)) {
      const keys = Object.keys(this.state.cart);
      cart = keys.map(key => this.state.cart[key]);
    }

    this.setState({ cart, totalPrice });

    if (cart.length < 1) {
      window.location = '/menus';
    }
  }

  selectAddress(address) {
    this.setState({ address });
  }

  toggleModal() {
    this.setState({ modalState: !this.state.modalState });
  }

  calculateTotalPrice(cart) {
    let totalPrice = 0.0;

    cart.map((cartItem) => {
      let itemTotal = cartItem.price;

      cartItem.menu_options.map((menuOption) => {
        itemTotal += menuOption.price;
        return true;
      });

      totalPrice += itemTotal * cartItem.count;

      return true;
    });

    if (localStorage.getItem('discounted')) {
      return localStorage.getItem('discounted');
    }
    return totalPrice;
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-sm-12">
            <BSPanel
              title="Adres Bilgileri"
              class="primary"
              action={[
                <button onClick={this.toggleModal} className="btn pull-right btn-primary">
                  <i className="fa fa-plus" />
                </button>,
                <button onClick={this.getAddresses} className="btn pull-right btn-primary">
                  <i className="fa fa-refresh" />
                </button>,
              ]}
            >
              <AddressSelector
                title="Teslimat Adresi"
                addressData={this.state.addresses}
                selectAddress={this.selectAddress}
              />
              <select
                className="form-control"
                onChange={x => this.setState({ paymentMethod: x.target.value })}
              >
                <option selected disabled>
                  Ödeme Tipi Seçiniz
                </option>
                <option value="Nakit">Nakit</option>
                <option value="Banka/Kredi Kartı">Banka/Kredi Kartı</option>
              </select>
            </BSPanel>
          </div>

          <div className="col-md-6 col-sm-12">
            <BSPanel
              title="Ödeme Bilgileri"
              class="warning"
              action={
                <button onClick={this.updateCart} className="btn pull-right btn-warning">
                  <i className="fa fa-refresh" />
                </button>
              }
            >
              {this.state.cart.map(cartItem => (
                <CheckOutCartItem {...cartItem} onClick={this.props.toggleCartModal} />
              ))}

              <div className="pull-right">
                <p>
                  <b>Toplam Fiyat:</b>
                  <i>{parseFloat(this.state.totalPrice).toFixed(2)} ₺</i>
                </p>

                <div className="btn-group pull-right">
                  <button
                    className="btn btn-primary"
                    onClick={this.order}
                    disabled={this.state.totalPrice === 0}
                  >
                    <i className="fa fa-shopping-cart" /> Sipariş Ver
                  </button>
                  <button
                    onClick={this.usePoints}
                    className="btn btn-warning"
                    disabled={this.state.userdata.point === 0}
                  >
                    <i className="fa fa-asterisk" /> Puanlarımdan Düş
                  </button>
                </div>
              </div>
            </BSPanel>
          </div>
        </div>
        <AddAddressModal
          toggleModal={this.toggleModal}
          modalState={this.state.modalState}
          user_id={this.state.user_id}
          onInserted={() => this.getAddresses}
        />
        {this.state.redirect}
      </div>
    );
  }
}
