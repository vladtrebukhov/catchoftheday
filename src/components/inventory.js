import React, { Component } from "react";
import AddFishForm from "./addFishForm.js";

class Inventory extends Component {
  state = {};
  render() {
    return (
      <div>
        <h2>Inventory</h2>
        <AddFishForm addFish={this.props.addfish} />
      </div>
    );
  }
}

export default Inventory;
