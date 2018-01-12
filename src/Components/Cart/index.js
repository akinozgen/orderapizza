import React, { Component } from 'react';
import ReactModal from 'react-modal';
import { Redirect } from 'react-router-dom';
import CartItem from './cartitem';

export default class Cart extends Component {
  /**
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

    this.state = {
      totalPrice: this.calculateTotalPrice(cart),
      redirect: null,
    };

    this.removeItem = this.removeItem.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.goToCheckout = this.goToCheckout.bind(this);
  }

  /**
   * @param {number} id
   */
  removeItem(index) {
    let { cart } = this.props;

    if (!Array.isArray(cart)) {
      const keys = Object.keys(cart);
      cart = keys.map(item => cart[item]);
    }

    cart.splice(index, 1);

    localStorage.setItem('cart', JSON.stringify(cart));
    this.props.updateCart();

    this.setState({ totalPrice: this.calculateTotalPrice(cart) });
  }

  /**
   * @param {number} index
   * @param {object} item
   */
  updateItem(index, item) {
    let { cart } = this.props;

    if (!Array.isArray(cart)) {
      const keys = Object.keys(cart);
      cart = keys.map(cartItem => cart[cartItem]);
    }

    cart[index] = item;

    localStorage.setItem('cart', JSON.stringify(cart));
    this.props.updateCart();

    this.setState({ totalPrice: this.calculateTotalPrice(cart) });
  }

  /**
   * @param {Array|Object} cart
   * @returns {number}
   */
  calculateTotalPrice(cart) {
    let totalPrice = 0.00;

    cart.map((cartItem) => {
      let itemTotal = cartItem.price;

      cartItem.menu_options.map((menuOption) => {
        itemTotal += menuOption.price;
        return true;
      });

      totalPrice += itemTotal * cartItem.count;

      return true;
    });

    return totalPrice;
  }

  goToCheckout() {
    this.setState({ redirect: <Redirect to="/checkout" /> });
    this.props.toggleCartModal();
  }

  render() {
    const {
      modalState, toggleCartModal, cart,
    } = this.props;

    return (
      <ReactModal isOpen={modalState}>
        <form
          ref={(form) => {
            this.form = form;
          }}
        >
          <div className="modal-header">
            <h5 className="modal-title">
              Sepet
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={toggleCartModal}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </h5>
          </div>
          <div className="modal-body">{cart.map((item, index) =>
            (<CartItem
              {...item}
              removeItem={this.removeItem}
              updateItem={this.updateItem}
              index={index}
            />))}
          </div>
          <div className="modal-footer">
            <div className="input-group pull-right">
              <span className="input-group-btn">
                <button className="btn btn-primary" type="button" disabled>Toplam Fiyat</button>
              </span>
              <input className="form-control" value={`${parseFloat(this.state.totalPrice).toFixed(2)} ₺`} readOnly />
              <span className="input-group-btn">
                <button
                  className="btn btn-primary"
                  type="button"
                  disabled={this.state.totalPrice === 0}
                  onClick={this.state.totalPrice !== 0 ? this.goToCheckout : null}
                >
                  Ödemeye Git
                </button>
              </span>
            </div>
          </div>
        </form>
        {this.state.redirect}
      </ReactModal>
    );
  }
}
