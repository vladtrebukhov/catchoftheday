import React, { Component } from "react";
import { formatPrice } from "../helpers.js";

class Order extends Component {
  constructor() {
    super();
    this.renderOrder = this.renderOrder.bind(this);
  }

  renderOrder(eachFish) {
    const fish = this.props.fishes[eachFish];
    const count = this.props.order[eachFish];
    const removeButton = (
      <button onClick={() => this.props.removeFromOrder(eachFish)}>
        &times;
      </button>
    );

    if (!fish || fish.status === "unavailable") {
      return (
        <li key={eachFish}>
          Sorry, {fish ? fish.name : "fish"} is no longer available
          {removeButton}
        </li>
      );
    }

    return (
      <li key={eachFish}>
        <span>
          {count}
          lbs {fish.name}
          {removeButton}
        </span>
        <span className="price">{formatPrice(count * fish.price)}</span>
      </li>
    );
  }

  render() {
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((prevTotal, id) => {
      const fish = this.props.fishes[id];
      const count = this.props.order[id];
      const isAvailable = fish && fish.status === "available";

      if (isAvailable) {
        return prevTotal + (count * fish.price || 0);
      } else {
        return prevTotal;
      }
    }, 0);
    return (
      <div className="order-wrap">
        <h2>Your Order</h2>
        <ul className="order">
          {orderIds.map(this.renderOrder)}
          <li className="total">
            <strong>Total:</strong>
            {formatPrice(total)}
          </li>
        </ul>
      </div>
    );
  }
}

Order.propTypes = {
  fishes: React.PropTypes.object.isRequired,
  order: React.PropTypes.object.isRequired,
  removeFromOrder: React.PropTypes.func.isRequired
};

export default Order;
