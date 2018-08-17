import React, { Component } from "react";
import { formatPrice } from "../helpers.js";

class Fish extends Component {
  render() {
    const isAvailable = this.props.info.status === "available";
    const buttonText = isAvailable ? "Add To Order" : "Sold Out!";

    return (
      <li className="menu-fish">
        <img src={this.props.info.image} alt={this.props.info.name} />
        <h3 className="fish-name">
          {this.props.info.name}
          <span className="price">{formatPrice(this.props.info.price)}</span>
        </h3>
        <p> {this.props.info.desc} </p>
        <button
          onClick={() => {
            this.props.addToOrder(this.props.fish);
          }}
          disabled={!isAvailable}
        >
          {buttonText}
        </button>
      </li>
    );
  }
}

Fish.propTypes = {
  info: React.PropTypes.object.isRequired,
  addToOrder: React.PropTypes.func.isRequired,
  fish: React.PropTypes.string.isRequired
};

export default Fish;
