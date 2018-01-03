import React from 'react';
import ReactModal from 'react-modal';
import $ from 'jquery';
import SweetAlert from 'sweetalert';

import GetMenuOptions from '../../Api/get_menu_options';
import MenuOption from './menuoption';
import './index.css';

export default class MenuElement extends React.Component {
  constructor(props) {
    super(props);

    const priceFields = this.props.price.toString().split('.');
    if (typeof priceFields[1] === 'undefined') priceFields.push('00');

    this.state = {
      id: props.id,
      name: props.name,
      price: priceFields,
      description: props.description,
      image_path: props.image_path,
      available: props.available,
      modalState: false,
      menu_options: [],
    };

    this.openModal = this.openModal.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.getMenuOptions = this.getMenuOptions.bind(this);

    this.getMenuOptions();
  }

  async getMenuOptions() {
    const response = await GetMenuOptions(this.state.id);
    const menu_options = response.getData();

    this.setState({ menu_options });
  }

  openModal() {
    this.setState({ modalState: true });
  }

  addToCart() {
    // Get form with Jquery
    const form = $(this.form);
    // Get form data with Jquery
    const formData = form.serializeArray();
    // Get count of menu
    const count = formData.find(field => field.name === 'count').value;
    // Create a new cartItem object
    const cartItem = {
      id: this.state.id,
      name: this.state.name,
      price: parseFloat(this.state.price.join('.')),
      description: this.state.description,
      image_path: this.state.image_path,
      count: parseInt(count),
    };
    // Filter form data fields by named 'menu_options[]'
    // and iterate this fields with map. In this iteration
    // return a menu_options value which "menu_options.id" equals "menu_options fields value"
    cartItem.menu_options = formData
      .filter(field => field.name === 'menu_options[]')
      .map(field => this.state.menu_options.find(op => op.id === parseInt(field.value)));
    // Get previous cart data. If not exists, return an empty array.
    const prevCart = JSON.parse(localStorage.getItem('cart'))
      ? JSON.parse(localStorage.getItem('cart'))
      : [];
    // Push new cartItem to old cart data
    prevCart.push(cartItem);
    // Set modified cart data to localStorage
    localStorage.setItem('cart', JSON.stringify(prevCart));
    // Show alert for user to understand wtfigo!
    // then close modal
    SweetAlert({
      title: 'Ekleniyor',
      text: 'Sepete Ekleniyor',
      icon: 'info',
      closeOnClickOutside: false,
      closeOnEsc: false,
      timer: 1750,
      button: false,
    }).then(() => this.setState({ modalState: false }));
    // Clear product form
    form.trigger('reset');
  }

  _renderModal() {
    return (
      <ReactModal isOpen={this.state.modalState}>
        <form
          ref={(form) => {
            this.form = form;
          }}
        >
          <div className="modal-header">
            <h5 className="modal-title">
              Seçenekler{' '}
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => this.setState({ modalState: false })}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </h5>
          </div>
          <div className="modal-body">
            {this.state.menu_options.map((menuOption, index) =>
              <MenuOption {...menuOption} index={index} />)}
          </div>
          <div className="modal-footer">
            <div className="form-group">
              <div className="input-group">
                <span className="input-group-addon">Adet</span>
                <input
                  type="number"
                  className="form-control"
                  aria-label="Adet"
                  defaultValue={1}
                  name="count"
                  min={1}
                  max={20}
                />
                <span className="input-group-btn">
                  <button className="btn btn-primary" type="button" onClick={this.addToCart}>
                    Sepete Ekle
                  </button>
                </span>
              </div>
            </div>
          </div>
        </form>
      </ReactModal>
    );
  }

  render() {
    return (
      <div
        className={`col-md-4 ${this.state.available === 1 ? '' : 'unavailable'}`}
        key={this.state.id.toString()}
      >
        <div className="product-preview">
          <div className="product-photo">
            <div className="product-price">
              <sub>₺</sub>
              {this.state.price[0]}.<sup>{this.state.price[1]}</sup>
            </div>
            <img alt="product" src={this.state.image_path} />
          </div>
          <h3 className="product-title">{this.state.name}</h3>
          <p className="product-info">{this.state.description}</p>
          <button
            className="cart-trigger button-clean button-text-small"
            disabled={!this.state.available}
            onClick={this.openModal}
          >
            Sepete Ekle
          </button>
        </div>

        {this._renderModal()}
      </div>
    );
  }
}
