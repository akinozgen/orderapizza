import React, { Component } from 'react';
import ReactModal from 'react-modal';
import CartItem from './cartitem';

export default class Cart extends Component {
  /**
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.removeItem = this.removeItem.bind(this);
    this.updateItem = this.updateItem.bind(this);
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
            <button className="btn btn-warning" type="button">
              Ödemeye Git
            </button>
          </div>
        </form>
      </ReactModal>
    );
  }
}
