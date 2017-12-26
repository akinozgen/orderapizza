import React from 'react';
import ReactModal from 'react-modal';
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
    };

    this.openModal = this.openModal.bind(this);
  }

  async openModal(id) {
    this.setState({ modalState: true });

    alert(id);
  }

  _renderModal() {
    return (
      <ReactModal isOpen={this.state.modalState}>
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
