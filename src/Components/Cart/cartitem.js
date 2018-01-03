import React, { Component } from 'react';
import './cartitem.css';


export default class CartItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image_path: props.image_path,
      name: props.name,
      description: props.description,
      price: props.price,
      menu_options: props.menu_options,
      removeItem: props.removeItem,
      updateItem: props.updateItem,
      index: props.index,
      id: props.id,
      count: props.count,
    };

    this.updateItem = this.updateItem.bind(this);
  }

  updateItem() {
    this.state.updateItem(this.state.index, {
      id: this.state.id,
      name: this.state.name,
      price: this.state.price,
      description: this.state.description,
      image_path: this.state.image_path,
      count: this.state.count,
      menu_options: this.state.menu_options,
    });
  }

  render() {
    return (
      <article className="cart-item well well-sm">
        <section className="image-area">
          <img src={this.state.image_path} alt="" />
        </section>

        <section className="content-area">
          <span className="item-name">
            {this.state.name} <small>({parseFloat(this.state.price).toFixed(2)} ₺)</small>
          </span>
          <span className="item-description">{this.state.description}</span>
          <ul>
            {this.state.menu_options.map((menuOption, menuOptionIndex) => (
              <li>
                <span>
                  {menuOption.name} <small>({parseFloat(menuOption.price).toFixed(2)} ₺)</small>
                </span>
                <button
                  className="close"
                  type="button"
                  onClick={() => {
                    const { menu_options } = this.state;
                    menu_options.splice(menuOptionIndex, 1);
                    this.setState({ menu_options });
                    this.updateItem();
                  }}
                >
                  &times;
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section className="actions-area">
          <div className="form-group">
            <input
              type="number"
              defaultValue={this.state.count}
              onChange={x => this.setState({ count: parseInt(x.target.value) })}
              className="form-control"
              max={20}
              min={1}
            />
            <button
              className="btn btn-success"
              type="button"
              onClick={this.updateItem}
            >
              Güncelle
            </button>
          </div>
          <button
            className="close"
            type="button"
            onClick={() => this.state.removeItem(this.state.index)}
          >
            &times;
          </button>
        </section>
      </article>
    );
  }
}
